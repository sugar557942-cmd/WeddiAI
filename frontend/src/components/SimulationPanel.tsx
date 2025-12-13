"use client";
import React, { useState, useRef, useEffect } from 'react';
import styles from './MultiviewPanel.module.css';
import { Product } from '../lib/data';
import { useCandidates } from '../context/CandidateContext';
import { useAuth } from '../context/AuthContext';

interface SimulationPanelProps {
    product: Product;
    autoTriggerUpload?: boolean;
}

export default function SimulationPanel({ product, autoTriggerUpload = false }: SimulationPanelProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [isSimulating, setIsSimulating] = useState(false);
    const [viewMode, setViewMode] = useState<'user' | 'product'>('user');

    const fileInputRef = useRef<HTMLInputElement>(null);
    const { addCandidate } = useCandidates();
    const { isAuthenticated } = useAuth();
    const hasTriggered = useRef(false);

    useEffect(() => {
        if (autoTriggerUpload && fileInputRef.current && !hasTriggered.current) {
            hasTriggered.current = true;
            fileInputRef.current.click();
        }
    }, [autoTriggerUpload]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
            setResultUrl(null); // Reset result on new upload
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const [simulationStep, setSimulationStep] = useState('');
    const [generatedPrompt, setGeneratedPrompt] = useState('');

    // Helper: Resize image to reduce payload size (Max 1024px)
    const resizeImage = async (fileOrBlob: File | Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(fileOrBlob);
            img.onload = () => {
                const maxDim = 1024;
                let width = img.width;
                let height = img.height;

                if (width > maxDim || height > maxDim) {
                    if (width > height) {
                        height = Math.round((height * maxDim) / width);
                        width = maxDim;
                    } else {
                        width = Math.round((width * maxDim) / height);
                        height = maxDim;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error("Canvas context failed"));
                    return;
                }
                ctx.drawImage(img, 0, 0, width, height);
                // Compress to JPEG 0.8
                const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                resolve(dataUrl.split(',')[1]); // Return base64 only
            };
            img.onerror = (err) => reject(err);
        });
    };

    const handleSimulate = async () => {
        if (!selectedFile) {
            alert("먼저 사진을 업로드해주세요.");
            return;
        }

        setIsSimulating(true);
        setResultUrl(null);
        setGeneratedPrompt('');

        try {
            // Step 1: Analyzing & Resizing
            setSimulationStep("이미지 최적화 처리 중...");

            // Resize User Image
            const base64Image = await resizeImage(selectedFile);
            await new Promise(r => setTimeout(r, 500));

            // Step 2: Prompt Generation
            setSimulationStep("AI 프롬프트 생성 중...");

            const prompt = `
Generate a high-quality photorealistic image of a Korean bride.
Source 1 (User Face): Use the facial features, skin tone, and identity from this image.
Source 2 (Target Outfit): Use the wedding dress (or Hanbok), veil, and accessories from this image exactly as they appear.Do not change the design.
Instructions:
- Seamlessly swap the face from Source 1 onto the body in Source 2.
- Apply natural, elegant wedding makeup and a neat bridal hairstyle suitable for the outfit.
- Pose: The bride should be standing gracefully with both hands clasped together in front (polite pose).
- Ensure the lighting and skin tone match the outfit's environment naturally.
- Output: High resolution, photorealistic.
            `.trim();

            setGeneratedPrompt(prompt);

            // Step 3: Product Image (Fetch & Resize)
            const productImageUrl = product.images.front;
            const productImageResponse = await fetch(productImageUrl);
            const productBlob = await productImageResponse.blob();
            const productImageBase64 = await resizeImage(productBlob);

            // Step 4: Synthesis
            setSimulationStep("나노바나나 엔진으로 이미지 합성 중...");

            const res = await fetch("/api/generate-image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt,
                    userImage: base64Image,
                    productImage: productImageBase64,
                    userMimeType: "image/jpeg", // Always jpeg after resize
                    productMimeType: "image/jpeg"
                }),
            });

            if (!res.ok) {
                const text = await res.text();
                let errMsg = `Status: ${res.status} ${res.statusText}`;
                try {
                    const json = JSON.parse(text);
                    errMsg += `\nDetail: ${json.detail || json.error || JSON.stringify(json)}`;
                } catch {
                    errMsg += `\nResponse: ${text.slice(0, 100)}`;
                }
                throw new Error(errMsg);
            }

            const data = await res.json();
            if (data.images && data.images.length > 0) {
                setResultUrl(`data:image/png;base64,${data.images[0]}`);
            } else {
                throw new Error("No image generated");
            }

        } catch (error: any) {
            console.error(error);
            alert(`시뮬레이션 오류:\n${error.message}`);
        } finally {
            setIsSimulating(false);
            setSimulationStep('');
        }
    };



    const handleDownload = () => {
        if (!resultUrl) return;

        const a = document.createElement('a');
        a.href = resultUrl;
        a.download = `simulation_${product.id}_${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const handleAddToCandidates = () => {
        if (!isAuthenticated) {
            alert("로그인이 필요한 서비스입니다.");
            return;
        }
        if (!resultUrl) return;

        addCandidate({
            productId: product.id,
            productName: product.name,
            vendorName: product.vendor_info.name,
            contact: product.vendor_info.contact,
            simulationImage: resultUrl
        });
        alert("마이페이지 후보군에 담겼습니다!");
    };

    return (
        <div className={styles.simulationContainer}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: 'none' }}
            />

            <div className={styles.simCanvas}>
                <div className={styles.placeholderContainer}>
                    {/* 1. Underlying Background Image (Product or User Upload) */}
                    {(resultUrl || (selectedFile && previewUrl)) ? (
                        <div className={styles.singleViewContainer}>
                            <img
                                src={resultUrl ?? (viewMode === 'user' ? (previewUrl ?? undefined) : product.images.front)}
                                alt="Simulation View"
                                className={styles.simImage}
                            />
                            {/* View Toggles only if not simulated result and file uploaded */}
                            {!resultUrl && selectedFile && (
                                <div className={styles.viewToggles}>
                                    <button
                                        className={`${styles.toggleBtn} ${viewMode === 'user' ? styles.activeToggle : ''}`}
                                        onClick={() => setViewMode('user')}
                                    >
                                        내 사진
                                    </button>
                                    <button
                                        className={`${styles.toggleBtn} ${viewMode === 'product' ? styles.activeToggle : ''}`}
                                        onClick={() => setViewMode('product')}
                                    >
                                        모델 사진
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Default Placeholder Background
                        <img src={product.images.front} alt="Product Background" className={styles.bgImage} />
                    )}

                    {/* 2. Overlays */}

                    {/* Simulation Process Overlay */}
                    {isSimulating && (
                        <div className={`${styles.simulationOverlay} ${styles.aiEffectGlow}`}>
                            <div className={styles.geminiIcon}>
                                ✨ {/* CSS-styled Sparkle/Gemini representation */}
                            </div>
                            <p className={styles.loadingText}>
                                {simulationStep}
                            </p>
                            <div className={styles.progressBarContainer}>
                                <div className={styles.progressBarFill}></div>
                            </div>
                        </div>
                    )}

                    {/* Initial Call-to-Action Overlay (only if nothing uploaded and not simulating) */}
                    {!selectedFile && !isSimulating && !resultUrl && (
                        <div className={styles.placeholderOverlay}>
                            <p className={styles.placeholderText}>
                                본인 사진을 업로드하면<br />
                                AI가 드레스를 입혀드립니다.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.simControls}>
                <button className={styles.simBtnPrimary} onClick={handleUploadClick}>
                    사진 업로드
                </button>
                <button
                    className={`${styles.simBtnPrimary} ${selectedFile ? styles.simBtnActive : styles.simBtnDisabled}`}
                    onClick={handleSimulate}
                    disabled={!selectedFile || isSimulating}
                >
                    {isSimulating ? '생성 중...' : 'AI 착용'}
                </button>

                {resultUrl && (
                    <>
                        <button className={styles.simBtnSecondary} onClick={handleDownload}>다운로드</button>
                        <button className={styles.simBtnSecondary} onClick={handleAddToCandidates}>후보군 담기</button>
                    </>
                )}
            </div>
        </div >
    );
}
