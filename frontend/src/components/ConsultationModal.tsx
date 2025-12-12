"use client";
import { useState, useEffect } from 'react';
import styles from './ConsultationModal.module.css';
import { useModal } from '../context/ModalContext';
import { STUDIOS } from '../lib/studioData';
import { PRODUCTS } from '../lib/data';

export default function ConsultationModal() {
    const { isConsultationOpen, closeConsultation, consultationType, initialValue, openConsultation } = useModal();
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [targetName, setTargetName] = useState('');
    const [date1, setDate1] = useState('');
    const [date2, setDate2] = useState('');
    const [inquiry, setInquiry] = useState('');

    // Autocomplete states
    const [filteredItems, setFilteredItems] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    useEffect(() => {
        if (isConsultationOpen) {
            setTargetName(initialValue || '');
        }
    }, [isConsultationOpen, initialValue]);

    const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setTargetName(value);

        if (value.length > 0) {
            let filtered: string[] = [];
            if (consultationType === 'dress') {
                filtered = PRODUCTS.filter(p => p.type === 'dress' && p.name.includes(value)).map(p => p.name);
            } else if (consultationType === 'hanbok') {
                filtered = PRODUCTS.filter(p => p.type === 'hanbok' && p.name.includes(value)).map(p => p.name);
            } else {
                filtered = STUDIOS.filter(s => s.name.includes(value)).map(s => s.name);
            }
            setFilteredItems(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    };

    const selectItem = (name: string) => {
        setTargetName(name);
        setShowSuggestions(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let typeLabel = '제품명';
        if (consultationType === 'studio') typeLabel = '스튜디오';

        const dateLabel = consultationType === 'studio' ? '촬영 희망일' : '피팅 희망일';
        const typeNameMap: { [key: string]: string } = { 'dress': '웨딩드레스', 'hanbok': '한복', 'studio': '스튜디오' };

        alert(`${typeNameMap[consultationType]} 상담 신청이 완료되었습니다.\n\n이름: ${name}\n연락처: ${contact}\n${typeLabel}: ${targetName}\n${dateLabel} 1: ${date1}\n${dateLabel} 2: ${date2}`);
        setName(''); setContact(''); setTargetName(''); setDate1(''); setDate2(''); setInquiry('');
        closeConsultation();
    };

    // Tab switching handler
    const handleTypeChange = (type: 'dress' | 'hanbok' | 'studio') => {
        // We use openConsultation to update the type context, effectively switching modes
        // Use current targetName if reasonable, or clear it if switching distinct categories?
        // Let's clear targetName to avoid confusion (searching dress in studio mode)
        openConsultation(type, '');
    };

    if (!isConsultationOpen) return null;

    const isStudio = consultationType === 'studio';
    const isDress = consultationType === 'dress';
    const isHanbok = consultationType === 'hanbok';

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={closeConsultation}>&times;</button>

                {/* Type Selection Tabs */}
                <div className={styles.typeTabs}>
                    <button
                        className={`${styles.tabBtn} ${isDress ? styles.activeTab : ''}`}
                        onClick={() => handleTypeChange('dress')}
                    >
                        웨딩드레스
                    </button>
                    <button
                        className={`${styles.tabBtn} ${isHanbok ? styles.activeTab : ''}`}
                        onClick={() => handleTypeChange('hanbok')}
                    >
                        한복
                    </button>
                    <button
                        className={`${styles.tabBtn} ${isStudio ? styles.activeTab : ''}`}
                        onClick={() => handleTypeChange('studio')}
                    >
                        스튜디오
                    </button>
                </div>

                <h2>
                    {isDress && '웨딩 드레스 상담 신청'}
                    {isHanbok && '한복 상담 신청'}
                    {isStudio && '스튜디오 촬영 상담 신청'}
                </h2>
                <p>
                    전문 코디네이터가 1:1로
                    {isStudio ? ' 촬영 예약을' : ' 피팅을'} 도와드립니다.
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>이름</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="성함을 입력해주세요" required />
                        </div>
                        <div className={styles.field}>
                            <label>연락처</label>
                            <input type="tel" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="010-0000-0000" required />
                        </div>
                    </div>

                    <div className={styles.field} style={{ position: 'relative' }}>
                        <label>
                            {isDress && '관심 드레스 (선택)'}
                            {isHanbok && '관심 한복 (선택)'}
                            {isStudio && '관심 스튜디오 (선택)'}
                        </label>
                        <input
                            type="text"
                            value={targetName}
                            onChange={handleTargetChange}
                            placeholder={isStudio ? "스튜디오명을 입력하세요" : "제품명을 입력하세요"}
                            onFocus={() => targetName && setShowSuggestions(true)}
                        />
                        {showSuggestions && filteredItems.length > 0 && (
                            <ul className={styles.suggestions}>
                                {filteredItems.map((item, idx) => (
                                    <li key={idx} onClick={() => selectItem(item)}>{item}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label>{isStudio ? '촬영 희망일 1' : '피팅 희망일 1'}</label>
                            <input type="date" value={date1} onChange={(e) => setDate1(e.target.value)} />
                        </div>
                        <div className={styles.field}>
                            <label>{isStudio ? '촬영 희망일 2' : '피팅 희망일 2'}</label>
                            <input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label>문의 내용</label>
                        <textarea value={inquiry} onChange={(e) => setInquiry(e.target.value)} placeholder="문의사항을 적어주세요." rows={4} required />
                    </div>
                    <button type="submit" className={styles.submitBtn}>발송하기</button>
                </form>
            </div>
        </div>
    );
}
