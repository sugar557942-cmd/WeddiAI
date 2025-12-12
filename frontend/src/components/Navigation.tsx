"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import styles from './Navigation.module.css';
import ConsultationModal from './ConsultationModal';

export default function Navigation() {
    const { user, isAuthenticated } = useAuth();
    const { openConsultation } = useModal();
    const pathname = usePathname();

    if (pathname && pathname.startsWith('/wedding-check/report')) {
        return null; // Hide navigation on report page
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <Link href="/">WeddiAI</Link>
                </div>
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}>
                            <Link href="/products?category=dress">웨딩드레스</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/products?category=hanbok">한복</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/filters">스튜디오 필터</Link>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/wedding-check">웨딩체크</Link>
                        </li>
                    </ul>
                </nav>
                <div className={styles.actions}>
                    <button onClick={() => openConsultation('dress')} className={styles.consultBtn}>상담하기</button>
                    {isAuthenticated ? (
                        <>
                            <span className={styles.welcome}>환영합니다, {user?.name}님</span>
                            <Link href="/mypage" className={styles.mypageBtn}>마이페이지</Link>
                        </>
                    ) : (
                        <Link href="/login" className={styles.loginBtn}>로그인/가입</Link>
                    )}
                </div>
            </div>
            <ConsultationModal />
        </header>
    );
}
