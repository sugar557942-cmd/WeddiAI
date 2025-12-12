"use client";
import React, { useState, MouseEvent } from 'react';
import styles from './Magnifier.module.css';

interface MagnifierProps {
    src: string;
    alt: string;
    zoomLevel?: number; // default 2
}

export default function Magnifier({ src, alt, zoomLevel = 3 }: MagnifierProps) {
    const [zoomParams, setZoomParams] = useState<{
        display: string;
        top: number;
        left: number;
        bgX: number;
        bgY: number;
        bgSize: string; // Add dynamic background size
    }>({ display: 'none', top: 0, left: 0, bgX: 0, bgY: 0, bgSize: '100%' });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const { top, left, width, height } = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        // Lens Size
        const lensSize = 200;

        if (x > 0 && y > 0 && x < width && y < height) {
            setZoomParams({
                display: 'block',
                top: y - lensSize / 2,
                left: x - lensSize / 2,
                bgX: (x / width) * 100,
                bgY: (y / height) * 100,
                // The background image width should be (ZoomLevel * DisplayedImageWidth)
                bgSize: `${width * zoomLevel}px ${height * zoomLevel}px`
            });
        } else {
            setZoomParams({ ...zoomParams, display: 'none' });
        }
    };

    const handleMouseLeave = () => {
        setZoomParams({ ...zoomParams, display: 'none' });
    };

    return (
        <div
            className={styles.magnifierContainer}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <img src={src} alt={alt} className={styles.sourceImage} />
            <div
                className={styles.magnifierLens}
                style={{
                    display: zoomParams.display,
                    top: `${zoomParams.top}px`,
                    left: `${zoomParams.left}px`,
                    backgroundImage: `url(${src})`,
                    backgroundPosition: `${zoomParams.bgX}% ${zoomParams.bgY}%`,
                    backgroundSize: zoomParams.bgSize,
                }}
            />
        </div>
    );
}
