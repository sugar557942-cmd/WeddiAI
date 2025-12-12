"use client";
import React, { useState } from 'react';
import styles from './modal.module.css'; // Re-using modal styles for general card look if needed, or inline

interface ScheduleItem {
    id: number;
    title: string;
    d_day: number;
    category: string;
    date?: string; // Specific date string YYYY-MM-DD
}

interface EditableTimelineProps {
    schedule: ScheduleItem[];
    setSchedule: (items: ScheduleItem[]) => void;
}

export default function EditableTimeline({ schedule, setSchedule }: EditableTimelineProps) {
    const handleTitleChange = (id: number, newTitle: string) => {
        setSchedule(schedule.map(item => item.id === id ? { ...item, title: newTitle } : item));
    };

    const handleDateChange = (id: number, newDate: string) => {
        setSchedule(schedule.map(item => item.id === id ? { ...item, date: newDate } : item));
    };

    const handleDelete = (id: number) => {
        if (confirm('일정을 삭제하시겠습니까?')) {
            setSchedule(schedule.filter(item => item.id !== id));
        }
    };

    const handleAdd = () => {
        const newId = Math.max(...schedule.map(i => i.id), 0) + 1;
        setSchedule([...schedule, {
            id: newId,
            title: "새로운 일정",
            d_day: 0,
            category: "custom",
            date: new Date().toISOString().split('T')[0]
        }]);
    };

    return (
        <div style={{ background: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>📅 나의 웨딩 일정표</h3>
                <button
                    onClick={handleAdd}
                    style={{ background: '#E57373', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer' }}
                >
                    + 일정 추가
                </button>
            </div>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {schedule.map((item, index) => (
                    <div key={item.id} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem', alignItems: 'center' }}>
                        <div style={{ width: '30px', fontWeight: 'bold', color: '#999', fontSize: '0.8rem' }}>
                            {index + 1}
                        </div>
                        <input
                            type="date"
                            value={item.date || ""}
                            onChange={(e) => handleDateChange(item.id, e.target.value)}
                            style={{
                                border: '1px solid #eee',
                                borderRadius: '4px',
                                padding: '4px',
                                fontSize: '0.9rem',
                                color: '#555'
                            }}
                        />
                        <input
                            type="text"
                            value={item.title}
                            onChange={(e) => handleTitleChange(item.id, e.target.value)}
                            style={{
                                flex: 1,
                                border: '1px solid #eee',
                                borderRadius: '4px',
                                padding: '6px',
                                fontSize: '0.95rem'
                            }}
                        />
                        <button
                            onClick={() => handleDelete(item.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ccc' }}
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
