"use client";
import React from 'react';

interface ScheduleItem {
    id: number;
    title: string;
    date: string;
    time?: string;
    location?: string;
    description?: string;
    category?: string;
    d_day?: number;
}

interface WeddingGanttChartProps {
    schedule: ScheduleItem[];
}

export default function WeddingGanttChart({ schedule }: WeddingGanttChartProps) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Filter future events
    const validItems = schedule
        .filter(item => item.date && new Date(item.date) >= today)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (validItems.length === 0) {
        return (
            <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', color: '#888' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                <p>예정된 일정이 없습니다.</p>
            </div>
        );
    }

    // Determine constraints for scale
    const firstDate = today;
    const lastDate = new Date(validItems[validItems.length - 1].date);

    // Add buffer to last date (e.g., 7 days) if it's too close to first date
    if (lastDate.getTime() - firstDate.getTime() < 1000 * 60 * 60 * 24 * 30) {
        lastDate.setDate(lastDate.getDate() + 30);
    }

    const totalDuration = lastDate.getTime() - firstDate.getTime();

    const getPosition = (dateStr: string) => {
        const d = new Date(dateStr);
        const diff = d.getTime() - firstDate.getTime();
        const pct = (diff / totalDuration) * 100;
        return Math.min(100, Math.max(0, pct));
    };

    const getDDay = (dateStr: string) => {
        const d = new Date(dateStr);
        const diff = Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return diff === 0 ? "Today" : `D-${diff}`;
    };

    return (
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', height: '100%', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>📉 남은 일정 차트 (Gantt)</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                {validItems.map((item, index) => {
                    const widthPct = getPosition(item.date);

                    return (
                        <div key={item.id} style={{ position: 'relative' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.9rem' }}>
                                <span style={{ fontWeight: 'bold', color: '#333' }}>{item.title}</span>
                                <span style={{ color: '#E57373', fontWeight: 'bold' }}>{getDDay(item.date)}</span>
                            </div>

                            {/* Track */}
                            <div style={{ width: '100%', height: '8px', background: '#f0f0f0', borderRadius: '4px', position: 'relative' }}>
                                {/* Bar (From Today to Date) */}
                                <div
                                    style={{
                                        width: `${widthPct}%`,
                                        height: '100%',
                                        background: 'linear-gradient(90deg, #E57373, #FFCCBC)',
                                        borderRadius: '4px',
                                        transition: 'width 0.5s ease'
                                    }}
                                />
                                {/* Marker at end */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        left: `${widthPct}%`,
                                        top: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: '12px',
                                        height: '12px',
                                        background: 'white',
                                        border: '3px solid #E57373',
                                        borderRadius: '50%',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}
                                />
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#999', marginTop: '4px', textAlign: 'right' }}>
                                {item.date} {item.time ? ` | ${item.time}` : ''}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div style={{ marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1rem', color: '#888', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between' }}>
                <span>Today</span>
                <span>Future ({totalDuration / (1000 * 60 * 60 * 24)} days range)</span>
            </div>
        </div>
    );
}
