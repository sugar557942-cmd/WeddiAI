"use client";
import { useState, useEffect } from 'react';
import styles from './modal.module.css';

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

interface CalendarEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: ScheduleItem | null; // If null, we are in "Add Mode"
    initialDate?: string; // For "Add Mode"
    onSave: (event: ScheduleItem) => void;
    onDelete?: (id: number) => void;
}

export default function CalendarEventModal({ isOpen, onClose, event, initialDate, onSave, onDelete }: CalendarEventModalProps) {
    const [formData, setFormData] = useState<Partial<ScheduleItem>>({});

    useEffect(() => {
        if (isOpen) {
            if (event) {
                // Edit Mode
                setFormData({ ...event });
            } else {
                // Add Mode
                setFormData({
                    title: '',
                    date: initialDate || new Date().toISOString().split('T')[0],
                    time: '',
                    location: '',
                    description: '',
                    category: 'custom'
                });
            }
        }
    }, [isOpen, event, initialDate]);

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!formData.title || !formData.date) {
            alert('일정명과 날짜는 필수입니다.');
            return;
        }
        onSave(formData as ScheduleItem);
        onClose();
    };

    const handleDelete = () => {
        if (event && onDelete && confirm('정말 삭제하시겠습니까?')) {
            onDelete(event.id);
            onClose();
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
                <button className={styles.closeBtn} onClick={onClose}>&times;</button>

                <div className={styles.header} style={{ marginBottom: '1.5rem' }}>
                    <h2 className={styles.title} style={{ fontSize: '1.4rem' }}>
                        {event ? '일정 수정' : '새 일정 추가'}
                    </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Title */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: '4px' }}>일정명 *</label>
                        <input
                            type="text"
                            className={styles.input}
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
                            value={formData.title || ''}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="예: 웨딩홀 상담"
                        />
                    </div>

                    {/* Date & Time Row */}
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: '4px' }}>날짜 *</label>
                            <input
                                type="date"
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
                                value={formData.date || ''}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: '4px' }}>시간</label>
                            <input
                                type="time"
                                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
                                value={formData.time || ''}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: '4px' }}>장소</label>
                        <input
                            type="text"
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
                            value={formData.location || ''}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            placeholder="예: 강남구 청담동"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.9rem', color: '#666', marginBottom: '4px' }}>세부 내용</label>
                        <textarea
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', minHeight: '100px', resize: 'vertical' }}
                            value={formData.description || ''}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="메모를 입력하세요."
                        />
                    </div>
                </div>

                <div className={styles.footer} style={{ justifyContent: 'space-between', marginTop: '2rem' }}>
                    {event ? (
                        <button
                            className={styles.button}
                            style={{ background: '#FFEBEE', color: '#D32F2F' }}
                            onClick={handleDelete}
                        >
                            삭제
                        </button>
                    ) : (
                        <div /> /* Spacer */
                    )}
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button className={`${styles.button} ${styles.secondaryBtn}`} onClick={onClose}>
                            취소
                        </button>
                        <button className={`${styles.button} ${styles.primaryBtn}`} onClick={handleSubmit}>
                            저장
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
