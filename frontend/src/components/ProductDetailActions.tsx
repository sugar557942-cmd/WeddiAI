"use client";
import styles from '../app/products/[id]/page.module.css';
import { useModal } from '../context/ModalContext';

interface ProductDetailActionsProps {
    location: string;
    productName: string;
    productType: 'dress' | 'hanbok' | 'filter';
}

export default function ProductDetailActions({ location, productName, productType }: ProductDetailActionsProps) {
    const { openConsultation } = useModal();

    return (
        <div className={styles.actions}>
            <button className={styles.consultBtn} onClick={() => openConsultation(productType, productName)}>
                상담하기
            </button>
            <button
                onClick={() => window.open(`https://map.naver.com/v5/search/${encodeURIComponent(location)}`, '_blank')}
                className={styles.subBtn}
            >
                지도 보기
            </button>
        </div>
    );
}
