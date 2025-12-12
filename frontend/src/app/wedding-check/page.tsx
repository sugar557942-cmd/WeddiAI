"use client";
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import ChecklistModal from './ChecklistModal';
import AnalysisModal from './AnalysisModal';
import WeddingScheduleGrid from './WeddingScheduleGrid';
import WeddingCalendar from './WeddingCalendar';
import CalendarEventModal from './CalendarEventModal'; // Added
import { INITIAL_CHECKLIST } from './checklistData';

/**
 * WeddiAI - Wedding Check Feature
 */

interface ScheduleItem {
    id: number;
    title: string;
    date: string;
    time?: string;
    location?: string;
    description?: string;
    category?: string;
    d_day?: number;
    color?: string;
    displayType?: 'calendar_only' | 'grid_only' | 'both';
    endDate?: string;
}

const CATEGORY_COLORS = [
    '#EF5350', // 1. Red 400
    '#EC407A', // 2. Pink 400
    '#AB47BC', // 3. Purple 400
    '#7E57C2', // 4. Deep Purple 400
    '#5C6BC0', // 5. Indigo 400
    '#42A5F5', // 6. Blue 400
    '#29B6F6', // 7. Light Blue 400
    '#26C6DA', // 8. Cyan 400
    '#26A69A', // 9. Teal 400
    '#66BB6A', // 10. Green 400
    '#9CCC65', // 11. Light Green 400
    '#D4E157', // 12. Lime 400
    '#FFA726', // 13. Orange 400
];

const getCategoryColor = (categoryName: string) => {
    // Extract leading number "1." -> Index 0
    const match = categoryName.match(/^(\d+)\./);
    if (match) {
        const idx = parseInt(match[1]) - 1;
        if (idx >= 0 && idx < CATEGORY_COLORS.length) {
            return CATEGORY_COLORS[idx];
        }
    }
    return '#E0E0E0'; // Gray default
};

export default function WeddingCheckPage() {
    // Mock State for UI Prototype
    const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);

    const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
    const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Calendar Event Modal State
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<ScheduleItem | null>(null);
    const [initialModalDate, setInitialModalDate] = useState<string>('');

    const toggleCheck = (id: number) => {
        setChecklist(prev => prev.map(item =>
            item.id === id ? { ...item, done: !item.done } : item
        ));
    };

    const handleSaveChecklist = () => {
        setIsSubmitted(true);
        setIsCheckModalOpen(false);
    };

    // Calculate Progress
    const totalImportance = checklist.reduce((acc, item) => acc + item.importance, 0);
    const completedImportance = checklist.reduce((acc, item) => item.done ? acc + item.importance : acc, 0);
    const progress = totalImportance > 0 ? Math.round((completedImportance / totalImportance) * 100) : 0;

    // State for D-Day
    const [weddingDate, setWeddingDate] = useState<string>("");

    // Calculate D-Day
    const getDDay = () => {
        if (!weddingDate) return "미설정";
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const target = new Date(weddingDate);
        target.setHours(0, 0, 0, 0);

        const diffTime = target.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return "D-Day";
        if (diffDays < 0) return `D+${Math.abs(diffDays)}`;
        return `D-${diffDays}`;
    };

    // Schedule API
    const [schedule, setSchedule] = useState<ScheduleItem[]>([]);

    useEffect(() => {
        // Initial Fetch
        fetch('http://localhost:3005/api/wedding-schedule-template')
            .then(res => res.json())
            .then(data => {
                if (data.schedule) {
                    const today = new Date();
                    const formatted = data.schedule.map((item: any) => {
                        return {
                            ...item,
                            date: new Date(Date.now() + (300 - item.d_day) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                        };
                    });
                    setSchedule(formatted);
                }
            })
            .catch(err => console.error("Failed to fetch schedule:", err));
    }, []);

    // Handlers for Calendar Interaction
    const handleAddEvent = (date: string) => {
        console.log("handleAddEvent called with:", date);
        setSelectedEvent(null);
        setInitialModalDate(date);
        setIsEventModalOpen(true);
    };

    const handleEditEvent = (event: ScheduleItem) => {
        console.log("handleEditEvent called with:", event);
        setSelectedEvent(event);
        setIsEventModalOpen(true);
    };

    const handleSaveEvent = (savedItem: ScheduleItem) => {
        // Compute D-Day if possible
        let dDayValue = 0;
        if (weddingDate && savedItem.date) {
            const wDate = new Date(weddingDate);
            const eDate = new Date(savedItem.date);
            const diffTime = wDate.getTime() - eDate.getTime();
            dDayValue = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        }

        const enrichedItem = {
            ...savedItem,
            d_day: savedItem.d_day ?? dDayValue,
            category: savedItem.category || 'manual'
        };

        if (selectedEvent) {
            // Update existing
            setSchedule(prev => prev.map(item => item.id === savedItem.id ? enrichedItem : item));
        } else {
            // Add new
            const newId = Math.max(...schedule.map(i => i.id), 0) + 1;
            setSchedule(prev => [...prev, { ...enrichedItem, id: newId }]);
        }
        setIsEventModalOpen(false);
    };

    const handleDeleteEvent = (id: number) => {
        setSchedule(prev => prev.filter(item => item.id !== id));
        setIsEventModalOpen(false);
    };

    const handleAutoSchedule = () => {
        if (!weddingDate) {
            alert("먼저 결혼 예정일을 설정해주세요.");
            return;
        }

        const weddingTime = new Date(weddingDate).getTime();
        const todayTime = new Date().getTime();
        const totalDuration = weddingTime - todayTime;

        if (totalDuration < 0) {
            alert("이미 지난 결혼식 날짜입니다. 일정을 생성할 수 없습니다.");
            return;
        }

        const daysRemaining = Math.ceil(totalDuration / (1000 * 60 * 60 * 24));

        if (!confirm(`현재 결혼식까지 ${daysRemaining}일 남았습니다.\n남은 기간에 비례하여 그룹별 일정을 생성하시겠습니까?`)) {
            return;
        }

        // 1. Group items by Category
        const grouped = checklist.reduce((acc, item) => {
            const cat = item.category || '기타';
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(item);
            return acc;
        }, {} as Record<string, typeof checklist>);

        const newScheduleItems: ScheduleItem[] = [];

        Object.entries(grouped).forEach(([category, items]) => {
            const catColor = getCategoryColor(category);

            // Group Summary Calculation
            if (items.length > 0 && items[0].pct_range) {
                const minPct = Math.min(...items.map(i => i.pct_range ? i.pct_range[0] : 100));
                const maxPct = Math.max(...items.map(i => i.pct_range ? i.pct_range[1] : 0));

                // Calculate Start/End Date
                const startTime = todayTime + (totalDuration * (minPct / 100));
                const startDateStr = new Date(startTime).toISOString().split('T')[0];

                const endTime = todayTime + (totalDuration * (maxPct / 100));
                const endDateStr = new Date(endTime).toISOString().split('T')[0];

                // Create Single Range Event (Calendar Only)
                newScheduleItems.push({
                    id: Math.floor(Math.random() * 100000) + 900000,
                    title: category, // Whole Category Name
                    date: startDateStr,
                    endDate: endDateStr, // Range End
                    category: category,
                    color: catColor,
                    displayType: 'calendar_only',
                    description: `${category} 전체 일정 (${minPct}% ~ ${maxPct}%)`
                });
            }

            // Create Detailed Tasks (Grid Only) - Existing logic
            items.forEach(item => {
                if (item.done) return; // Skip completed items
                let targetDate = "";
                let adjustedDDay = item.d_day_standard;

                if (item.pct_range) {
                    const targetPct = item.pct_range[1];
                    const timeFromToday = totalDuration * (targetPct / 100);
                    const targetTime = todayTime + timeFromToday;
                    targetDate = new Date(targetTime).toISOString().split('T')[0];

                    const diffDays = Math.ceil((weddingTime - targetTime) / (1000 * 60 * 60 * 24));
                    adjustedDDay = diffDays;
                } else if (item.d_day_standard !== undefined) {
                    const targetTime = weddingTime - (item.d_day_standard * 24 * 60 * 60 * 1000);
                    targetDate = new Date(targetTime).toISOString().split('T')[0];
                }

                if (targetDate) {
                    newScheduleItems.push({
                        id: item.id,
                        title: item.text,
                        date: targetDate,
                        category: item.category,
                        d_day: adjustedDDay,
                        color: catColor,
                        displayType: 'grid_only', // Hide from Calendar
                        description: `[자동 배분] ${item.category}`
                    });
                }
            });
        });

        setSchedule(prev => {
            const manualItems = prev.filter(i => !i.description?.includes('[자동'));
            return [...manualItems, ...newScheduleItems];
        });

        alert("일정이 생성되었습니다.\n캘린더에는 '그룹별 구간'이 표시됩니다.");
    };

    const handleOpenReport = () => {
        // Save current state to LocalStorage for the new window to pick up
        localStorage.setItem('weddingChecklist', JSON.stringify(checklist));
        localStorage.setItem('weddingDate', weddingDate);

        // Open new window
        window.open('/wedding-check/report', '_blank', 'width=1000,height=800,scrollbars=yes');
    };

    return (
        <main className={styles.main}>
            {/* 1. Header Area */}
            <div className={styles.header}>
                <h1 className={styles.title}>AI 웨딩체크</h1>
                <p className={styles.subtitle}>둘이 함께 준비하는 결혼 일정, 한눈에 정리해드립니다.</p>
            </div>

            {/* 2. Top Summary Card */}
            <section className={styles.summarySection}>
                <div className={styles.dateInputArea}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>결혼 예정일</h2>
                    <input
                        type="date"
                        value={weddingDate}
                        onChange={(e) => setWeddingDate(e.target.value)}
                        className={styles.dateInput}
                        style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', marginBottom: '0.5rem' }}
                    />
                    <div style={{ fontSize: '3rem', fontWeight: '800', color: '#E57373', lineHeight: '1.2' }}>
                        {getDDay()}
                    </div>
                    {weddingDate && <div style={{ color: '#888' }}>{weddingDate}</div>}
                </div>
                <div className={styles.progressArea}>
                    <h3>전체 진행도 (시스템)</h3>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--color-primary)' }}>{progress}%</div>
                    <div style={{ width: '100%', height: '10px', background: '#eee', borderRadius: '5px', marginTop: '10px', overflow: 'hidden' }}>
                        <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #E57373, #FF8A80)', transition: 'width 0.3s ease' }}></div>
                    </div>
                </div>
            </section>

            {/* 3. Main Content Area */}
            {/* If NOT submitted, show the Intro List & Preview */}
            {!isSubmitted ? (
                <div className={styles.contentGrid}>
                    {/* Intro: Checklist Prompt */}
                    <section className={styles.card} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div className={styles.cardHeader}>
                            <span>사전 체크리스트</span>
                        </div>
                        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                            <p style={{ marginBottom: '1.5rem', color: '#666' }}>
                                아직 체크리스트를 작성하지 않았습니다.<br />
                                결혼 준비 상태를 확인해보세요.
                            </p>
                            <button
                                onClick={() => setIsCheckModalOpen(true)}
                                style={{
                                    padding: '1rem 2rem',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    background: '#E57373',
                                    border: 'none',
                                    borderRadius: '12px',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(229, 115, 115, 0.4)'
                                }}
                            >
                                ✍️ 체크리스트 작성하기
                            </button>
                        </div>
                    </section>

                    {/* Intro: Mock Preview */}
                    <section className={styles.card}>
                        <div className={styles.cardHeader}>
                            <span>AI 일정 미리보기 (API)</span>
                        </div>
                        <div>
                            {schedule.length === 0 ? (
                                <div style={{ padding: '1rem', color: '#888' }}>일정을 불러오는 중입니다...</div>
                            ) : (
                                schedule.map(item => (
                                    <div key={item.id} className={styles.timelineItem}>
                                        <div className={styles.timelineDate}>D-{item.d_day}</div>
                                        <div className={styles.timelineContent}>{item.title}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>
                </div>
            ) : (
                /* If Submitted, show the Dashboard Mode */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Row 1: Checklist Status Buttons */}
                    <section className={styles.card}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <span style={{ fontWeight: 'bold', fontSize: '1.2rem', marginRight: '1rem' }}>✅ 체크리스트 완료</span>
                                <span style={{ color: '#666' }}>({checklist.filter(i => i.done).length} / {checklist.length} 완료)</span>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={() => setIsCheckModalOpen(true)}
                                    style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: '1px solid #ddd', background: 'white', cursor: 'pointer' }}
                                >
                                    🛠️ 다시 수정하기
                                </button>
                                <button
                                    onClick={handleAutoSchedule}
                                    style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: 'none', background: '#E57373', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}
                                >
                                    📅 자동 달력 적용
                                </button>
                                <button
                                    onClick={handleOpenReport}
                                    style={{ padding: '0.6rem 1.2rem', borderRadius: '8px', border: 'none', background: '#333', color: 'white', cursor: 'pointer' }}
                                >
                                    📊 준비 리스트 분석
                                </button>
                            </div>
                        </div>
                    </section>


                    {/* Row 2: Calendar & Schedule Grid */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                        {/* 1. Calendar (Top) */}
                        <div style={{ width: '100%' }}>
                            <WeddingCalendar
                                schedule={schedule}
                                baseDate={weddingDate}
                                onAddEvent={handleAddEvent}
                                onEditEvent={handleEditEvent}
                            />
                        </div>

                        {/* 2. Schedule Grid (Bottom) */}
                        <div style={{ width: '100%' }}>
                            <WeddingScheduleGrid
                                schedule={schedule}
                                onAddEvent={handleAddEvent}
                                onDeleteEvent={handleDeleteEvent}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Modals */}
            <ChecklistModal
                isOpen={isCheckModalOpen}
                onClose={() => setIsCheckModalOpen(false)}
                checklist={checklist}
                onToggle={toggleCheck}
                onSave={handleSaveChecklist}
            />

            <AnalysisModal
                isOpen={isAnalysisModalOpen}
                onClose={() => setIsAnalysisModalOpen(false)}
                checklist={checklist}
                weddingDate={weddingDate}
            />

            <CalendarEventModal
                isOpen={isEventModalOpen}
                onClose={() => setIsEventModalOpen(false)}
                event={selectedEvent}
                initialDate={initialModalDate}
                onSave={handleSaveEvent}
                onDelete={handleDeleteEvent}
            />
        </main>
    );
}
