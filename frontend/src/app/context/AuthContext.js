
// src/app/context/AuthContext.js
// src/app/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { logoutUser } from '../utils/api';

// If using App Router (Next.js 13+)
import { useRouter } from 'next/navigation'; 
// If using Pages Router
// import { useRouter } from 'next/router';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            const token = Cookies.get('accessToken');
            if (token) {
                setUser({ isAuthenticated: true });
            }
        }
    }, [isMounted]);

    const logout = () => {
        logoutUser();
        setUser(null);
        if (typeof window !== 'undefined') {
            router.push('/login');
        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};