import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ShieldAlert, Sparkles } from 'lucide-react';
import API from '../services/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
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
            localStorage.setItem('userInfo', JSON.stringify(data));
            if (data.role === 'user') {
                navigate('/user-dashboard');
            } else {
                navigate('/admin-dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.message || t('login.authFail'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 bg-[var(--theme-background)]">
            <div className="w-full max-w-sm">
                <Card>
                    <CardHeader className="text-center pb-6">
                        <div className="h-12 w-12 rounded-xl bg-[var(--theme-accent-primary)] mx-auto mb-4 flex items-center justify-center shadow-[var(--theme-shadow-sm)]">
                            <Sparkles className="h-6 w-6 text-[var(--theme-button-primary-text)]" />
                        </div>
                        <CardTitle className="text-xl">
                            {t('login.welcome')}
                        </CardTitle>
                        <CardDescription>
                            {t('login.welcomeSub')}
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        {error && (
                            <div className="bg-[var(--theme-error-bg)] border border-[var(--theme-error-border)] text-[var(--theme-error-text)] text-sm p-3 rounded-lg mb-4 flex items-center gap-2">
                                <ShieldAlert className="h-4 w-4 shrink-0" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-[var(--theme-text-secondary)] mb-1.5">{t('login.email')}</label>
                                <Input
                                    type="email"
                                    required
                                    icon={Mail}
                                    placeholder={t('login.emailPlaceholder')}
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-[var(--theme-text-secondary)] mb-1.5">{t('login.password')}</label>
                                <Input
                                    type="password"
                                    required
                                    icon={Lock}
                                    placeholder={t('login.passPlaceholder')}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full"
                                loading={loading}
                            >
                                Login
                            </Button>
                        </form>
                    </CardContent>

                    <CardFooter className="justify-center">
                        <p className="text-sm text-[var(--theme-text-secondary)]">
                            No account?
                            <Link to="/register" className="text-[var(--theme-accent-primary)] ml-1">Register</Link>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;
