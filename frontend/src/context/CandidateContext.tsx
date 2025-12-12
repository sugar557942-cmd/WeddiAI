"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface CandidateItem {
    id: string;
    productId: string;
    productName: string;
    vendorName: string; // 업체정보
    contact: string; // 연락처
    simulationImage: string; // 시뮬레이션 결과 이미지
    timestamp: number;
}

interface CandidateContextType {
    candidates: CandidateItem[];
    addCandidate: (item: Omit<CandidateItem, 'id' | 'timestamp'>) => void;
    removeCandidate: (id: string) => void;
}

const CandidateContext = createContext<CandidateContextType>({
    candidates: [],
    addCandidate: () => { },
    removeCandidate: () => { },
});

export function CandidateProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [candidates, setCandidates] = useState<CandidateItem[]>([]);

    useEffect(() => {
        if (user) {
            const stored = localStorage.getItem(`candidates_${user.username}`);
            if (stored) {
                setCandidates(JSON.parse(stored));
            } else {
                setCandidates([]);
            }
        } else {
            setCandidates([]);
        }
    }, [user]);

    const addCandidate = (item: Omit<CandidateItem, 'id' | 'timestamp'>) => {
        if (!user) return; // Guard
        const newItem: CandidateItem = {
            ...item,
            id: 'c_' + Date.now(),
            timestamp: Date.now(),
        };
        const updated = [newItem, ...candidates];
        setCandidates(updated);
        localStorage.setItem(`candidates_${user.username}`, JSON.stringify(updated));
    };

    const removeCandidate = (id: string) => {
        if (!user) return;
        const updated = candidates.filter(c => c.id !== id);
        setCandidates(updated);
        localStorage.setItem(`candidates_${user.username}`, JSON.stringify(updated));
    };

    return (
        <CandidateContext.Provider value={{ candidates, addCandidate, removeCandidate }}>
            {children}
        </CandidateContext.Provider>
    );
}

export const useCandidates = () => useContext(CandidateContext);
