import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ShieldAlert, ShieldCheck, Eye, EyeOff, User, Crown } from 'lucide-react';
import API from '../services/api';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const LoginPage = () => {
    const { t } = useTranslation();
    const [loginType, setLoginType] = useState('user');
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { data } = await API.post('/auth/login', {
                email: formData.email,
                password: formData.password
            });
            
            if (loginType === 'admin' && data.role !== 'admin') {
                setError('Access denied. This account does not have admin privileges.');
                localStorage.removeItem('userInfo');
                localStorage.removeItem('sessionStart');
                setLoading(false);
                return;
            }
            
            if (loginType === 'user' && data.role === 'admin') {
                navigate('/');
                return;
            }
            
            localStorage.setItem('userInfo', JSON.stringify(data));
            localStorage.setItem('sessionStart', Date.now().toString());
            
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || t('login.authFail'));
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setError('');
    };

    return (
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 bg-[var(--theme-background)]">
            <div className="w-full max-w-4xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left Side - Branding */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="hidden lg:flex flex-col justify-center pr-12"
                    >
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[var(--theme-accent-soft-bg)] text-[var(--theme-accent-primary)] mb-6 w-fit"
                        >
                            <ShieldCheck className="h-3.5 w-3.5" />
                            Secure Verification
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl font-bold text-[var(--theme-text-primary)] tracking-tight mb-4"
                        >
                            Welcome Back
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg text-[var(--theme-text-secondary)] leading-relaxed"
                        >
                            Sign in to access your certificate verification dashboard and manage your organization&apos;s credentials.
                        </motion.p>
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-10 space-y-4"
                        >
                            <div className="flex items-center gap-3 text-sm text-[var(--theme-text-secondary)]">
                                <div className="h-8 w-8 rounded-lg bg-[var(--theme-accent-soft-bg)] flex items-center justify-center">
                                    <ShieldCheck className="h-4 w-4 text-[var(--theme-accent-primary)]" />
                                </div>
                                <span>Industry-standard security</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-[var(--theme-text-secondary)]">
                                <div className="h-8 w-8 rounded-lg bg-[var(--theme-accent-soft-bg)] flex items-center justify-center">
                                    <Lock className="h-4 w-4 text-[var(--theme-accent-primary)]" />
                                </div>
                                <span>Encrypted data protection</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Login Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <Card className="w-full">
                            <CardContent className="p-8">
                                {/* Mobile Logo */}
                                <div className="lg:hidden text-center mb-6">
                                    <div className="h-12 w-12 rounded-xl bg-[var(--theme-accent-primary)] mx-auto mb-4 flex items-center justify-center shadow-sm">
                                        <ShieldCheck className="h-6 w-6 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-[var(--theme-text-primary)]">
                                        {t('login.welcome')}
                                    </h2>
                                    <p className="text-sm text-[var(--theme-text-secondary)] mt-1">
                                        {t('login.welcomeSub')}
                                    </p>
                                </div>

                                {/* Login Type Tabs */}
                                <div className="flex gap-2 p-1.5 bg-[var(--theme-hover-surface)] rounded-xl mb-6">
                                    <button
                                        type="button"
                                        onClick={() => { setLoginType('user'); setFormData({ email: '', password: '' }); setError(''); }}
                                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                            loginType === 'user'
                                                ? 'bg-[var(--theme-accent-primary)] text-white shadow-md'
                                                : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)]'
                                        }`}
                                    >
                                        <User className="h-4 w-4" />
                                        User Login
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setLoginType('admin'); setFormData({ email: '', password: '' }); setError(''); }}
                                        className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                                            loginType === 'admin'
                                                ? 'bg-[var(--theme-accent-gold)] text-white shadow-md'
                                                : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)]'
                                        }`}
                                    >
                                        <Crown className="h-4 w-4" />
                                        Admin Login
                                    </button>
                                </div>

                                {/* Form Header */}
                                <div className="mb-6">
                                    <h2 className="text-2xl font-bold text-[var(--theme-text-primary)]">
                                        {loginType === 'admin' ? 'Admin Portal' : 'Sign In'}
                                    </h2>
                                    <p className="text-sm text-[var(--theme-text-secondary)] mt-1">
                                        {loginType === 'admin' 
                                            ? 'Access the administrative dashboard'
                                            : 'Enter your credentials to continue'
                                        }
                                    </p>
                                </div>

                                {error && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-[var(--theme-error-bg)] border border-[var(--theme-error-border)] text-[var(--theme-error-text)] text-sm p-4 rounded-xl mb-6 flex items-center gap-3"
                                    >
                                        <ShieldAlert className="h-5 w-5 shrink-0" />
                                        {error}
                                    </motion.div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--theme-text-primary)] mb-2">
                                            {t('login.email')}
                                        </label>
                                        <Input
                                            type="email"
                                            required
                                            icon={Mail}
                                            placeholder={t('login.emailPlaceholder')}
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-[var(--theme-text-primary)] mb-2">
                                            {t('login.password')}
                                        </label>
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            icon={Lock}
                                            rightIcon={showPassword ? EyeOff : Eye}
                                            rightIconAction={() => setShowPassword(!showPassword)}
                                            placeholder={t('login.passPlaceholder')}
                                            value={formData.password}
                                            onChange={(e) => handleInputChange('password', e.target.value)}
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        className={`w-full ${loginType === 'admin' ? 'bg-[var(--theme-accent-gold)] hover:bg-[var(--theme-accent-gold)]/90' : ''}`}
                                        size="lg"
                                        loading={loading}
                                    >
                                        {loginType === 'admin' ? 'Access Admin Panel' : 'Sign In'}
                                    </Button>
                                </form>

                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    className="mt-6 text-center"
                                >
                                    <p className="text-sm text-[var(--theme-text-secondary)]">
                                        Don&apos;t have an account?{' '}
                                        <Link to="/register" className="text-[var(--theme-accent-primary)] font-medium hover:underline">
                                            Create one
                                        </Link>
                                    </p>
                                </motion.div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
