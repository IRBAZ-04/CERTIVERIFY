import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import API from '../services/api';
import { useTheme } from '../theme/ThemeProvider';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isDark, toggle } = useTheme();
    
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
    const isAdmin = userInfo && userInfo.role === 'admin';

    const handleLogout = async () => {
        try {
            await API.post('/auth/logout');
        } catch {
            // Ignore errors and clear local state
        } finally {
            localStorage.removeItem('userInfo');
            localStorage.removeItem('sessionStart');
            window.location.href = '/login';
        }
    };

    const isActive = (path) => location.pathname === path;
    const activeClass = "text-on-surface border-b-[0.5px] border-primary pb-1";
    const inactiveClass = "text-on-surface/60 hover:text-primary transition-colors duration-300";

    return (
        <header>
            <nav className="flex justify-between items-center w-full px-8 md:px-12 py-6 max-w-full mx-auto bg-surface">
                <Link to="/" className="text-xl font-bold tracking-tighter text-on-surface font-headline uppercase">
                    CertiVerify
                </Link>
                
                <div className="hidden md:flex items-center gap-10 font-label text-sm uppercase tracking-[0.05em] font-bold">
                    {userInfo ? (
                        <Link to="/verify" className={isActive('/verify') || isActive('/search') ? activeClass : inactiveClass}>
                            Verify
                        </Link>
                    ) : null}
                    {userInfo && isAdmin && (
                        <Link to="/admin-dashboard" className={isActive('/admin-dashboard') || isActive('/upload-excel') ? activeClass : inactiveClass}>
                            Dashboard
                        </Link>
                    )}
                </div>

                <div className="flex items-center gap-6">
                    <button 
                        onClick={toggle} 
                        className="text-on-surface hover:text-primary transition-colors flex items-center justify-center w-8 h-8 rounded-none border-[0.5px] border-outline-variant bg-surface-container-low"
                    >
                        <span className="material-symbols-outlined text-[16px]">
                            {isDark ? 'light_mode' : 'dark_mode'}
                        </span>
                    </button>
                    {userInfo ? (
                        <button 
                            onClick={handleLogout}
                            className="text-primary font-label text-[11px] font-bold uppercase tracking-[0.05em] hover:underline decoration-[0.5px] underline-offset-4"
                        >
                            Logout
                        </button>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="text-primary font-label text-[11px] font-bold uppercase tracking-[0.05em] hover:underline decoration-[0.5px] underline-offset-4">
                                Login
                            </Link>
                            <Link to="/register" className="text-primary font-label text-[11px] font-bold uppercase tracking-[0.05em] hover:underline decoration-[0.5px] underline-offset-4">
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
            <div className="bg-surface-container-high h-[0.5px] w-full"></div>
        </header>
    );
};

export default Header;
