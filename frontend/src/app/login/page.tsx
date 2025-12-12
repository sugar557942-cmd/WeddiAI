"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import styles from './page.module.css';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock Login: In real app, verify password here.
        if (username) {
            login(username, username); // Using username as name for simplicity
            router.push('/');
        }
    };

    return (
        <main className={styles.container}>
            <div className={styles.card}>
                <h1>로그인</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="text"
                        placeholder="아이디"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={styles.input}
                        required
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        required
                    />
                    <button type="submit" className={styles.button}>로그인</button>
                </form>
                <div className={styles.links}>
                    <a href="/signup">회원가입</a>
                </div>
            </div>
        </main>
    );
}
