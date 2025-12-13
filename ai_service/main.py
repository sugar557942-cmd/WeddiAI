# ai_service/main.py
import os
import base64
from typing import List, Optional

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from google import genai
from google.genai import types

# 1. Environment Variable Check
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    print("WARNING: GEMINI_API_KEY not found in environment variables.")

# 2. Client Initialization (Unified SDK)
client = genai.Client(api_key=GEMINI_API_KEY)

# 3. FastAPI App
app = FastAPI(title="Wedding AI Service")


# 4. Schema Definitions
class GenerateRequest(BaseModel):
    prompt: str
    image_base64: Optional[str] = None
    mime_type: Optional[str] = "image/jpeg"  # Default fallback


class GenerateResponse(BaseModel):
    images: List[str]


# 5. Health Check
@app.get("/")
def read_root():
    return {"status": "ok", "service": "wedding-ai-service"}


# 6. Generate Image Endpoint
@app.post("/ai/generate-image", response_model=GenerateResponse)
def generate_image(body: GenerateRequest):
    """
    Generates an image using Google Gemini (Nano Banana Pro image).
    Expects 'image_base64' string in the body.
    Returns a list of base64 strings.
    """
    model = "gemini-3-pro-image-preview"

    # Validate inputs
    if not body.prompt:
        raise HTTPException(status_code=400, detail="Prompt is required.")

    contents_parts = [types.Part.from_text(text=body.prompt)]

    if body.image_base64:
        try:
            # Decode base64 to bytes
            image_bytes = base64.b64decode(body.image_base64)
            # Use provided mime_type or fallback
            valid_mime = body.mime_type if body.mime_type in ["image/png", "image/jpeg", "image/webp"] else "image/jpeg"
            
            contents_parts.append(types.Part.from_bytes(data=image_bytes, mime_type=valid_mime))
        except Exception as e:
            print(f"Error decoding image: {e}")
            raise HTTPException(status_code=400, detail=f"Invalid image_base64 data: {str(e)}")

    contents = [
        types.Content(
            role="user",
            parts=contents_parts,
        ),
    ]

    generate_content_config = types.GenerateContentConfig(
        response_modalities=["IMAGE"],
        image_config=types.ImageConfig(image_size="1K"),
    )

    try:
        # Call Gemini
        result = client.models.generate_content(
            model=model,
            contents=contents,
            config=generate_content_config,
        )

        images: List[str] = []

        if result.candidates:
            for cand in result.candidates:
                if not cand.content or not cand.content.parts:
                    continue
                for part in cand.content.parts:
                    inline = getattr(part, "inline_data", None)
                    if inline and inline.data:
                        # inline.data is bytes. MUST convert to base64 string for JSON response.
                        b64_str = base64.b64encode(inline.data).decode("utf-8")
                        images.append(b64_str)
        
        if not images:
             raise HTTPException(status_code=500, detail="Gemini returned no images.")
            
        return GenerateResponse(images=images)

    except Exception as e:
        print(f"Gemini API Error: {e}")
        raise HTTPException(status_code=500, detail=f"Gemini API Error: {str(e)}")


# 7. Local Development Execution
if __name__ == "__main__":
    import uvicorn
    # Use PORT env var if available (default 8080 logic handled by shell or fallback here)
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
