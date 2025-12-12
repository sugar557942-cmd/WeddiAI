"use client";
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ConsultationType = 'dress' | 'hanbok' | 'studio' | 'filter';

interface ModalContextType {
    isConsultationOpen: boolean;
    consultationType: ConsultationType;
    initialValue: string;
    openConsultation: (type: ConsultationType, value?: string) => void;
    closeConsultation: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [isConsultationOpen, setIsConsultationOpen] = useState(false);
    const [consultationType, setConsultationType] = useState<ConsultationType>('dress'); // Fixed type
    const [initialValue, setInitialValue] = useState('');

    const openConsultation = (type: ConsultationType, value: string = '') => { // Fixed signature
        setConsultationType(type);
        setInitialValue(value);
        setIsConsultationOpen(true);
    };

    const closeConsultation = () => {
        setIsConsultationOpen(false);
        setInitialValue('');
    };

    return (
        <ModalContext.Provider value={{ isConsultationOpen, consultationType, initialValue, openConsultation, closeConsultation }}>
            {children}
        </ModalContext.Provider>
    );
}

export const useModal = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
