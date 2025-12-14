import os
import re
import base64
import time
import logging
import json
from typing import List, Optional, Any

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from google import genai
from google.genai import types

try:
    from importlib.metadata import version as pkg_version
except Exception:
    pkg_version = None

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger("wedding.ai")
logger.info("DEPLOY_MARKER v2025-12-14-1030")

app = FastAPI(title="Wedding AI Service")

MODEL_NAME = "gemini-3-pro-image-preview"
MAX_PAYLOAD_SIZE = 18 * 1024 * 1024  # 18 MB


def _get_pkg_ver(name: str) -> str:
    if pkg_version is None:
        return "unknown"
    try:
        return pkg_version(name)
    except Exception:
        return "unknown"


GENAI_SDK_VERSION = _get_pkg_ver("google-genai")
API_CORE_VERSION = _get_pkg_ver("google-api-core")

logger.info(
    f"startup_versions google-genai={GENAI_SDK_VERSION} google-api-core={API_CORE_VERSION} "
    f"has_ImageConfig={hasattr(types,'ImageConfig')} has_EditImageConfig={hasattr(types,'EditImageConfig')}"
)


class GenerateRequest(BaseModel):
    prompt: str
    user_image_base64: str
    product_image_base64: str
    user_mime_type: Optional[str] = "image/jpeg"
    product_mime_type: Optional[str] = "image/jpeg"
    aspect_ratio: Optional[str] = "3:4"
    resolution: Optional[str] = "2K"


class GenerateResponse(BaseModel):
    images: List[str]


def _strip_data_url(b64: str) -> str:
    if not b64:
        return ""
    b64 = b64.strip()
    if b64.startswith("data:") and "," in b64:
        return b64.split(",", 1)[1]
    return re.sub(r"\s+", "", b64)


def _decode_b64(b64: str, field_name: str) -> bytes:
    clean_b64 = _strip_data_url(b64)
    try:
        return base64.b64decode(clean_b64, validate=True)
    except Exception as e:
        logger.error(f"Base64 decode error for {field_name}: {e}")
        raise HTTPException(status_code=400, detail=f"Invalid base64 in {field_name}: {str(e)}")


def _make_generate_config(aspect_ratio: str, resolution: str):
    if hasattr(types, "ImageConfig"):
        try:
            image_cfg = types.ImageConfig(
                aspect_ratio=aspect_ratio,
                image_size=resolution,
            )
        except TypeError:
            image_cfg = types.ImageConfig(aspect_ratio=aspect_ratio)

        try:
            return types.GenerateContentConfig(image_config=image_cfg)
        except TypeError:
            return types.GenerateContentConfig()

    return types.GenerateContentConfig()


def _extract_images(response: Any) -> List[str]:
    images: List[str] = []
    candidates = getattr(response, "candidates", []) or []

    for cand in candidates:
        content = getattr(cand, "content", None)
        parts = getattr(content, "parts", None) if content else None
        if not parts:
            continue
        for part in parts:
            inline = getattr(part, "inline_data", None)
            if inline and getattr(inline, "data", None):
                images.append(base64.b64encode(inline.data).decode("utf-8"))

    return images


@app.get("/")
def read_root():
    return {
        "status": "ok",
        "service": "wedding-ai-service",
        "model": MODEL_NAME,
        "sdk": {
            "google-genai": GENAI_SDK_VERSION,
            "google-api-core": API_CORE_VERSION,
            "has_ImageConfig": hasattr(types, "ImageConfig"),
            "has_EditImageConfig": hasattr(types, "EditImageConfig"),
            "deploy_marker": "2025-12-14-1030",
            "deploy_marker": "v1",
        },
    } 

@app.post("/ai/generate-image", response_model=GenerateResponse)
def generate_image(body: GenerateRequest):
    request_start = time.time()

    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        logger.critical("API key not set (GEMINI_API_KEY or GOOGLE_API_KEY)")
        raise HTTPException(status_code=500, detail="Server configuration error: API Key missing")

    user_bytes = _decode_b64(body.user_image_base64, "user_image_base64")
    product_bytes = _decode_b64(body.product_image_base64, "product_image_base64")
    total_size = len(user_bytes) + len(product_bytes)

    log_payload = {
        "model": MODEL_NAME,
        "input_bytes": total_size,
        "user_mime": body.user_mime_type,
        "product_mime": body.product_mime_type,
        "prompt_len": len(body.prompt),
        "google_genai": GENAI_SDK_VERSION,
        "has_ImageConfig": hasattr(types, "ImageConfig"),
        "has_EditImageConfig": hasattr(types, "EditImageConfig"),
    }

    if total_size > MAX_PAYLOAD_SIZE:
        logger.warning(f"Payload too large: {total_size} > {MAX_PAYLOAD_SIZE}")
        raise HTTPException(status_code=413, detail=f"Total image size exceeds limit ({MAX_PAYLOAD_SIZE/1024/1024:.1f}MB)")

    client = genai.Client(api_key=api_key)

    contents = [
        types.Part.from_bytes(data=user_bytes, mime_type=body.user_mime_type or "image/jpeg"),
        types.Part.from_bytes(data=product_bytes, mime_type=body.product_mime_type or "image/jpeg"),
        body.prompt,
    ]

    generate_config = _make_generate_config(
        aspect_ratio=body.aspect_ratio or "3:4",
        resolution=body.resolution or "2K",
    )

    max_retries = 3
    last_error = None

    for attempt in range(1, max_retries + 1):
        try:
            logger.info(f"Gemini Attempt {attempt}/{max_retries} | {json.dumps(log_payload)}")

            if generate_config is None:
                response = client.models.generate_content(
                    model=MODEL_NAME,
                    contents=contents,
                )
            else:
                response = client.models.generate_content(
                    model=MODEL_NAME,
                    contents=contents,
                    config=generate_config,
                )

            images = _extract_images(response)

            if not images:
                text_content = response.text if hasattr(response, "text") else "No text"
                logger.warning(f"Gemini Refusal/Empty: {text_content} | {json.dumps(log_payload)}")
                raise HTTPException(status_code=502, detail=f"Gemini returned no image: {text_content}")

            duration = time.time() - request_start
            logger.info(f"SUCCESS: {len(images)} images in {duration:.2f}s | {json.dumps(log_payload)}")
            return GenerateResponse(images=images)

        except HTTPException as he:
            raise he

        except Exception as e:
            last_error = e
            error_msg = str(e)
            logger.error(f"FAIL Attempt {attempt}: {error_msg} | {json.dumps(log_payload)}")

            if "404" in error_msg:
                raise HTTPException(status_code=500, detail=f"Gemini Model '{MODEL_NAME}' Not Found/Supported: {error_msg}")

            if "400" in error_msg:
                raise HTTPException(status_code=400, detail=f"Gemini Bad Request: {error_msg}")

            if "429" in error_msg or "500" in error_msg or "503" in error_msg:
                if attempt < max_retries:
                    sleep_time = 1.0 * (2 ** (attempt - 1))
                    time.sleep(sleep_time)
                    continue

            break

    raise HTTPException(status_code=502, detail=f"Gemini Service Unavailable after {max_retries} attempts. Last Error: {last_error}")
