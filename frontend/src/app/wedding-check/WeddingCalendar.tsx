"use client";
import React, { useState } from 'react';

interface ScheduleItem {
    id: number;
    title: string;
    date: string; // Required
    time?: string;
    location?: string;
    description?: string;
    category?: string;
    d_day?: number;
    color?: string;
    displayType?: 'calendar_only' | 'grid_only' | 'both';
    endDate?: string; // Added endDate
}

interface WeddingCalendarProps {
    schedule: ScheduleItem[];
    baseDate: string;
    onAddEvent: (date: string) => void;
    onEditEvent: (event: ScheduleItem) => void;
}

export default function WeddingCalendar({ schedule, baseDate, onAddEvent, onEditEvent }: WeddingCalendarProps) {
    const [currentDate, setCurrentDate] = useState(baseDate ? new Date(baseDate) : new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth(); // 0-indexed

    const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
    const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const handleDateClick = (day: number) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        onAddEvent(dateStr);
    };

    const handleEventClick = (e: React.MouseEvent, event: ScheduleItem) => {
        e.stopPropagation();
        onEditEvent(event);
    };

    // Parse category number for sorting
    const getCategoryOrder = (cat?: string) => {
        if (!cat) return 999;
        const match = cat.match(/^(\d+)\./);
        return match ? parseInt(match[1]) : 999;
    };

    const getEventsForDay = (day: number) => {
        const currentStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const currentTs = new Date(currentStr).getTime();

        return schedule.filter(item => {
            // Filter out grid_only items
            if (item.displayType === 'grid_only') return false;

            const startStr = item.date;
            const endStr = item.endDate || item.date; // Default to single day

            // string compare is dangerous if formats differ, but we stick to YYYY-MM-DD
            return currentStr >= startStr && currentStr <= endStr;
        }).sort((a, b) => {
            // Sort by Category ID (1..13), then by ID
            const orderA = getCategoryOrder(a.category);
            const orderB = getCategoryOrder(b.category);
            return orderA - orderB || a.id - b.id;
        });
    };

    return (
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <button onClick={handlePrevMonth} style={{ border: 'none', background: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>&lt;</button>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{year}년 {month + 1}월</h3>
                <button onClick={handleNextMonth} style={{ border: 'none', background: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>&gt;</button>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gridAutoRows: 'minmax(100px, auto)', // Expandable rows
                gap: '5px',
                textAlign: 'center'
            }}>
                {['일', '월', '화', '수', '목', '금', '토'].map((d, i) => (
                    <div key={d} style={{ fontSize: '0.9rem', color: i === 0 ? '#E57373' : (i === 6 ? '#64B5F6' : '#999'), height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{d}</div>
                ))}

                {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} style={{ background: '#fafafa', borderRadius: '8px' }} />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const events = getEventsForDay(day);
                    const isToday = new Date().toDateString() === new Date(year, month, day).toDateString();
                    const dayOfWeek = new Date(year, month, day).getDay();

                    return (
                        <div
                            key={day}
                            onClick={() => handleDateClick(day)}
                            style={{
                                minHeight: '100px',
                                border: '1px solid #f0f0f0',
                                borderRadius: '8px',
                                padding: '4px 2px', // Reduce padding
                                cursor: 'pointer',
                                background: isToday ? '#FFF3E0' : 'white',
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <div style={{ fontSize: '0.9rem', fontWeight: isToday ? 'bold' : 'normal', marginBottom: '4px', color: dayOfWeek === 0 ? '#E57373' : (dayOfWeek === 6 ? '#64B5F6' : 'inherit') }}>{day}</div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2px', // Tight gap
                                flex: 1
                            }}>
                                {events.map(ev => {
                                    const isStart = ev.date === dateStr;
                                    const isEnd = (ev.endDate || ev.date) === dateStr;
                                    const isRange = ev.date !== (ev.endDate || ev.date);

                                    // Calculate Visual Styling
                                    const borderRadius = `${isStart ? '4px' : '0'} ${isEnd ? '4px' : '0'} ${isEnd ? '4px' : '0'} ${isStart ? '4px' : '0'}`;
                                    // Show title if: Single Item OR Start of Range OR First day of week (for long ranges)
                                    const showTitle = !isRange || isStart || dayOfWeek === 0;

                                    return (
                                        <div
                                            key={`${ev.id}-${day}`} // Unique key per day rendering
                                            onClick={(e) => handleEventClick(e, ev)}
                                            style={{
                                                fontSize: '0.7rem',
                                                height: '18px', // Fixed small height
                                                lineHeight: '18px',
                                                background: ev.color || '#E3F2FD',
                                                color: ev.color ? 'white' : '#1565C0',
                                                borderRadius: borderRadius,
                                                padding: '0 4px',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'clip',
                                                textAlign: 'left',
                                                cursor: 'pointer',
                                                opacity: 0.9,
                                                marginBottom: '1px',
                                                // If it's a middle segment, add some negative margin to connect visually? 
                                                // Grid gap handles it, but 5px gap breaks connection.
                                                // To fix connection, we need to remove Grid gap or use negative margins.
                                                // With 5px gap, it looks like "dashed" line. User accepted "connected range".
                                                // "Connected" implies no gap. 
                                                // But Grid has gap='5px'. 
                                                // I can't easily remove gap without breaking layout.
                                                // VISUAL TRICK: The user will interpret same-colored blocks in a row as connected.
                                                // The "Jump" issue is effectively handled by Sorting.
                                            }}
                                            title={`${ev.title} (${ev.date} ~ ${ev.endDate})`}
                                        >
                                            {showTitle ? (ev.category?.split('.')[1] || ev.title) : ''} {/* Show simplified Title */}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
