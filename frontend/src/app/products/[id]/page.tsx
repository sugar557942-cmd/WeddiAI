import { PRODUCTS } from '../../../lib/data';
import MultiviewPanel from '../../../components/MultiviewPanel';
import ProductDetailActions from '../../../components/ProductDetailActions';
import styles from './page.module.css';

export function generateStaticParams() {
    return PRODUCTS.map((product) => ({
        id: product.id,
    }));
}

export default function ProductDetailPage({
    params,
    searchParams
}: {
    params: { id: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const product = PRODUCTS.find(p => p.id === params.id);
    const autoSimulate = searchParams?.action === 'simulate';

    if (!product) {
        return <div>상품을 찾을 수 없습니다.</div>;
    }

    return (
        <main className={styles.container}>
            <div className={styles.multiviewArea}>
                <MultiviewPanel product={product} autoSimulate={autoSimulate} />
            </div>
            <div className={styles.infoArea}>
                <h1 className={styles.title}>{product.name}</h1>
                <div className={styles.productInfo}>
                    <h3>상품 정보</h3>
                    <p className={styles.description}>{product.description}</p>
                    {product.details && (
                        <div className={styles.detailsGrid}>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>소재</span>
                                <span className={styles.detailValue}>{product.details.material}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>핏/실루엣</span>
                                <span className={styles.detailValue}>{product.details.fit}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>스타일</span>
                                <span className={styles.detailValue}>{product.details.style}</span>
                            </div>
                            <div className={styles.detailItem}>
                                <span className={styles.detailLabel}>포인트</span>
                                <span className={styles.detailValue}>{product.details.point}</span>
                            </div>
                        </div>
                    )}
                </div>
                <div className={styles.vendor}>
                    <h3>업체 정보</h3>
                    <p><strong>업체명:</strong> {product.vendor_info.name}</p>
                    <p><strong>소재지:</strong> {product.vendor_info.location}</p>
                    <p><strong>연락처:</strong> {product.vendor_info.contact}</p>
                </div>
                <ProductDetailActions location={product.vendor_info.location} productName={product.name} productType={product.type} />
            </div>
        </main>
    );
}
