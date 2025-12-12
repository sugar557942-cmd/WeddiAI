"use client";
import React, { useState } from 'react';

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
}

interface WeddingScheduleGridProps {
    schedule: ScheduleItem[];
    onAddEvent: (date: string) => void;
    onDeleteEvent: (id: number) => void;
}

export default function WeddingScheduleGrid({ schedule, onAddEvent, onDeleteEvent }: WeddingScheduleGridProps) {
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

    // Group items by category
    const groupedSchedule = schedule.reduce((acc, item) => {
        const cat = item.category || '기타 (Others)';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(item);
        return acc;
    }, {} as Record<string, ScheduleItem[]>);

    // Sort categories (Auto 1., 2. ... first, then others)
    const sortedCategories = Object.keys(groupedSchedule).sort((a, b) => {
        // Extract number from "1. Title"
        const numA = parseInt(a.split('.')[0]) || 999;
        const numB = parseInt(b.split('.')[0]) || 999;
        return numA - numB;
    });

    const toggleCategory = (category: string) => {
        setExpandedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const getDDay = (dateStr: string) => {
        const d = new Date(dateStr);
        const diff = Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
        return diff === 0 ? "D-Day" : `D-${diff}`;
    };

    return (
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>📉 남은 일정 (Schedule Breakdown)</h3>
                <button
                    onClick={() => onAddEvent(new Date().toISOString().split('T')[0])}
                    style={{
                        padding: '0.4rem 0.8rem',
                        background: '#f5f5f5',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem'
                    }}
                >
                    ➕ 일정 추가
                </button>
            </div>

            {sortedCategories.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 0', color: '#888' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
                    <p>예정된 일정이 없습니다.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {sortedCategories.map(category => {
                        const items = groupedSchedule[category].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                        const isExpanded = expandedCategories.includes(category);
                        const categoryColor = items[0]?.color || '#E57373'; // Use color from first item or default

                        return (
                            <div key={category} style={{ border: '1px solid #eee', borderRadius: '12px', overflow: 'hidden' }}>
                                {/* Header */}
                                <div
                                    onClick={() => toggleCategory(category)}
                                    style={{
                                        padding: '1rem',
                                        background: '#fafafa',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        fontWeight: '600'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: categoryColor }}></div>
                                        <span>{category}</span>
                                        <span style={{ fontSize: '0.8rem', color: '#888', fontWeight: 'normal' }}>({items.length})</span>
                                    </div>
                                    <span style={{ transition: 'transform 0.2s', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                        ▼
                                    </span>
                                </div>

                                {/* Body */}
                                {isExpanded && (
                                    <div style={{
                                        padding: '1rem',
                                        background: 'white',
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                                        gap: '1rem'
                                    }}>
                                        {items.map(item => (
                                            <div key={item.id} style={{
                                                border: '1px solid #f0f0f0',
                                                borderRadius: '8px',
                                                padding: '0.8rem',
                                                position: 'relative',
                                                borderLeft: `3px solid ${item.color || '#ddd'}`
                                            }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                                    <span style={{
                                                        color: item.color || '#666',
                                                        fontWeight: 'bold',
                                                        fontSize: '0.8rem',
                                                        background: '#f9f9f9',
                                                        padding: '2px 6px',
                                                        borderRadius: '4px'
                                                    }}>
                                                        {getDDay(item.date)}
                                                    </span>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); onDeleteEvent(item.id); }}
                                                        style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5 }}
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                                <div style={{ fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '0.3rem' }}>{item.title}</div>
                                                <div style={{ fontSize: '0.85rem', color: '#666' }}>📅 {item.date}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
