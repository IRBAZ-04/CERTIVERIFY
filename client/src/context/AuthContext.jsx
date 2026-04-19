import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initialize state from localStorage on load
        const storedUser = localStorage.getItem('userInfo');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (err) {
                console.error('Failed to parse stored user info', err);
                localStorage.removeItem('userInfo');
            }
        }
        setLoading(false);
    }, []);

    const login = (userData) => {
        // userData is { token, user: { id, email, name, role } }
        const { token, user: identity } = userData;
        setUser(identity);
        localStorage.setItem('userInfo', JSON.stringify(identity));
        localStorage.setItem('token', token);
        localStorage.setItem('sessionStart', Date.now().toString());
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
        localStorage.removeItem('token');
        localStorage.removeItem('sessionStart');
    };

    const updateUserInfo = (updatedData) => {
        const newUser = { ...user, ...updatedData };
        setUser(newUser);
        localStorage.setItem('userInfo', JSON.stringify(newUser));
    };

    const value = {
        user,
        loading,
        login,
        logout,
        updateUserInfo,
        isAdmin: user?.role?.toLowerCase() === 'admin' || user?.role?.toUpperCase() === 'SUPER_ADMIN',
        isLoggedIn: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
