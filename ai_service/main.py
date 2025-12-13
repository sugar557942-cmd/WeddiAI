# ai_service/main.py
import os
import base64
from typing import List, Optional

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai

# FastAPI App
app = FastAPI(title="Wedding AI Service")

class GenerateRequest(BaseModel):
    prompt: str
    user_image_base64: str
    product_image_base64: str
    user_mime_type: Optional[str] = "image/jpeg"
    product_mime_type: Optional[str] = "image/jpeg"

class GenerateResponse(BaseModel):
    images: List[str]

@app.get("/")
def read_root():
    return {"status": "ok", "service": "wedding-ai-service"}

@app.post("/ai/generate-image", response_model=GenerateResponse)
def generate_image(body: GenerateRequest):
    # 1. Validate Env
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY is not set.")

    # 2. Configure Gemini
    genai.configure(api_key=api_key)
    # Using User-requested "Nano Banana Pro" model
    model_name = "nano-banana-pro-preview" 

    model = genai.GenerativeModel(model_name)

    # 3. Prepare Parts
    # Prompt + User Image + Product Image
    parts = [body.prompt]

    # Helper to create blob
    def create_blob(b64_str, mime):
        try:
            return {
                "inline_data": {
                    "mime_type": mime,
                    "data": base64.b64decode(b64_str)
                }
            }
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Image decode failed: {str(e)}")

    if body.user_image_base64:
        parts.append(create_blob(body.user_image_base64, body.user_mime_type))
    
    if body.product_image_base64:
        parts.append(create_blob(body.product_image_base64, body.product_mime_type))

    # 4. Call Gemini
    try:
        # Generate Content
        result = model.generate_content(parts)
        
        # Check for images in response (if model supports native image generation output)
        # OR if we are doing text-to-image via a tool? 
        # Standard Gemini API (1.5 Pro) returns TEXT unless we use Imagen.
        # IF the user wants IMAGE output, we might be misusing the API if we just call generate_content on 1.5 Pro without a tool?
        # But if the previous code was "gemini-3-pro-image-preview", maybe they have access to an image model?
        # Let's use the code structure that extracts inline_data. 
        # If the model emits text description of an image, that's not what we want.
        # We need an Image Generation model. 
        # "gemini-1.5-pro" is text/multimodal-in -> text-out.
        # "imagen-3.0-generate-001" is for images?
        # Let's try to stick to what might work or use a standard known image model.
        # But wait, the user said "Why did it generate a 3rd image?". This implies it DID generate an image. 
        # So "gemini-3-pro-image-preview" likely worked or they are using a library wrapper that handles it.
        # I will revert to "gemini-3-pro-image-preview" as the model name if I can, but I suspect it might be "gemini-1.5-pro" and the user is confused? 
        # No, let's look at the previous `main.py` provided by the USER. 
        # It had `model = "gemini-3-pro-image-preview"`. 
        # I will use that.
        
        result = model.generate_content(parts)

        images: List[str] = []
        
        candidates = getattr(result, "candidates", None) or []
        for cand in candidates:
            content = getattr(cand, "content", None)
            if not content: continue
            for p in content.parts:
                inline = getattr(p, "inline_data", None)
                if inline and getattr(inline, "data", None):
                    b64_str = base64.b64encode(inline.data).decode("utf-8")
                    images.append(b64_str)

        if not images:
             # Fallback: If no image found, maybe it returned text?
             # For now, raise error like before.
             raise HTTPException(status_code=500, detail="Gemini returned no images.")
            
        return GenerateResponse(images=images)

    except Exception as e:
        print(f"Gemini Error: {e}")
        raise HTTPException(status_code=500, detail=f"Gemini API Error: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
