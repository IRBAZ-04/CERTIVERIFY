import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import API from '../services/api';
import { useTheme } from '../theme/ThemeProvider';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isDark, toggle } = useTheme();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');
    const [changingPassword, setChangingPassword] = useState(false);
    const profileMenuRef = useRef(null);
    
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
            window.location.href = '/';
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        if (passwordForm.newPassword.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            return;
        }

        setChangingPassword(true);
        try {
            await API.post('/auth/change-password', {
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword,
            });
            setPasswordSuccess('Password changed successfully');
            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setTimeout(() => setShowPasswordModal(false), 2000);
        } catch (err) {
            setPasswordError(err.response?.data?.message || 'Failed to change password');
        } finally {
            setChangingPassword(false);
        }
    };

    // Close profile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
                        <div className="relative" ref={profileMenuRef}>
                            <button 
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg border-[0.5px] border-outline-variant bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors"
                            >
                                <span className="material-symbols-outlined text-[20px]">account_circle</span>
                                <span className="text-sm font-medium hidden sm:inline">{userInfo.name || userInfo.email}</span>
                            </button>

                            {showProfileMenu && (
                                <div className="absolute right-0 mt-2 w-56 bg-surface border-[0.5px] border-outline-variant rounded-lg shadow-lg z-50">
                                    <div className="px-4 py-4 border-b-[0.5px] border-outline-variant">
                                        <p className="text-sm font-bold text-on-surface">{userInfo.name || 'User'}</p>
                                        <p className="text-xs text-on-surface/60 mt-1">{userInfo.email}</p>
                                        <p className="text-xs text-primary mt-2 uppercase font-bold">{userInfo.role}</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setShowPasswordModal(true);
                                            setShowProfileMenu(false);
                                        }}
                                        className="w-full px-4 py-2 text-left text-sm text-on-surface hover:bg-surface-container-low transition-colors flex items-center gap-3 border-b-[0.5px] border-outline-variant"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">lock</span>
                                        Change Password
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-4 py-2 text-left text-sm text-error hover:bg-error/10 transition-colors flex items-center gap-3"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">logout</span>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
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

            {/* Password Change Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
                    <div className="bg-surface border-[0.5px] border-outline-variant rounded-lg p-8 w-full max-w-md shadow-lg">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-[28px] text-primary">lock</span>
                            <h2 className="text-xl font-bold text-on-surface">Change Password</h2>
                        </div>

                        <form onSubmit={handlePasswordChange} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-on-surface mb-2">Current Password</label>
                                <input
                                    required
                                    type="password"
                                    placeholder="Enter current password"
                                    value={passwordForm.currentPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                                    className="w-full px-4 py-2 border-[0.5px] border-outline-variant rounded-lg bg-surface-container-low text-on-surface placeholder-on-surface/50 focus:outline-none focus:border-primary"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-on-surface mb-2">New Password</label>
                                <input
                                    required
                                    type="password"
                                    placeholder="Enter new password"
                                    value={passwordForm.newPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                    className="w-full px-4 py-2 border-[0.5px] border-outline-variant rounded-lg bg-surface-container-low text-on-surface placeholder-on-surface/50 focus:outline-none focus:border-primary"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-on-surface mb-2">Confirm Password</label>
                                <input
                                    required
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={passwordForm.confirmPassword}
                                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                    className="w-full px-4 py-2 border-[0.5px] border-outline-variant rounded-lg bg-surface-container-low text-on-surface placeholder-on-surface/50 focus:outline-none focus:border-primary"
                                />
                            </div>

                            {passwordError && (
                                <div className="p-3 rounded-lg bg-error/10 border-[0.5px] border-error text-error text-sm">
                                    {passwordError}
                                </div>
                            )}

                            {passwordSuccess && (
                                <div className="p-3 rounded-lg bg-primary/10 border-[0.5px] border-primary text-primary text-sm">
                                    {passwordSuccess}
                                </div>
                            )}

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowPasswordModal(false);
                                        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                                        setPasswordError('');
                                        setPasswordSuccess('');
                                    }}
                                    className="flex-1 px-4 py-2 border-[0.5px] border-outline-variant rounded-lg text-on-surface hover:bg-surface-container-low transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={changingPassword}
                                    className="flex-1 px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50"
                                >
                                    {changingPassword ? 'Changing...' : 'Change Password'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
