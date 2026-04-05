import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
    ShieldCheck, LogOut, Menu, X, Search,
    ScanLine, UserSquare2, LayoutDashboard,
    Languages, Sun, Moon
} from 'lucide-react';
import { Dropdown } from 'flowbite-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/useTheme';
import ThemeToggle from './ThemeToggle';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const { isDark, toggle: toggleTheme } = useTheme();

    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
    const currentLang = i18n.language;

    useEffect(() => { setMobileOpen(false); }, [location.pathname]);

    const onScroll = useCallback(() => setScrolled(window.scrollY > 20), []);
    useEffect(() => {
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [onScroll]);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    const toggleLang = () => {
        const next = currentLang === 'en' ? 'hi' : 'en';
        i18n.changeLanguage(next);
        localStorage.setItem('certiverify-lang', next);
    };

    const isActive = (p) => location.pathname === p;

    const navLinks = [
        { to: '/verify',     label: t('nav.verify'),    icon: Search },
        { to: '/fraud-scan', label: t('nav.aiScan'),   icon: ScanLine },
        { to: '/portfolio',  label: t('nav.portfolio'), icon: UserSquare2 },
        ...(userInfo ? [{ to: '/dashboard', label: t('nav.dashboard'), icon: LayoutDashboard }] : []),
    ];

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

                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map(({ to, label }) => (
                                <Link key={to} to={to}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                        isActive(to)
                                            ? 'bg-[var(--theme-hover-surface)] text-[var(--theme-text-primary)]'
                                            : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-hover-surface)]'
                                    }`}>
                                    {label}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center gap-2">
                            <ThemeToggle />

                            <button onClick={toggleLang}
                                className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-hover-surface)] transition-colors">
                                <Languages className="h-[18px] w-[18px]" />
                            </button>

                            {userInfo ? (
                                <Dropdown
                                    inline
                                    label={
                                        <div className="h-9 px-3 flex items-center gap-2 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] text-sm text-[var(--theme-text-primary)] hover:border-[var(--theme-accent-primary)] transition-colors">
                                            <UserSquare2 className="h-4 w-4 text-[var(--theme-text-secondary)]" />
                                            <span className="hidden sm:inline">{userInfo.name}</span>
                                        </div>
                                    }
                                >
                                    <Dropdown.Header>
                                        <span className="block text-sm font-semibold text-[var(--theme-text-primary)]">{userInfo.name}</span>
                                        <span className="block truncate text-xs text-[var(--theme-text-muted)]">{userInfo.email || 'admin@certi.io'}</span>
                                    </Dropdown.Header>
                                    <Dropdown.Item onClick={() => navigate('/dashboard')}>{t('nav.dashboard')}</Dropdown.Item>
                                    <Dropdown.Item onClick={() => navigate('/verify')}>{t('nav.verify')}</Dropdown.Item>
                                    <Dropdown.Item onClick={() => navigate('/fraud-scan')}>{t('nav.aiScan')}</Dropdown.Item>
                                    <Dropdown.Item onClick={handleLogout} className="text-[var(--theme-error-text)]">{t('nav.logout')}</Dropdown.Item>
                                </Dropdown>
                            ) : (
                                <Link to="/login"
                                    className="h-9 px-4 inline-flex items-center text-sm font-medium rounded-xl bg-[var(--theme-button-primary-bg)] text-[var(--theme-button-primary-text)] hover:bg-[var(--theme-button-primary-hover)] transition-colors shadow-[var(--theme-shadow-sm)] login-button">
                                    {t('nav.signIn')}
                                </Link>
                            )}

                            <button onClick={() => setMobileOpen(p => !p)}
                                className="md:hidden h-9 w-9 flex items-center justify-center rounded-lg text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-hover-surface)] transition-colors">
                                <AnimatePresence mode="wait" initial={false}>
                                    {mobileOpen
                                        ? <motion.span key="x" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><X className="h-5 w-5" /></motion.span>
                                        : <motion.span key="m" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><Menu className="h-5 w-5" /></motion.span>
                                    }
                                </AnimatePresence>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="fixed inset-x-3 top-[68px] z-40 bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg p-3 shadow-lg"
                    >
                        <nav className="flex flex-col gap-1">
                            {navLinks.map(({ to, label, icon: Icon }, i) => (
                                <motion.div
                                    key={to}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                >
                                    <Link to={to}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                            isActive(to)
                                                ? 'bg-[var(--theme-hover-surface)] text-[var(--theme-text-primary)]'
                                                : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-hover-surface)]'
                                        }`}>
                                        <Icon className="h-4 w-4" />
                                        {label}
                                    </Link>
                                </motion.div>
                            ))}

                            <div className="mt-2 pt-2 border-t border-[var(--theme-border)] flex flex-col gap-1 px-2">
                                <button onClick={toggleTheme}
                                    className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] rounded-lg hover:bg-[var(--theme-hover-surface)] transition-colors">
                                    {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                                    {isDark ? t('nav.lightMode') : t('nav.darkMode')}
                                </button>
                                <button onClick={toggleLang}
                                    className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] rounded-lg hover:bg-[var(--theme-hover-surface)] transition-colors">
                                    <Languages className="h-4 w-4" />
                                    {currentLang === 'en' ? 'हिंदी' : 'English'}
                                </button>
                                {userInfo
                                    ? <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--theme-error-text)] rounded-lg hover:bg-[var(--theme-error-bg)] transition-colors"><LogOut className="h-4 w-4" /> {t('nav.logout')}</button>
                                    : <Link to="/login" className="text-sm font-medium px-4 py-2.5 rounded-xl bg-[var(--theme-accent-primary)] text-[var(--theme-button-primary-text)] hover:bg-[var(--theme-accent-hover)] text-center mt-2 transition-colors">{t('nav.signIn')}</Link>
                                }
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="h-16" />
        </>
    );
};

export default Header;
