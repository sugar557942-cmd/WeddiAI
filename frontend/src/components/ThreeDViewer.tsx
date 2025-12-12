"use client";
import React, { useRef, useEffect } from 'react';
import styles from './MultiviewPanel.module.css';

// Note: Real implementation would use @react-three/fiber
export default function ThreeDViewer() {
    return (
        <div className={styles.viewerContainer}>
            <div className={styles.canvas3d}>
                {/* Placeholder for Canvas */}
                <p>3D 모델 영역</p>
            </div>

            <div className={styles.viewerControls}>
                <div className={styles.controlGroup}>
                    <span>회전</span>
                    <input type="range" min="0" max="360" />
                </div>
                <div className={styles.controlGroup}>
                    <span>확대/축소</span>
                    <input type="range" min="1" max="5" />
                </div>
                <button className={styles.controlBtn}>조명 변경</button>
            </div>
        </div>
    );
}
