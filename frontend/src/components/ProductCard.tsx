import Link from 'next/link';
import { Product } from '../lib/data';
import styles from './ProductCard.module.css';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.imagePlaceholder}>
                <img
                    src={product.images.front}
                    alt={product.name}
                    className={styles.cardImage}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>
            <div className={styles.info}>
                <h3 className={styles.name}>{product.name}</h3>
                <div className={styles.actions}>
                    <Link href={`/products/${product.id}`} className={styles.detailBtn}>자세히 보기</Link>
                    <Link href={`/products/${product.id}?action=simulate`} className={styles.simBtn}>바로 시뮬레이션</Link>
                </div>
            </div>
        </div>
    );
}
