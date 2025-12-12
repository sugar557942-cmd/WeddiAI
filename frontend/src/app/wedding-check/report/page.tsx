"use client";
import { useEffect, useState } from 'react';
import AnalysisReport3Page from '../AnalysisReport3Page';
import styles from '../modal.module.css'; // Reuse styles

export default function WeddingReportPage() {
    const [checklist, setChecklist] = useState<any[]>([]);
    const [weddingDate, setWeddingDate] = useState<string>("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Load data from LocalStorage
        try {
            const savedChecklist = localStorage.getItem('weddingChecklist');
            const savedDate = localStorage.getItem('weddingDate');

            if (savedChecklist) {
                setChecklist(JSON.parse(savedChecklist));
            }
            if (savedDate) {
                setWeddingDate(savedDate);
            }
        } catch (e) {
            console.error("Failed to load report data", e);
        } finally {
            setLoaded(true);
        }
    }, []);

    if (!loaded) return <div style={{ padding: '2rem', textAlign: 'center' }}>보고서 생성 중...</div>;
    if (checklist.length === 0) return <div style={{ padding: '2rem', textAlign: 'center' }}>데이터가 없습니다. 체크리스트를 먼저 작성해주세요.</div>;

    return (
        <div style={{ background: '#f5f5f5', minHeight: '100vh', padding: '2rem', display: 'flex', justifyContent: 'center' }}>
            <style jsx global>{`
                body { margin: 0; padding: 0; background: #f5f5f5; }
                @media print {
                    @page {
                        size: A4;
                        margin: 12mm;
                    }
                    html, body {
                        margin: 0 !important;
                        padding: 0 !important;
                        height: auto !important;
                        width: 100% !important;
                        background: white !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                        overflow: visible !important;
                    }
                    /* Global Height Reset */
                    * {
                        height: auto !important;
                        min-height: 0 !important;
                        max-height: none !important;
                        box-shadow: none !important;
                    }
                    .no-print { display: none !important; }
                    
                    /* Hide Navigation if it leaks through */
                    nav, header, footer {
                        display: none !important;
                    }
                }
            `}</style>

            <div style={{ width: '210mm', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className="no-print" style={{ textAlign: 'right', marginBottom: '1rem' }}>
                    <button
                        onClick={() => window.print()}
                        style={{ padding: '0.8rem 1.5rem', background: '#333', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        🖨️ PDF 저장 / 인쇄
                    </button>
                    <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                        * A4 세로 방향, 배경 그래픽 포함 설정을 권장합니다.
                    </div>
                </div>

                <AnalysisReport3Page checklist={checklist} weddingDate={weddingDate} />
            </div>
        </div>
    );
}
