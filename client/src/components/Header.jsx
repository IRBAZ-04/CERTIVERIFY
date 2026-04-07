import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, LogOut } from 'lucide-react';
import API from '../services/api';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
    const isAdmin = userInfo && userInfo.role === 'admin';

    const onScroll = useCallback(() => setScrolled(window.scrollY > 20), []);
    useEffect(() => {
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [onScroll]);

    const handleLogout = async () => {
        try {
            await API.post('/auth/logout');
        } catch {
            // Ignore and clear local state anyway.
        } finally {
            localStorage.removeItem('userInfo');
            navigate('/login');
        }
    };

    const isActive = (p) => location.pathname === p;

    const headerBg = scrolled
        ? 'bg-[var(--theme-surface)] border-b border-[var(--theme-border)] shadow-sm'
        : 'bg-transparent';

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${headerBg}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
                            <div className="h-8 w-8 rounded-lg bg-[var(--theme-accent-primary)] flex items-center justify-center shadow-[var(--theme-shadow-sm)]">
                                <ShieldCheck className="h-4 w-4 text-[var(--theme-button-primary-text)]" />
                            </div>
                            <span className="font-semibold text-lg text-[var(--theme-text-primary)] hidden sm:block">
                                CertiVerify
                            </span>
                        </Link>

                        <div className="flex items-center gap-3">
                            {userInfo && (
                                <Link
                                    to="/search"
                                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                        isActive('/search') || isActive('/verify')
                                            ? 'bg-[var(--theme-hover-surface)] text-[var(--theme-text-primary)]'
                                            : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)]'
                                    }`}
                                >
                                    Search
                                </Link>
                            )}

                            {!userInfo && (
                                <>
                                    <Link to="/login" className="h-9 px-4 inline-flex items-center text-sm font-medium rounded-xl bg-[var(--theme-button-primary-bg)] text-[var(--theme-button-primary-text)]">
                                        Login
                                    </Link>
                                    <Link to="/register" className="h-9 px-4 inline-flex items-center text-sm font-medium rounded-xl border border-[var(--theme-border)] text-[var(--theme-text-primary)]">
                                        Register
                                    </Link>
                                </>
                            )}

                            {userInfo && isAdmin && (
                                <Link
                                    to="/admin-dashboard"
                                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                        isActive('/admin-dashboard') || isActive('/upload-excel')
                                            ? 'bg-[var(--theme-hover-surface)] text-[var(--theme-text-primary)]'
                                            : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)]'
                                    }`}
                                >
                                    Admin Dashboard
                                </Link>
                            )}

                            {userInfo && userInfo.role === 'user' && (
                                <Link
                                    to="/user-dashboard"
                                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                        isActive('/user-dashboard')
                                            ? 'bg-[var(--theme-hover-surface)] text-[var(--theme-text-primary)]'
                                            : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)]'
                                    }`}
                                >
                                    User Dashboard
                                </Link>
                            )}

                            {userInfo && (
                                <button onClick={handleLogout} className="h-9 px-4 inline-flex items-center text-sm font-medium rounded-xl border border-[var(--theme-error-border)] text-[var(--theme-error-text)]">
                                    <LogOut className="h-4 w-4 mr-2" />
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div className="h-16" />
        </>
    );
};

export default Header;
