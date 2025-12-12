import { useState } from 'react';
import styles from './modal.module.css';

interface ChecklistItem {
    id: number;
    text: string;
    done: boolean;
    importance: number;
    d_day_standard?: number;
    category?: string;
    pct_range?: number[];
}

interface ChecklistModalProps {
    isOpen: boolean;
    onClose: () => void;
    checklist: ChecklistItem[];
    onToggle: (id: number) => void;
    onSave: () => void;
}

export default function ChecklistModal({ isOpen, onClose, checklist, onToggle, onSave }: ChecklistModalProps) {
    const [currentStep, setCurrentStep] = useState(0);

    if (!isOpen) return null;

    // derived state: unique categories
    // preserving order from the original checklist array is important
    const categories = Array.from(new Set(checklist.map(item => item.category || '기타')));

    const currentCategory = categories[currentStep];
    const currentItems = checklist.filter(item => (item.category || '기타') === currentCategory);

    const handleNext = () => {
        if (currentStep < categories.length - 1) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    // Progress bar
    const progressPct = ((currentStep + 1) / categories.length) * 100;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()} style={{ minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
                <button className={styles.closeBtn} onClick={onClose}>&times;</button>

                {/* Header with Steps */}
                <div className={styles.header} style={{ flexShrink: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <h2 className={styles.title} style={{ margin: 0 }}>체크리스트 작성</h2>
                        <span style={{ color: '#E57373', fontWeight: 'bold' }}>Step {currentStep + 1} / {categories.length}</span>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ width: '100%', height: '6px', background: '#f0f0f0', borderRadius: '3px', marginBottom: '1.5rem', overflow: 'hidden' }}>
                        <div style={{ width: `${progressPct}%`, height: '100%', background: '#E57373', transition: 'width 0.3s' }}></div>
                    </div>

                    <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>{currentCategory}</h3>
                </div>

                {/* Body (Scrollable) */}
                <div className={styles.checklistGrid} style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem', paddingRight: '0.5rem' }}>
                    {currentItems.map(item => (
                        <div key={item.id} className={styles.checkItem} onClick={() => onToggle(item.id)} style={{ padding: '1rem', border: '1px solid #eee', borderRadius: '8px', background: item.done ? '#FFF3E0' : 'white' }}>
                            <input
                                type="checkbox"
                                checked={item.done}
                                readOnly
                                className={styles.checkbox}
                                style={{ accentColor: '#E57373', transform: 'scale(1.2)' }}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <span className={styles.checkText} style={{ fontSize: '1.05rem', fontWeight: item.done ? 'bold' : 'normal', textDecoration: 'none' }}>
                                    {item.text}
                                </span>
                                {item.d_day_standard !== undefined && (
                                    <span style={{ fontSize: '0.8rem', color: '#999', marginTop: '2px' }}>
                                        권장: D-{item.d_day_standard}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Navigation */}
                <div className={styles.footer} style={{ justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                    <button
                        className={styles.button}
                        onClick={handlePrev}
                        disabled={currentStep === 0}
                        style={{ background: currentStep === 0 ? '#f5f5f5' : 'white', color: currentStep === 0 ? '#ccc' : '#333', border: '1px solid #ddd' }}
                    >
                        이전
                    </button>

                    {currentStep === categories.length - 1 ? (
                        <button className={`${styles.button} ${styles.primaryBtn}`} onClick={onSave} style={{ padding: '0.8rem 2rem' }}>
                            완료 및 저장
                        </button>
                    ) : (
                        <button className={`${styles.button} ${styles.primaryBtn}`} onClick={handleNext} style={{ padding: '0.8rem 2rem' }}>
                            다음 단계 &gt;
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
