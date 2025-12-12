"use client";
import { useState } from 'react';
import { Product } from '../lib/data';
import styles from './MultiviewPanel.module.css';
import SimulationPanel from './SimulationPanel';
import Magnifier from './Magnifier';

interface MultiviewPanelProps {
    product: Product;
    autoSimulate?: boolean;
}

type ViewMode = 'front' | 'side' | 'back' | 'simulation';

export default function MultiviewPanel({ product, autoSimulate = false }: MultiviewPanelProps) {
    const [mode, setMode] = useState<ViewMode>(autoSimulate ? 'simulation' : 'front');

    return (
        <div className={styles.panel}>
            <div className={styles.displayArea}>
                {mode === 'front' && <Magnifier src={product.images.front} alt="Front" />}
                {mode === 'side' && <Magnifier src={product.images.side} alt="Side" />}
                {mode === 'back' && <Magnifier src={product.images.back} alt="Back" />}

                {mode === 'simulation' && <SimulationPanel product={product} autoTriggerUpload={autoSimulate} />}
            </div>

            <div className={styles.tabs}>
                <button className={`${styles.tab} ${mode === 'front' ? styles.active : ''}`} onClick={() => setMode('front')}>정면</button>
                <button className={`${styles.tab} ${mode === 'side' ? styles.active : ''}`} onClick={() => setMode('side')}>측면</button>
                <button className={`${styles.tab} ${mode === 'back' ? styles.active : ''}`} onClick={() => setMode('back')}>후면</button>
                <button className={`${styles.tab} ${mode === 'simulation' ? styles.active : ''}`} onClick={() => setMode('simulation')}>착용 시뮬레이션</button>
            </div>
        </div>
    );
}
