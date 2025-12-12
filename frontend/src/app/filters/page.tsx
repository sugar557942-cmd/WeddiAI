"use client";
import { useState } from 'react';
import styles from './page.module.css';
import { REGIONS, STUDIOS, Studio } from '../../lib/studioData';
import { useModal } from '../../context/ModalContext';

export default function FiltersPage() {
    const { openConsultation } = useModal();
    const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);
    const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
    // Use a placeholder image initially
    const [image, setImage] = useState<string | null>(null);
    const [showSamples, setShowSamples] = useState(false);

    const SAMPLES = [
        '/samples/sample_01.png', // 1. Classic Couple
        '/samples/sample_02.png', // 2. Garden Couple
        '/samples/sample_03.png', // 3. Elegant Couple
        '/samples/sample_04.png', // 4. Casual Couple
        '/samples/sample_05.png', // 5. Cinematic Couple
    ];

    // Filter studios based on selected Region
    const filteredStudios = STUDIOS.filter(studio => studio.region === selectedRegion);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setImage(objectUrl);
            setShowSamples(false);
        }
    };

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>스튜디오 필터 체험</h1>

            <div className={styles.workspace}>
                {/* Left: Preview Area */}
                <div className={styles.previewArea}>
                    {image ? (
                        <div className={styles.imageWrapper}>
                            <img
                                src={image}
                                alt="Original"
                                className={styles.previewImage}
                                style={{
                                    filter: selectedStudio ? selectedStudio.filterStyle : 'none',
                                    transition: 'filter 0.5s ease'
                                }}
                            />
                            {!selectedStudio && <div className={styles.overlayText}>스튜디오를 선택하여 필터를 적용해보세요</div>}
                            {selectedStudio && (
                                <div className={styles.filterBadge}>
                                    {selectedStudio.name} 적용 중
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className={styles.uploadPlaceholder}>
                            <p>이미지를 업로드해주세요</p>
                        </div>
                    )}

                    {/* Floating Upload Button */}
                    <div className={styles.uploadControl}>
                        {showSamples && (
                            <div className={styles.samplePicker}>
                                <div className={styles.sampleGrid}>
                                    {SAMPLES.map((src, idx) => (
                                        <img
                                            key={idx}
                                            src={src}
                                            className={styles.sampleThumb}
                                            onClick={() => {
                                                setImage(src);
                                                setShowSamples(false);
                                            }}
                                            alt={`Sample ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        <label htmlFor="upload" className={styles.uploadBtn}>사진 변경</label>
                        <button className={styles.sampleBtn} onClick={() => setShowSamples(!showSamples)}>
                            샘플 이미지
                        </button>
                        <input
                            type="file"
                            id="upload"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>

                {/* Right: Controls */}
                <div className={styles.controls}>
                    {/* 1. Region Selection */}
                    <div className={styles.section}>
                        <h2>1. 지역 선택</h2>
                        <div className={styles.regionList}>
                            {REGIONS.map(region => (
                                <button
                                    key={region}
                                    className={`${styles.regionBtn} ${selectedRegion === region ? styles.activeRegion : ''}`}
                                    onClick={() => {
                                        setSelectedRegion(region);
                                        setSelectedStudio(null); // Reset studio selection when changing region
                                    }}
                                >
                                    {region}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 2. Studio List */}
                    <div className={styles.section}>
                        <h2>2. 스튜디오 선택</h2>
                        <div className={styles.studioList}>
                            {filteredStudios.map(studio => (
                                <button
                                    key={studio.id}
                                    className={`${styles.studioItem} ${selectedStudio?.id === studio.id ? styles.activeStudio : ''}`}
                                    onClick={() => setSelectedStudio(studio)}
                                >
                                    <div className={styles.studioName}>{studio.name}</div>
                                    <div className={styles.studioDesc}>{studio.description}</div>
                                    <div className={styles.studioInfo}>
                                        <span>📍 {studio.location}</span>
                                        <span>📞 {studio.contact}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className={styles.actionButtons}>
                        <button className={styles.resetBtn} onClick={() => setSelectedStudio(null)}>
                            원본 보기
                        </button>
                    </div>

                    <div className={styles.actionButtons}>
                        <button className={styles.shortlistBtn} onClick={() => openConsultation('studio', selectedStudio?.name || '')}>
                            이 스튜디오로 상담 신청
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
