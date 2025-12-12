"use client";
import { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    username: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    login: (username: string, name: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: () => { },
    logout: () => { },
    isAuthenticated: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Check local storage on mount
        const storedUser = localStorage.getItem('wedding_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (username: string, name: string) => {
        const newUser = { id: 'u_' + Date.now(), username, name };
        setUser(newUser);
        localStorage.setItem('wedding_user', JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('wedding_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
