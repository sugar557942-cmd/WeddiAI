"use client";
import { useAuth } from '../../context/AuthContext';
import { useCandidates } from '../../context/CandidateContext';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function MyPage() {
    const { user, isAuthenticated, logout } = useAuth();
    const { candidates, removeCandidate } = useCandidates();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    if (!user) return null;

    return (
        <main className={styles.main}>
            <div className={styles.profileSection}>
                <h1>마이페이지</h1>
                <div className={styles.profileCard}>
                    <div className={styles.avatar}>
                        {user.name[0]}
                    </div>
                    <div className={styles.info}>
                        <h2>{user.name} 님</h2>
                        <p>{user.username}</p>
                    </div>
                    <button onClick={logout} className={styles.logoutBtn}>로그아웃</button>
                </div>
            </div>

            <div className={styles.candidateSection}>
                <h2>나의 후보군 (Saved Simulations)</h2>
                {candidates.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>아직 저장된 시뮬레이션이 없습니다.</p>
                        <p>드레스를 시뮬레이션하고 후보군에 담아보세요!</p>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {candidates.map(item => (
                            <div key={item.id} className={styles.card}>
                                <div className={styles.imageWrapper}>
                                    <img src={item.simulationImage} alt="Simulation Result" />
                                </div>
                                <div className={styles.cardContent}>
                                    <h3>{item.productName}</h3>
                                    <p className={styles.vendor}>{item.vendorName}</p>
                                    <p className={styles.contact}>📞 {item.contact}</p>
                                    <p className={styles.date}>{new Date(item.timestamp).toLocaleDateString()}</p>
                                    <button onClick={() => removeCandidate(item.id)} className={styles.removeBtn}>삭제</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
