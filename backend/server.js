// backend/server.js
const express = require("express");
const cors = require("cors");

const app = express();

// Cloud Run은 PORT 환경변수를 반드시 사용
const port = process.env.PORT || 3005;

// ai_service(예: FastAPI) 주소
// 로컬: http://localhost:8000
// 배포: Cloud Run에서 환경변수로 실제 URL 넣기
const aiBaseUrl = process.env.AI_BASE_URL || "http://localhost:8000";

// 프론트 도메인 허용 목록
// 로컬과 Vercel 모두 대응
const allowedOrigins = [
    "http://localhost:3000",
    process.env.FRONTEND_ORIGIN,
    "https://weddi-ai.vercel.app",
].filter(Boolean);

// JSON 바디 파싱
app.use(express.json({ limit: "10mb" }));

// CORS 설정
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true); // curl, server-to-server 등
            if (allowedOrigins.includes(origin)) return callback(null, true);
            return callback(new Error(`CORS blocked for origin: ${origin}`));
        },
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

// AI 서비스 프록시 엔드포인트
app.post("/api/generate-image", async (req, res) => {
    try {
        const { prompt, image } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "prompt is required" });
        }

        const payload = { prompt };
        if (image) payload.image_base64 = image;

        const targetUrl = `${aiBaseUrl}/ai/generate-image`;

        const aiResponse = await fetch(targetUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!aiResponse.ok) {
            const text = await aiResponse.text();
            console.error("AI service error:", text);
            return res.status(aiResponse.status).json({
                error: "AI service failed",
                detail: text,
            });
        }

        const data = await aiResponse.json();
        return res.json(data);
    } catch (err) {
        console.error("Backend /api/generate-image error:", err);
        return res.status(500).json({ error: "Internal server error", detail: String(err) });
    }
});

// AI 일정 예측 (Mock)
app.get("/api/wedding-schedule-template", (req, res) => {
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

// 서버 시작 (Cloud Run 대응)
app.listen(port, "0.0.0.0", () => {
    console.log(`Backend server listening on port ${port}`);
    console.log(`AI_BASE_URL = ${aiBaseUrl}`);
});
