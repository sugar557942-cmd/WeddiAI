import { useState } from 'react';
import styles from './modal.module.css';
import AnalysisReport3Page from './AnalysisReport3Page';

interface ChecklistItem {
    id: number;
    text: string;
    done: boolean;
    importance: number;
    d_day_standard?: number;
    category?: string;
    pct_range?: number[];
}

interface AnalysisModalProps {
    isOpen: boolean;
    onClose: () => void;
    checklist: ChecklistItem[];
    weddingDate?: string;
}

// Helper to assign icons/tags based on category name
const getIconAndTag = (text: string, category?: string) => {
    // Priority: Category string match
    if (category) {
        if (category.includes("전체 일정")) return { icon: "📅", tag: "일정" };
        if (category.includes("상견례")) return { icon: "👨‍👩‍👧‍👦", tag: "가족" };
        if (category.includes("예식장")) return { icon: "💒", tag: "장소" };
        if (category.includes("스튜디오")) return { icon: "💄", tag: "스드메" };
        if (category.includes("예복")) return { icon: "👔", tag: "의상" };
        if (category.includes("예단")) return { icon: "💍", tag: "예물" };
        if (category.includes("신혼집")) return { icon: "🏠", tag: "주거" };
        if (category.includes("청첩장")) return { icon: "💌", tag: "초대" };
        if (category.includes("예식 진행")) return { icon: "🎥", tag: "본식" };
        if (category.includes("신혼여행")) return { icon: "✈️", tag: "여행" };
        if (category.includes("혼인신고")) return { icon: "📑", tag: "행정" };
        if (category.includes("건강")) return { icon: "🏥", tag: "라이프" };
        if (category.includes("마무리")) return { icon: "🏁", tag: "최종" };
    }
    // Fallback: Text match
    if (text.includes("웨딩홀")) return { icon: "💒", tag: "장소" };
    if (text.includes("예식일")) return { icon: "📅", tag: "일정" };
    return { icon: "📋", tag: "체크" };
};

export default function AnalysisModal({ isOpen, onClose, checklist }: AnalysisModalProps) {
    if (!isOpen) return null;

    const remainingItems = checklist.filter(item => !item.done);

    return (
        <div id="printable-modal-root" className={styles.overlay} onClick={onClose}>
            <style jsx global>{`
                @media print {
                    body {
                        visibility: hidden;
                    }
                    #printable-modal-root {
                        visibility: visible;
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: auto;
                        min-height: 100%;
                        overflow: visible;
                        z-index: 99999;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                        background: white;
                    }
                    #printable-modal-root * {
                        visibility: visible;
                    }
                }
            `}</style>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose}>&times;</button>
                <div className={styles.header}>
                    <h2 className={styles.title}>준비 리스트 분석</h2>
                    <p className={styles.description}>
                        남은 준비 항목들을 분석하여<br />
                        우선순위 픽토그램으로 정리했습니다.
                    </p>
                </div>

                {remainingItems.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                        <h3>모든 준비가 완료되었습니다!</h3>
                    </div>
                ) : (
                    <div className={styles.reportContainer}>
                        {Object.entries(remainingItems.reduce((acc, item) => {
                            const cat = item.category || '기타';
                            if (!acc[cat]) acc[cat] = [];
                            acc[cat].push(item);
                            return acc;
                        }, {} as Record<string, ChecklistItem[]>)).map(([category, items]) => {
                            // Extract Icon from the first item's text or helper
                            // Note: getIconAndTag is optimized for item text, but we can pass category string
                            const { icon } = getIconAndTag("", category);

                            return (
                                <div key={category} className={styles.categoryGroup}>
                                    <div className={styles.categoryHeader}>
                                        <span className={styles.categoryIcon}>{icon}</span>
                                        <span className={styles.categoryTitle}>{category}</span>
                                    </div>
                                    <div className={styles.categoryList}>
                                        {items.map(item => {
                                            const standardText = item.d_day_standard !== undefined ?
                                                (item.d_day_standard === 0 ? "D-Day" : `D${item.d_day_standard > 0 ? '-' : '+'}${Math.abs(item.d_day_standard)}`)
                                                : '';
                                            return (
                                                <div key={item.id} className={styles.categoryItem}>
                                                    <span>{item.text}</span>
                                                    {standardText && <span className={styles.dDayTag}>{standardText}</span>}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                <div className={styles.footer} style={{ gap: '1rem' }}>
                    <button
                        className={`${styles.button} ${styles.secondaryBtn}`}
                        onClick={() => window.print()}
                        style={{ border: '1px solid #ddd' }}
                    >
                        🖨️ 보고서 출력
                    </button>
                    <button className={`${styles.button} ${styles.primaryBtn}`} style={{ flex: 1 }} onClick={onClose}>
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}
