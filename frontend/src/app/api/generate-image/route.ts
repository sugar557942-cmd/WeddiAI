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
        const { prompt, userImage, productImage, userMimeType, productMimeType } = body;

        // Validation
        if (!prompt || !userImage || !productImage) {
            return NextResponse.json({ error: "Missing required fields (prompt, userImage, productImage)" }, { status: 400 });
        }

        const targetUrl = `${backendBaseUrl}/ai/generate-image`;

        const upstream = await fetch(targetUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt,
                user_image_base64: userImage,
                product_image_base64: productImage,
                user_mime_type: userMimeType || "image/jpeg",
                product_mime_type: productMimeType || "image/jpeg"
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
