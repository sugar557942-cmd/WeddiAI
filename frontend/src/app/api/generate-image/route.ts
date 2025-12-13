import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const backendBaseUrl = process.env.BACKEND_BASE_URL || 'http://localhost:8000';
        const targetUrl = `${backendBaseUrl}/ai/generate-image`;

        console.log(`[Proxy] Forwarding request to: ${targetUrl}`);

        const body = await req.json();

        const res = await fetch(targetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error('[Proxy] Error forwarding request:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', detail: String(error) },
            { status: 500 }
        );
    }
}
