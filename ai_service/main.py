# ai_service/main.py
import os
import base64
from typing import List, Optional

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

import google.generativeai as genai


app = FastAPI(title="Wedding AI Service")


class GenerateRequest(BaseModel):
    prompt: str
    image_base64: Optional[str] = None
    mime_type: Optional[str] = "image/jpeg"  # "image/jpeg" | "image/png" | "image/webp"


class GenerateResponse(BaseModel):
    images: List[str]


@app.get("/")
def read_root():
    return {"status": "ok", "service": "wedding-ai-service"}


@app.post("/ai/generate-image", response_model=GenerateResponse)
def generate_image(body: GenerateRequest):
    # 1) Validate
    if not body.prompt:
        raise HTTPException(status_code=400, detail="Prompt is required.")

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY is not set in environment variables.")

    # 2) Configure Gemini (google-generativeai)
    genai.configure(api_key=api_key)

    # 네가 쓰던 모델명을 유지
    model_name = "gemini-3-pro-image-preview"
    model = genai.GenerativeModel(model_name)

    # 3) Build input parts
    parts = [body.prompt]

    if body.image_base64:
        try:
            image_bytes = base64.b64decode(body.image_base64)

            valid_mime = body.mime_type if body.mime_type in ["image/png", "image/jpeg", "image/webp"] else "image/jpeg"

            # google-generativeai 는 dict 형태로 inline_data를 넣는 방식이 가장 호환이 좋음
            parts.append(
                {
                    "inline_data": {
                        "mime_type": valid_mime,
                        "data": image_bytes,
                    }
                }
            )
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Invalid image_base64 data: {str(e)}")

    # 4) Call Gemini
    try:
        # 이미지 결과는 응답 포맷이 바뀌는 경우가 있어서
        # 방어적으로 candidates/parts에서 inline_data를 찾아서 뽑는다.
        result = model.generate_content(parts)

        images: List[str] = []

        # result.candidates[0].content.parts[*].inline_data.data 구조를 우선 탐색
        candidates = getattr(result, "candidates", None) or []
        for cand in candidates:
            content = getattr(cand, "content", None)
            if not content:
                continue
            content_parts = getattr(content, "parts", None) or []
            for p in content_parts:
                inline = getattr(p, "inline_data", None)
                if inline and getattr(inline, "data", None):
                    b64_str = base64.b64encode(inline.data).decode("utf-8")
                    images.append(b64_str)

        if not images:
            raise HTTPException(status_code=500, detail="Gemini returned no images.")

        return GenerateResponse(images=images)

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini API Error: {str(e)}")


if __name__ == "__main__":
    import uvicorn

    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)
