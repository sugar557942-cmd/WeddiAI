// backend/server.js
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3005;

// JSON 바디 파싱
app.use(express.json({ limit: "10mb" }));

// CORS 설정 (프론트가 localhost:3000 에서 돈다고 가정)
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

// 기본 헬스 체크
app.get("/", (req, res) => {
    res.send("Wedding Platform API Services");
});

// 예시: 상품 리스트 엔드포인트 (임시)
app.get("/api/products", (req, res) => {
    res.json({ message: "Product list endpoint" });
});

// ---------- AI 서비스 프록시 엔드포인트 ----------
// 프론트엔드에서 여기를 호출하면, Node 백엔드가 FastAPI(ai_service)를 대신 호출해준다.
app.post("/api/generate-image", async (req, res) => {
    try {
        const { prompt, image } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "prompt is required" });
        }

        const payload = { prompt };
        if (image) {
            payload.image_base64 = image;
        }

        // FastAPI AI 서비스로 요청 보내기
        const aiResponse = await fetch("http://localhost:8000/ai/generate-image", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!aiResponse.ok) {
            const text = await aiResponse.text();
            console.error("AI service error:", text);
            return res
                .status(500)
                .json({ error: "AI service failed", detail: text });
        }

        const data = await aiResponse.json(); // { images: [...] }
        res.json(data);
    } catch (err) {
        console.error("Backend /api/generate-image error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ---------- AI 일정 예측 (Mock) ----------
app.get("/api/wedding-schedule-template", (req, res) => {
    // 실제로는 AI 모델이나 복잡한 DB 로직이 들어갈 자리
    // 지금은 하드코딩된 예시 템플릿 반환
    const schedule = [
        { id: 1, title: "웨딩홀 투어 및 계약", d_day: 300, category: "venue" },
        { id: 2, title: "스/드/메 패키지 예약", d_day: 250, category: "vendor" },
        { id: 3, title: "신혼여행 항공권 발권", d_day: 240, category: "travel" },
        { id: 4, title: "웨딩촬영 (스튜디오)", d_day: 150, category: "photo" },
        { id: 5, title: "청첩장 제작 및 발송", d_day: 90, category: "invite" },
        { id: 6, title: "본식 드레스 가봉", d_day: 30, category: "dress" },
        { id: 7, title: "부케 및 웨딩카 예약", d_day: 14, category: "etc" },
    ];
    res.json({ schedule });
});

// 서버 시작
app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
