import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, CheckCircle2, XCircle, User, Award, Loader2, Shield, Building2, QrCode, Download } from 'lucide-react';
import API from '../services/api';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useTranslation } from 'react-i18next';

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
                 <Card className="p-10 text-center max-w-md w-full shadow-[var(--theme-shadow-md)]">
                     <Shield className="h-14 w-14 text-[var(--theme-accent-primary)] mx-auto mb-5" />
                     <h2 className="text-2xl font-black text-[var(--theme-text-primary)] mb-2">Access Restricted</h2>
                     <p className="text-[var(--theme-text-secondary)] mb-8 font-medium">Please login to verify certificates</p>
                     <Button size="lg" className="w-full text-base" onClick={() => navigate('/login')}>
                         Login to Continue
                     </Button>
                 </Card>
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
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--theme-accent-soft-bg)] text-[var(--theme-accent-primary)] mb-4">
                        <Shield className="h-3.5 w-3.5" />
                        {t('verify.badge')}
                    </div>
                    <h1 className="text-3xl font-bold text-[var(--theme-text-primary)] mb-3">
                        {t('verify.title')}
                    </h1>
                    <p className="text-[var(--theme-text-secondary)] max-w-3xl mx-auto">
                        {t('verify.subtitle')}
                    </p>
                </div>

                <form
                    onSubmit={handleSearch}
                    className="w-full flex flex-col sm:flex-row gap-3 mb-8"
                >
                    <Input
                        icon={Search}
                        type="text"
                        placeholder={t('verify.placeholder')}
                        value={certId}
                        onChange={(e) => setCertId(e.target.value)}
                        className="flex-1 font-mono min-w-0 h-12"
                        autoComplete="off"
                        aria-label={t('verify.results.id')}
                    />

                    <Button
                        type="submit"
                        className="h-12 px-6 shrink-0 rounded-xl"
                        disabled={loading || !certId.trim()}
                    >
                        {loading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            t('verify.button')
                        )}
                    </Button>
                </form>

                {loading && (
                    <div className="flex flex-col items-center py-12 gap-4">
                        <Loader2 className="h-10 w-10 animate-spin text-[var(--theme-accent-primary)]" />
                        <p className="text-sm text-[var(--theme-text-secondary)]">{t('verify.verifying')}</p>
                    </div>
                )}

                {searched && !loading && result && (
                    result.valid ? (
                        <Card>
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-3 mb-6 p-4 rounded-lg bg-[var(--theme-success-bg)] border border-[var(--theme-success-border)]">
                                    <CheckCircle2 className="h-6 w-6 text-[var(--theme-success-text)]" />
                                    <div>
                                        <p className="font-semibold text-[var(--theme-success-text)]">{t('verify.results.valid')}</p>
                                        <p className="text-sm text-[var(--theme-text-secondary)]">{t('verify.results.validDesc')}</p>
                                    </div>
                                    <div className="flex items-center gap-2 ml-auto">
                                        <Button variant="outline" size="sm" onClick={async () => {
                                            const res = await API.get(`/certificates/download/${result.cert.certId}`, { responseType: 'blob' });
                                            const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
                                            const link = document.createElement('a');
                                            link.href = url;
                                            link.setAttribute('download', `${result.cert.certId}.pdf`);
                                            document.body.appendChild(link);
                                            link.click();
                                            link.remove();
                                        }} className="border-transparent flex items-center gap-1.5 hover:bg-[var(--theme-accent-soft-bg)] text-[var(--theme-accent-primary)] hover:border-[var(--theme-accent-primary)]">
                                            <Download className="h-4 w-4" />
                                            <span className="hidden sm:inline">Download Certificate</span>
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-[var(--theme-accent-soft-bg)] flex items-center justify-center shrink-0">
                                            <User className="h-5 w-5 text-[var(--theme-accent-primary)]" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-[var(--theme-text-secondary)] uppercase tracking-wider mb-1">{t('verify.results.holder')}</p>
                                            <p className="font-semibold text-[var(--theme-text-primary)]">{result.cert.name}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="h-10 w-10 rounded-lg bg-[var(--theme-hover-surface)] flex items-center justify-center shrink-0">
                                            <Award className="h-5 w-5 text-[var(--theme-text-secondary)]" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-[var(--theme-text-secondary)] uppercase tracking-wider mb-1">{t('verify.results.domain')}</p>
                                            <p className="font-semibold text-[var(--theme-text-primary)]">{result.cert.course}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <div className="p-3 rounded-lg bg-[var(--theme-hover-surface)]">
                                            <p className="text-xs text-[var(--theme-text-secondary)] mb-1">{t('verify.results.id')}</p>
                                            <p className="font-mono text-sm text-[var(--theme-text-primary)]">{result.cert.certId}</p>
                                        </div>
                                        <div className="p-3 rounded-lg bg-[var(--theme-hover-surface)]">
                                            <p className="text-xs text-[var(--theme-text-secondary)] mb-1">Status</p>
                                            <p className="text-sm font-semibold text-[var(--theme-success-text)]">VALID</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-2">
                                        <div className="p-3 rounded-lg bg-[var(--theme-hover-surface)]">
                                            <p className="text-xs text-[var(--theme-text-secondary)] mb-1">Course</p>
                                            <p className="text-sm text-[var(--theme-text-primary)]">{result.cert.course}</p>
                                        </div>
                                        <div className="p-3 rounded-lg bg-[var(--theme-hover-surface)]">
                                            <p className="text-xs text-[var(--theme-text-secondary)] mb-1">Date</p>
                                            <p className="text-sm text-[var(--theme-text-primary)]">
                                                {result.cert.date}
                                            </p>
                                        </div>
                                    </div>


                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card>
                            <CardContent className="pt-8 pb-8 text-center">
                                <div className={`h-16 w-16 rounded-full mx-auto mb-4 flex items-center justify-center ${result.revoked ? 'bg-[var(--theme-warning-bg)]' : 'bg-[var(--theme-error-bg)]'}`}>
                                    <XCircle className={`h-8 w-8 ${result.revoked ? 'text-[var(--theme-warning-text)]' : 'text-[var(--theme-error-text)]'}`} />
                                </div>
                                <h3 className={`text-xl font-semibold mb-2 ${result.revoked ? 'text-[var(--theme-warning-text)]' : 'text-[var(--theme-error-text)]'}`}>
                                    {result.revoked ? t('verify.errors.revoked') : 'INVALID CERTIFICATE'}
                                </h3>
                                <p className="text-[var(--theme-text-secondary)] text-sm max-w-sm mx-auto">
                                    {result.message}
                                </p>
                            </CardContent>
                        </Card>
                    )
                )}
            </div>
        </div>
    );
};

export default VerifyPage;
