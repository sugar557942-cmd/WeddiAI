"use client";
import React, { useRef } from 'react';
import styles from './report/report.module.css';
import { useOverflowProtection } from './hooks/useOverflowProtection';

interface ChecklistItem {
    id: number;
    text: string;
    done: boolean;
    importance: number;
    d_day_standard?: number;
    category?: string;
    pct_range?: number[];
}

interface ReportProps {
    checklist: ChecklistItem[];
    weddingDate?: string;
}

export default function AnalysisReport3Page({ checklist, weddingDate }: ReportProps) {
    const today = new Date();
    const wDate = weddingDate ? new Date(weddingDate) : null;
    let daysRemaining = 0;
    if (wDate) {
        daysRemaining = Math.ceil((wDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    }

    const totalItems = checklist.length;
    const doneItems = checklist.filter(i => i.done).length;
    const progressPct = totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;

    // --- Content Density Control (Page 2) ---
    const page2Ref = useRef<HTMLDivElement>(null);
    const reductionLevel = useOverflowProtection({ ref: page2Ref, maxAttempts: 3 });

    // Adaptive Limits
    let urgentLimit = 10;
    let criticalCardCount = 3;
    let criticalBullets = 3;
    let showMoreHint = false;

    if (reductionLevel >= 1) { urgentLimit = 8; showMoreHint = true; }
    if (reductionLevel >= 2) { urgentLimit = 6; criticalBullets = 2; }
    if (reductionLevel >= 3) { urgentLimit = 5; criticalCardCount = 2; }

    // --- Data Calculation ---
    // Groups 1 to 13
    const groups = Array.from(new Set(checklist.map(i => i.category || '기타'))).sort((a, b) => {
        const numA = parseInt(a.split('.')[0]) || 999;
        const numB = parseInt(b.split('.')[0]) || 999;
        return numA - numB;
    });

    const groupStats = groups.map(cat => {
        const items = checklist.filter(i => (i.category || '기타') === cat);
        const done = items.filter(i => i.done).length;
        const total = items.length;
        const pct = Math.round((done / total) * 100);

        let risk = "Low";
        let comment = "순조로움";

        if (pct < 30) {
            risk = "High";
            comment = "진행 필요";
        } else if (pct < 70) {
            risk = "Med";
            comment = "진행 중";
        }
        return {
            name: cat,
            done, total, pct, risk, comment, items
        };
    });

    // --- Analysis & Plan Data ---
    const remainingItems = checklist.filter(i => !i.done);
    const urgentItems = remainingItems.slice(0, urgentLimit); // ADAPTIVE LIMIT
    const criticalGroups = groupStats.filter(g => g.pct < 100).slice(0, criticalCardCount); // ADAPTIVE LIMIT
    const bucketUrgent = remainingItems.slice(0, 5);
    const bucketPriority = remainingItems.slice(5, 12);
    const bucketNeeded = remainingItems.slice(12, 20);

    return (
        <div className={styles.report3PageContainer}>
            {/* ================= PAGE 1 ================= */}
            <div className={styles.reportPage}>
                <div className={styles.reportHeader}>
                    <h1>WEDDING REPORT</h1>
                    <div className={styles.reportMeta}>
                        <span>예식일: <strong>{weddingDate || '미정'}</strong></span>
                        <span>/</span>
                        <span>기준일: {today.toLocaleDateString()}</span>
                        <span>/</span>
                        <span style={{ color: '#D32F2F', fontWeight: 'bold' }}>D-{daysRemaining}</span>
                    </div>
                </div>

                <div className={styles.summaryBox}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                        <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>전체 진행률</span>
                        <span style={{ color: '#1565C0', fontSize: '1.1rem', fontWeight: '800' }}>{progressPct}%</span>
                    </div>
                    <div className={styles.progressBarBg}>
                        <div className={styles.progressBarFill} style={{ width: `${progressPct}%` }}></div>
                    </div>
                    <p className={styles.summaryOneLiner}>
                        "{progressPct < 30 ? "초반 준비 단계입니다. 전체적인 흐름을 잡는 것이 중요합니다." :
                            progressPct < 70 ? "중반 단계로 안정적으로 진행되고 있습니다. 디테일을 챙기세요." :
                                "마무리 단계입니다. 놓친 부분이 없는지 최종 점검하세요."}"
                    </p>
                </div>

                <div className={styles.scoreboardSection}>
                    <h3>📊 그룹별 현황 (Scoreboard)</h3>
                    <table className={styles.reportTable}>
                        <thead>
                            <tr>
                                <th style={{ width: '25%' }}>그룹</th>
                                <th style={{ width: '35%' }}>진행률</th>
                                <th style={{ width: '15%' }}>완료</th>
                                <th style={{ width: '10%' }}>상태</th>
                                <th style={{ width: '15%' }}>비고</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupStats.map((g, idx) => (
                                <tr key={idx}>
                                    <td>{g.name.split('.')[1] || g.name}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div className={styles.progressBarBg} style={{ flex: 1, minWidth: '50px', height: '6px' }}>
                                                <div
                                                    className={styles.progressBarFill}
                                                    style={{
                                                        width: `${g.pct}%`,
                                                        background: g.pct === 100 ? '#81C784' : '#64B5F6'
                                                    }}
                                                ></div>
                                            </div>
                                            <span style={{ fontSize: '0.75rem', color: '#666' }}>{g.pct}%</span>
                                        </div>
                                    </td>
                                    <td>{g.done}/{g.total}</td>
                                    <td>
                                        <span className={`${styles.badge} ${g.risk === 'High' ? styles.badgeRed : g.risk === 'Med' ? styles.badgeYellow : styles.badgeGreen}`}>
                                            {g.risk}
                                        </span>
                                    </td>
                                    <td>{g.comment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ================= PAGE 2 ================= */}
            <div className={`${styles.reportPage} ${styles.page2}`} ref={page2Ref}>
                <h2>🔎 핵심 분석 (Analysis)</h2>

                <div className={`${styles.analysisSection} ${styles.analysisTop5}`}>
                    <h3>⚡ 남은 일정 Top {urgentLimit} {showMoreHint && <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: '#666' }}>(주요 항목 요약)</span>}</h3>
                    <table className={styles.reportTable}>
                        <thead>
                            <tr>
                                <th style={{ width: '8%' }}>No.</th>
                                <th style={{ width: '25%' }}>그룹</th>
                                <th style={{ width: '40%' }}>항목명</th>
                                <th style={{ width: '27%' }}>권장 행동</th>
                            </tr>
                        </thead>
                        <tbody>
                            {urgentItems.map((item, idx) => (
                                <tr key={item.id}>
                                    <td>{idx + 1}</td>
                                    <td>{item.category?.split('.')[1]}</td>
                                    <td style={{ fontWeight: '600', maxWidth: '150px' }} className={styles.truncateOneLine}>{item.text}</td>
                                    <td style={{ color: '#D32F2F', fontSize: '0.75rem', fontWeight: '600' }}>즉시 확인</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {showMoreHint && (
                        <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#888', marginTop: '4px', fontStyle: 'italic' }}>
                            ... 나머지 항목은 다음 페이지 또는 앱에서 확인하세요
                        </div>
                    )}
                </div>

                <div className={`${styles.analysisSection} ${styles.analysisCritical}`}>
                    <h3>📌 중점 관리 그룹 (Critical)</h3>
                    <div className={`${styles.criticalGroupsGrid} ${styles.blockCriticalGrid}`}>
                        {criticalGroups.map(g => (
                            <div key={g.name} className={styles.criticalCard}>
                                <h4>{g.name}</h4>
                                <div className={styles.criticalStat}>진행: <span style={{ color: '#D32F2F' }}>{g.pct}%</span></div>
                                <div className={styles.criticalList}>
                                    <ul>
                                        {g.items.filter(i => !i.done).slice(0, criticalBullets).map(i => ( // ADAPTIVE LIMIT
                                            <li key={i.id} className={styles.truncateOneLine}>{i.text}</li>
                                        ))}
                                        {g.items.filter(i => !i.done).length > criticalBullets && <li>...</li>}
                                    </ul>
                                </div>
                                <div className={styles.criticalAdvice}>
                                    이번 주 확인 필요
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`${styles.riskSection} ${styles.analysisRisk}`}>
                    <h3>⚠️ 리스크 점검 (Risk Check)</h3>
                    <ul className={styles.riskList}>
                        <li>
                            <strong>💰 예산</strong>:
                            {progressPct < 50 ? " 예산 분담 원칙이 확정되지 않았다면 초기 지출이 커질 수 있습니다." : " 추가금(Option) 비용을 점검하세요."}
                        </li>
                        <li>
                            <strong>🗓 일정</strong>:
                            {daysRemaining < 120 && progressPct < 40 ? " 예식장/스드메 예약이 마감되었을 가능성이 높습니다." : " 주요 예약은 완료되었으나, 잔금 일정을 체크하세요."}
                        </li>
                        <li>
                            <strong>🏭 공급</strong>:
                            {daysRemaining < 200 ? " 인기 업체는 조기 마감되므로 잔여 타임 프로모션을 확인하세요." : " 원하는 업체를 선점하기 좋은 시기입니다."}
                        </li>
                    </ul>
                </div>

                {/* Safety Margin for Overflow Detection */}
                <div style={{ height: '12mm', width: '100%' }}></div>
            </div>

            {/* ================= PAGE 3 ================= */}
            <div className={styles.reportPage}>
                <h2>🚀 실행 계획 (Action Plan)</h2>

                <div className={styles.actionPlanSection}>
                    <h3>📅 기간별 목표</h3>
                    <table className={styles.reportTable}>
                        <thead>
                            <tr>
                                <th style={{ width: '20%' }}>기간</th>
                                <th style={{ width: '50%' }}>해야 할 일</th>
                                <th style={{ width: '30%' }}>비고</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bucketUrgent.slice(0, 3).map(i => (
                                <tr key={i.id}>
                                    <td style={{ color: '#D32F2F', fontWeight: 'bold' }}>To-Do (이번 주)</td>
                                    <td>{i.text}</td>
                                    <td>즉시 실행</td>
                                </tr>
                            ))}
                            {bucketPriority.slice(0, 3).map(i => (
                                <tr key={i.id}>
                                    <td style={{ color: '#F57C00' }}>To-Do (이번 달)</td>
                                    <td>{i.text}</td>
                                    <td>사전 예약</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className={styles.bucketSection}>
                    <h3>📝 남은 일 리스트 (Bucket)</h3>
                    <div className={styles.bucketsContainer}>
                        <div className={styles.bucket}>
                            <h5 style={{ color: '#D32F2F' }}>🔥 Urgent</h5>
                            <ul>{bucketUrgent.map(i => <li key={i.id}>{i.text}</li>)}</ul>
                        </div>
                        <div className={styles.bucket}>
                            <h5 style={{ color: '#F57C00' }}>⚡ Priority</h5>
                            <ul>{bucketPriority.map(i => <li key={i.id}>{i.text}</li>)}</ul>
                        </div>
                        <div className={styles.bucket}>
                            <h5 style={{ color: '#388E3C' }}>✅ Needed</h5>
                            <ul>{bucketNeeded.map(i => <li key={i.id}>{i.text}</li>)}</ul>
                        </div>
                    </div>
                </div>

                <div className={styles.closingComment}>
                    <p>
                        "준비된 시작이 성공적인 결혼식을 만듭니다.<br />
                        오늘 정리된 우선순위를 바탕으로, 이번 주 <strong>{urgentItems[0]?.text || "계획"}</strong>부터 시작해보세요."
                    </p>
                </div>
            </div>
        </div>
    );
}
