# ai_service/main.py
import os
import base64
from typing import List, Optional

from fastapi import FastAPI
from pydantic import BaseModel
from google import genai
from google.genai import types

# 환경 변수에서 Gemini API 키 읽기 (코드에 직접 키를 적지 말 것)
GEMINI_API_KEY = os.environ["GEMINI_API_KEY"]

# Gemini 클라이언트 생성
client = genai.Client(api_key=GEMINI_API_KEY)

# FastAPI 앱
app = FastAPI(title="Wedding AI Service")


# ---------- 스키마 정의 ----------

class GenerateRequest(BaseModel):
    prompt: str
    image_base64: Optional[str] = None


class GenerateResponse(BaseModel):
    # base64 인코딩된 이미지 여러 장을 돌려줄 수도 있으므로 리스트로 정의
    images: List[str]


# ---------- 기본 헬스 체크 엔드포인트 ----------

@app.get("/")
def read_root():
    return {"status": "ok", "service": "wedding-ai-service"}


# ---------- Gemini 이미지 생성 엔드포인트 ----------

@app.post("/ai/generate-image", response_model=GenerateResponse)
def generate_image(body: GenerateRequest):
    """
    Google Gemini (Nano Banana Pro image)를 호출해서
    프롬프트 기반 이미지를 생성하고, base64 문자열 목록으로 반환하는 엔드포인트.
    """
    model = "gemini-3-pro-image-preview"

    contents_parts = [types.Part.from_text(text=body.prompt)]

    if body.image_base64:
        # base64 문자열을 바이트로 디코딩
        try:
            image_bytes = base64.b64decode(body.image_base64)
            contents_parts.append(types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg"))
        except Exception as e:
            print(f"Error decoding image: {e}")
            # 이미지가 손상되었거나 디코딩 실패 시 텍스트만으로 진행하거나 에러 반환 가능
            # 여기서는 텍스트만으로 진행

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

    # Gemini 호출
    result = client.models.generate_content(
        model=model,
        contents=contents,
        config=generate_content_config,
    )

    images: List[str] = []

    # 결과 후보들 중에서 inline_data(이미지) 부분만 추출
    if result.candidates:
        for cand in result.candidates:
            if not cand.content or not cand.content.parts:
                continue
            for part in cand.content.parts:
                inline = getattr(part, "inline_data", None)
                if inline and inline.data:
                    # inline.data 는 이미 바이너리(base64) 형태
                    images.append(inline.data)

    return GenerateResponse(images=images)


# ---------- 개발용 직접 실행 ----------

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
