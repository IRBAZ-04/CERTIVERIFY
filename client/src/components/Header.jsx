import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, LogOut } from 'lucide-react';
import API from '../services/api';
import { Button } from './ui/Button';
import ThemeToggle from './ThemeToggle';

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
        ? 'bg-[var(--theme-surface)]/95 backdrop-blur-md border-b border-[var(--theme-border)] shadow-sm'
        : 'bg-transparent';

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        <Link to="/" className="flex items-center gap-3 group shrink-0">
                            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[var(--theme-accent-primary)] to-[var(--theme-accent-hover)] flex items-center justify-center shadow-md">
                                <ShieldCheck className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-semibold text-lg text-[var(--theme-text-primary)] tracking-tight hidden sm:block">
                                CertiVerify
                            </span>
                        </Link>

                        <div className="flex items-center gap-2">
                            <ThemeToggle />

                            {userInfo && (
                                <>
                                    <Link
                                        to="/search"
                                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                            isActive('/search') || isActive('/verify')
                                                ? 'bg-[var(--theme-accent-primary)] text-white'
                                                : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-hover-surface)]'
                                        }`}
                                    >
                                        Verify
                                    </Link>
                                </>
                            )}

                            {!userInfo && (
                                <>
                                    <Link to="/login">
                                        <Button variant="ghost" size="sm">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to="/register">
                                        <Button size="sm">
                                            Register
                                        </Button>
                                    </Link>
                                </>
                            )}

                            {userInfo && isAdmin && (
                                <Link
                                    to="/admin-dashboard"
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                        isActive('/admin-dashboard') || isActive('/upload-excel')
                                            ? 'bg-[var(--theme-accent-primary)] text-white'
                                            : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-hover-surface)]'
                                    }`}
                                >
                                    Dashboard
                                </Link>
                            )}

                            {userInfo && (
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={handleLogout}
                                    className="border-[var(--theme-error-border)] text-[var(--theme-error-text)] hover:bg-[var(--theme-error-bg)]"
                                >
                                    <LogOut className="h-4 w-4 mr-1.5" />
                                    <span className="hidden sm:inline">Logout</span>
                                </Button>
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
