import os
import base64
import time
from typing import List, Optional

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from google import genai
from google.genai import types

app = FastAPI(title="Wedding AI Service")

class GenerateRequest(BaseModel):
    prompt: str
    user_image_base64: str
    product_image_base64: str
    user_mime_type: Optional[str] = "image/jpeg"
    product_mime_type: Optional[str] = "image/jpeg"
    aspect_ratio: Optional[str] = None
    resolution: Optional[str] = None

class GenerateResponse(BaseModel):
    images: List[str]

@app.get("/")
def read_root():
    return {"status": "ok", "service": "wedding-ai-service"}

def _strip_data_url(b64: str) -> str:
    if not b64:
        return b64
    s = b64.strip()
    if s.startswith("data:") and "," in s:
        s = s.split(",", 1)[1]
    return "".join(s.split())

def _decode_b64_to_bytes(b64: str) -> bytes:
    s = _strip_data_url(b64)
    try:
        return base64.b64decode(s, validate=True)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid base64 image data: {e}")

def _b64_of_bytes(b: bytes) -> str:
    return base64.b64encode(b).decode("utf-8")

@app.post("/ai/generate-image", response_model=GenerateResponse)
def generate_image(body: GenerateRequest):
    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY (or GOOGLE_API_KEY) is not set.")

    model_name = "gemini-3-pro-image-preview"

    user_bytes = _decode_b64_to_bytes(body.user_image_base64)
    product_bytes = _decode_b64_to_bytes(body.product_image_base64)

    total_bytes = len(user_bytes) + len(product_bytes)
    if total_bytes > 18 * 1024 * 1024:
        raise HTTPException(
            status_code=413,
            detail="Images too large for inline upload. Reduce size or use File API."
        )

    contents = [
        types.Part.from_bytes(data=user_bytes, mime_type=body.user_mime_type),
        types.Part.from_bytes(data=product_bytes, mime_type=body.product_mime_type),
        body.prompt,
    ]

    aspect_ratio = body.aspect_ratio or "3:4"
    resolution = body.resolution or "2K"

    config = types.GenerateContentConfig(
        image_config=types.ImageConfig(
            aspect_ratio=aspect_ratio,
            image_size=resolution,
        )
    )

    client = genai.Client(api_key=api_key)

    last_err = None
    for attempt in range(1, 4):
        try:
            resp = client.models.generate_content(
                model=model_name,
                contents=contents,
                config=config,
            )

            images: List[str] = []

            if getattr(resp, "parts", None):
                for part in resp.parts:
                    img = None
                    try:
                        img = part.as_image()
                    except Exception:
                        img = None

                    if img is not None:
                        import io
                        buf = io.BytesIO()
                        img.save(buf, format="PNG")
                        images.append(_b64_of_bytes(buf.getvalue()))
                        continue

                    inline = getattr(part, "inline_data", None)
                    if inline and getattr(inline, "data", None):
                        images.append(_b64_of_bytes(inline.data))

            if not images:
                text = getattr(resp, "text", None)
                raise HTTPException(status_code=502, detail=f"No image returned. text={text}")

            return GenerateResponse(images=images)

        except HTTPException as e:
            raise e

        except Exception as e:
            last_err = e
            print(f"[Gemini] attempt={attempt} model={model_name} err_type={type(e).__name__} err={e}")
            if attempt < 3:
                time.sleep(0.7 * attempt)
                continue
            break

    raise HTTPException(status_code=500, detail=f"Gemini API Error: {last_err}")
