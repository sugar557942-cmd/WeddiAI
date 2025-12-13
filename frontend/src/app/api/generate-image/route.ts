import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const backendBaseUrl = process.env.BACKEND_BASE_URL;
        if (!backendBaseUrl) {
            return NextResponse.json(
                { error: "BACKEND_BASE_URL is not set" },
                { status: 500 }
            );
        }

        const body = await req.json();
        const { prompt, image_base64, mime_type } = body;

        if (!prompt || typeof prompt !== "string") {
            return NextResponse.json({ error: "prompt is required" }, { status: 400 });
        }

        const targetUrl = `${backendBaseUrl}/ai/generate-image`;

        const upstream = await fetch(targetUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt,
                image_base64,
                mime_type,
            }),
        });

        const text = await upstream.text();

        if (!upstream.ok) {
            return NextResponse.json(
                { error: "AI service failed", detail: text },
                { status: upstream.status }
            );
        }

        return new NextResponse(text, {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (e: any) {
        return NextResponse.json(
            { error: "Internal error", detail: String(e?.message ?? e) },
            { status: 500 }
        );
    }
}
