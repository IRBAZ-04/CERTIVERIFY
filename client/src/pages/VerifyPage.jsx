import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, CheckCircle2, XCircle, User, Award, Loader2, Shield, Download, ShieldCheck } from 'lucide-react';
import API from '../services/api';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const VerifyPage = () => {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const certIdQuery = searchParams.get('id');
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');

    const [certId, setCertId] = useState(certIdQuery || '');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    useEffect(() => {
        if (certIdQuery && userInfo?.token) handleSearch(null, certIdQuery);
    }, [certIdQuery, userInfo?.token]);

    if (!userInfo?.token) {
        return (
            <div className="min-h-[calc(100vh-8rem)] py-12 px-4 flex items-center justify-center bg-[var(--theme-background)]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card className="p-10 text-center max-w-md w-full">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-[var(--theme-accent-primary)] to-[var(--theme-accent-hover)] mx-auto mb-5 flex items-center justify-center shadow-lg">
                            <Shield className="h-8 w-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-[var(--theme-text-primary)] mb-2">Access Restricted</h2>
                        <p className="text-[var(--theme-text-secondary)] mb-8">Please login to verify certificates</p>
                        <Button size="lg" className="w-full" onClick={() => navigate('/login')}>
                            Login to Continue
                        </Button>
                    </Card>
                </motion.div>
            </div>
        );
    }

    const handleSearch = async (e, idToSearch = certId) => {
        if (e) e.preventDefault();
        if (!idToSearch.trim()) return;

        setLoading(true);
        setSearched(true);
        setResult(null);
        setSearchParams({ id: idToSearch });

        try {
            const { data } = await API.get(`/certificates/verify/${idToSearch}`);
            if (data.valid) {
                setResult({ valid: true, cert: data.cert });
            } else {
                setResult({ valid: false, message: t('verify.errors.notFound') });
            }
        } catch (err) {
            setResult({
                valid: false,
                message: err.response?.data?.message || t('verify.errors.notFound')
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-8rem)] py-12 px-4 bg-[var(--theme-background)]">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[var(--theme-accent-soft-bg)] text-[var(--theme-accent-primary)] mb-6 border border-[var(--theme-accent-primary)]/20">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        {t('verify.badge')}
                    </div>
                    <h1 className="text-4xl font-bold text-[var(--theme-text-primary)] mb-4 tracking-tight">
                        {t('verify.title')}
                    </h1>
                    <p className="text-[var(--theme-text-secondary)] max-w-xl mx-auto text-lg">
                        {t('verify.subtitle')}
                    </p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    onSubmit={handleSearch}
                    className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8"
                >
                    <div className="relative flex-1">
                        <Input
                            icon={Search}
                            type="text"
                            placeholder={t('verify.placeholder')}
                            value={certId}
                            onChange={(e) => setCertId(e.target.value)}
                            className="w-full font-mono"
                            autoComplete="off"
                            aria-label={t('verify.results.id')}
                        />
                    </div>

                    <Button
                        type="submit"
                        size="lg"
                        className="shrink-0"
                        loading={loading}
                        disabled={loading || !certId.trim()}
                    >
                        {t('verify.button')}
                    </Button>
                </motion.form>

                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center py-16 gap-4"
                    >
                        <div className="h-14 w-14 rounded-2xl bg-[var(--theme-accent-soft-bg)] flex items-center justify-center">
                            <Loader2 className="h-7 w-7 animate-spin text-[var(--theme-accent-primary)]" />
                        </div>
                        <p className="text-sm text-[var(--theme-text-secondary)]">{t('verify.verifying')}</p>
                    </motion.div>
                )}

                {searched && !loading && result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {result.valid ? (
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 p-5 rounded-xl bg-gradient-to-r from-[var(--theme-success-bg)] to-[var(--theme-accent-soft-bg)] border border-[var(--theme-success-border)]">
                                        <div className="h-12 w-12 rounded-xl bg-[var(--theme-success-text)] flex items-center justify-center shrink-0">
                                            <CheckCircle2 className="h-6 w-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-[var(--theme-success-text)] text-lg">{t('verify.results.valid')}</p>
                                            <p className="text-sm text-[var(--theme-text-secondary)]">{t('verify.results.validDesc')}</p>
                                        </div>
                                        <Button variant="gold" size="sm" onClick={async () => {
                                            const res = await API.get(`/certificates/download/${result.cert.certId}`, { responseType: 'blob' });
                                            const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
                                            const link = document.createElement('a');
                                            link.href = url;
                                            link.setAttribute('download', `${result.cert.certId}.pdf`);
                                            document.body.appendChild(link);
                                            link.click();
                                            link.remove();
                                        }} className="shrink-0">
                                            Download
                                            <Download className="h-4 w-4 ml-2" />
                                        </Button>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="flex items-start gap-4 p-4 rounded-xl bg-[var(--theme-hover-surface)]">
                                            <div className="h-10 w-10 rounded-lg bg-[var(--theme-accent-soft-bg)] flex items-center justify-center shrink-0">
                                                <User className="h-5 w-5 text-[var(--theme-accent-primary)]" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-[var(--theme-text-secondary)] uppercase tracking-wider mb-1">Certificate Holder</p>
                                                <p className="font-semibold text-[var(--theme-text-primary)]">{result.cert.name}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4 p-4 rounded-xl bg-[var(--theme-hover-surface)]">
                                            <div className="h-10 w-10 rounded-lg bg-[var(--theme-accent-soft-bg)] flex items-center justify-center shrink-0">
                                                <Award className="h-5 w-5 text-[var(--theme-accent-primary)]" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-[var(--theme-text-secondary)] uppercase tracking-wider mb-1">Domain</p>
                                                <p className="font-semibold text-[var(--theme-text-primary)]">{result.cert.course}</p>
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-xl bg-[var(--theme-hover-surface)]">
                                            <p className="text-xs text-[var(--theme-text-secondary)] uppercase tracking-wider mb-1">{t('verify.results.id')}</p>
                                            <p className="font-mono text-sm text-[var(--theme-text-primary)]">{result.cert.certId}</p>
                                        </div>

                                        <div className="p-4 rounded-xl bg-[var(--theme-success-bg)]">
                                            <p className="text-xs text-[var(--theme-text-secondary)] uppercase tracking-wider mb-1">Status</p>
                                            <p className="text-sm font-bold text-[var(--theme-success-text)]">VALID</p>
                                        </div>

                                        <div className="p-4 rounded-xl bg-[var(--theme-hover-surface)]">
                                            <p className="text-xs text-[var(--theme-text-secondary)] uppercase tracking-wider mb-1">Course</p>
                                            <p className="text-sm text-[var(--theme-text-primary)]">{result.cert.course}</p>
                                        </div>

                                        <div className="p-4 rounded-xl bg-[var(--theme-hover-surface)]">
                                            <p className="text-xs text-[var(--theme-text-secondary)] uppercase tracking-wider mb-1">Date</p>
                                            <p className="text-sm text-[var(--theme-text-primary)]">{result.cert.date}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card>
                                <CardContent className="pt-10 pb-10 text-center">
                                    <div className={`h-20 w-20 rounded-2xl mx-auto mb-6 flex items-center justify-center ${result.revoked ? 'bg-[var(--theme-warning-bg)]' : 'bg-[var(--theme-error-bg)]'}`}>
                                        <XCircle className={`h-10 w-10 ${result.revoked ? 'text-[var(--theme-warning-text)]' : 'text-[var(--theme-error-text)]'}`} />
                                    </div>
                                    <h3 className={`text-2xl font-bold mb-3 ${result.revoked ? 'text-[var(--theme-warning-text)]' : 'text-[var(--theme-error-text)]'}`}>
                                        {result.revoked ? t('verify.errors.revoked') : 'INVALID CERTIFICATE'}
                                    </h3>
                                    <p className="text-[var(--theme-text-secondary)] text-base max-w-md mx-auto">
                                        {result.message}
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default VerifyPage;
