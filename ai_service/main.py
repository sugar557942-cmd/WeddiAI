import os
import base64
import time
import logging
import json
from typing import List, Optional

from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from google import genai
from google.genai import types

# Configure Logging
# Cloud Run logs structure: printing JSON or simple text is fine.
# For simple one-line summary, basic config is sufficient.
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger("wedding.ai")

app = FastAPI(title="Wedding AI Service")

# Constants
MODEL_NAME = "gemini-3-pro-image-preview" # Ensure this is the correct model name
MAX_PAYLOAD_SIZE = 18 * 1024 * 1024  # 18 MB

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
    """Removes 'data:image/xyz;base64,' prefix if present."""
    if not b64:
        return ""
    b64 = b64.strip()
    if "," in b64:
        if b64.startswith("data:"):
            return b64.split(",", 1)[1]
    return b64

def _decode_b64(b64: str, field_name: str) -> bytes:
    """Decodes base64 string with validation."""
    clean_b64 = _strip_data_url(b64)
    try:
        return base64.b64decode(clean_b64, validate=True)
    except Exception as e:
        logger.error(f"Base64 decode error for {field_name}: {e}")
        raise HTTPException(status_code=400, detail=f"Invalid base64 in {field_name}: {str(e)}")

@app.get("/")
def read_root():
    return {"status": "ok", "service": "wedding-ai-service", "model": MODEL_NAME}

@app.post("/ai/generate-image", response_model=GenerateResponse)
def generate_image(body: GenerateRequest):
    request_start = time.time()
    
    # 1. Credentials
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        logger.critical("GEMINI_API_KEY not set")
        raise HTTPException(status_code=500, detail="Server configuration error: API Key missing")

    # 2. Decode & Validate Size
    user_bytes = _decode_b64(body.user_image_base64, "user_image_base64")
    product_bytes = _decode_b64(body.product_image_base64, "product_image_base64")

    total_size = len(user_bytes) + len(product_bytes)
    
    # Payload logging
    log_payload = {
        "model": MODEL_NAME,
        "input_bytes": total_size,
        "user_mime": body.user_mime_type,
        "product_mime": body.product_mime_type,
        "prompt_len": len(body.prompt)
    }

    if total_size > MAX_PAYLOAD_SIZE:
        logger.warning(f"Payload too large: {total_size} > {MAX_PAYLOAD_SIZE}")
        raise HTTPException(status_code=413, detail=f"Total image size exceeds limit ({MAX_PAYLOAD_SIZE/1024/1024:.1f}MB)")

    # 3. Prepare Gemini Client
    client = genai.Client(api_key=api_key)

    # 4. Content Parts
    contents = [
        types.Part.from_bytes(data=user_bytes, mime_type=body.user_mime_type),
        types.Part.from_bytes(data=product_bytes, mime_type=body.product_mime_type),
        types.Part.from_text(text=body.prompt),
    ]

    # 5. Config
    generate_config = types.GenerateContentConfig(
        image_config=types.ImageConfig(
            aspect_ratio=body.aspect_ratio or "3:4"
        )
    )

    # 6. Retry Loop
    max_retries = 3
    last_error = None
    
    for attempt in range(1, max_retries + 1):
        try:
            logger.info(f"Gemini Attempt {attempt}/{max_retries}...")
            
            response = client.models.generate_content(
                model=MODEL_NAME,
                contents=contents,
                config=generate_config
            )

            # Extract Images
            images: List[str] = []
            
            candidates = getattr(response, "candidates", []) or []
            if candidates:
                for cand in candidates:
                    for part in getattr(cand.content, "parts", []):
                        inline = getattr(part, "inline_data", None)
                        if inline and inline.data:
                            b64_str = base64.b64encode(inline.data).decode("utf-8")
                            images.append(b64_str)
            
            if not images:
                text_content = response.text if hasattr(response, "text") else "No text"
                logger.warning(f"Gemini Refusal/Empty: {text_content}")
                # Refusal is usually permanent for the prompt, so 502 with detail
                raise HTTPException(status_code=502, detail=f"Gemini refused to generate image: {text_content}")

            # Success Log
            duration = time.time() - request_start
            logger.info(f"SUCCESS: Generated {len(images)} images in {duration:.2f}s | {json.dumps(log_payload)}")
            return GenerateResponse(images=images)

        except HTTPException as he:
            raise he 
        except Exception as e:
            last_error = e
            error_msg = str(e)
            logger.error(f"FAIL Attempt {attempt}: {error_msg} | {json.dumps(log_payload)}")
            
            # Identify error type
            if "404" in error_msg:
                # Model not found or not supported
                raise HTTPException(status_code=500, detail=f"Gemini Model '{MODEL_NAME}' Not Found/Supported: {error_msg}")
            
            if "400" in error_msg:
                # Bad Request (invalid params, aspect ratio, etc)
                raise HTTPException(status_code=400, detail=f"Gemini Bad Request: {error_msg}")

            # Retriable errors: 429, 500, 503 from upstream
            if "429" in error_msg or "500" in error_msg or "503" in error_msg:
                if attempt < max_retries:
                    sleep_time = 1.0 * (2 ** (attempt - 1))
                    time.sleep(sleep_time)
                    continue
            
            # If we reached here, it's a non-retriable error or unknown error
            break

    # Final Failure
    raise HTTPException(status_code=502, detail=f"Gemini Service Unavailable after {max_retries} attempts. Last Error: {last_error}")

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
