import styles from './page.module.css';
import ProductCard from '../../components/ProductCard';
import { PRODUCTS } from '../../lib/data';

export default function ProductsPage({
    searchParams,
}: {
    searchParams: { category?: string };
}) {
    const category = searchParams.category;
    let title = "전체 컬렉션";
    let subtitle = "당신의 특별한 순간을 위한 모든 컬렉션";

    if (category === 'dress') {
        title = "웨딩드레스 컬렉션";
        subtitle = "우아함의 정점, 당신만의 드레스를 만나보세요";
    } else if (category === 'hanbok') {
        title = "프리미엄 한복 컬렉션";
        subtitle = "전통의 기품과 현대적 감각의 조화";
    }

    const filteredProducts = category
        ? PRODUCTS.filter(p => p.type === category)
        : PRODUCTS;

    return (
        <main className={styles.main}>
            <div className={styles.titleHeader}>
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>
            <div className={styles.grid}>
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </main>
    );
}
