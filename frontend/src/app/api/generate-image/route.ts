import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        let backendBaseUrl = process.env.BACKEND_BASE_URL;

        // 배포 환경(production)이고 환경변수가 없으면 에러 로깅
        if (process.env.NODE_ENV === 'production' && !backendBaseUrl) {
            console.error('[Proxy] CRITICAL: BACKEND_BASE_URL is not set in production environment.');
            return NextResponse.json(
                { error: 'Server Configuration Error', detail: 'Backend URL not configured' },
                { status: 500 }
            );
        }

        // 로컬 개발 환경용 기본값
        if (!backendBaseUrl) {
            backendBaseUrl = 'http://localhost:8000';
        }

        const targetUrl = `${backendBaseUrl}/ai/generate-image`;

        console.log(`[Proxy] Forwarding request to: ${targetUrl}`);

        const body = await req.json();

        // 2. Transform Payload (Frontend '{ prompt, image, mimeType }' -> AI Service '{ prompt, image_base64, mime_type }')
        const payload = {
            prompt: body.prompt,
            image_base64: body.image, // Frontend sends base64 string in 'image' field
            mime_type: body.mimeType || 'image/jpeg' // Frontend sends 'mimeType'
        };

        const res = await fetch(targetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        // 텍스트로 먼저 읽어서, JSON 파싱 실패 시에도 에러 내용을 확인할 수 있게 함
        const responseText = await res.text();

        let data;
        try {
            data = JSON.parse(responseText);
        } catch (e) {
            console.error('[Proxy] Failed to parse backend response:', responseText);
            return NextResponse.json(
                { error: 'Backend Error', detail: responseText || 'Invalid JSON response from backend' },
                { status: res.status || 500 }
            );
        }

        if (!res.ok) {
            console.error(`[Proxy] Backend returned error ${res.status}:`, data);
            return NextResponse.json(data, { status: res.status });
        }

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error('[Proxy] Error forwarding request:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', detail: String(error) },
            { status: 500 }
        );
    }
}
