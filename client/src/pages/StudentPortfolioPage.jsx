import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserSquare2, Search, Award, Calendar, Building2, QrCode, Share2, CheckCircle2, Loader2, Copy, Check } from 'lucide-react';
import API from '../services/api';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useTranslation } from 'react-i18next';

const StudentPortfolioPage = () => {
    const { t } = useTranslation();
    const { name: paramName } = useParams();
    const navigate = useNavigate();
    const [searchName, setSearchName] = useState(paramName || '');
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [copiedId, setCopiedId] = useState(null);

    useEffect(() => {
        if (paramName) fetchPortfolio(paramName);
    }, [paramName]);

    const fetchPortfolio = async (name) => {
        if (!name.trim()) return;
        setLoading(true);
        setSearched(true);
        try {
            const { data } = await API.get(`/certificates/student/${encodeURIComponent(name)}`);
            setCertificates(data);
        } catch {
            setCertificates([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/portfolio/${encodeURIComponent(searchName.trim())}`);
        fetchPortfolio(searchName);
    };

    const copyLink = (certId) => {
        const url = `${window.location.origin}/verify?id=${certId}`;
        navigator.clipboard.writeText(url);
        setCopiedId(certId);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="min-h-[calc(100vh-8rem)] py-12 px-4 bg-[var(--theme-background)]">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--theme-success-bg)] text-[var(--theme-success-text)] mb-4">
                        <UserSquare2 className="h-3.5 w-3.5" />
                        {t('portfolio.badge')}
                    </div>
                    <h1 className="text-3xl font-bold text-[var(--theme-text-primary)] mb-3">
                        {t('portfolio.title')}
                    </h1>
                    <p className="text-[var(--theme-text-secondary)] max-w-md mx-auto">
                        {t('portfolio.subtitle')}
                    </p>
                </div>

                <form onSubmit={handleSearch} className="flex gap-3 mb-10">
                    <Input
                        icon={Search}
                        type="text"
                        placeholder={t('portfolio.placeholder')}
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        className="flex-1"
                    />
                    <Button type="submit" disabled={!searchName.trim() || loading}>
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : t('portfolio.button')}
                    </Button>
                </form>

                {loading && (
                    <div className="flex flex-col items-center py-12 gap-4">
                        <Loader2 className="h-8 w-8 animate-spin text-[var(--theme-accent-primary)]" />
                        <p className="text-sm text-[var(--theme-text-secondary)]">{t('portfolio.searching')}</p>
                    </div>
                )}

                {searched && !loading && certificates.length === 0 && (
                    <div className="text-center py-12">
                        <UserSquare2 className="h-12 w-12 text-[var(--theme-text-muted)] mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-[var(--theme-text-primary)] mb-2">{t('portfolio.empty')}</h3>
                        <p className="text-sm text-[var(--theme-text-secondary)]">{t('portfolio.emptyDesc')}</p>
                    </div>
                )}

                {!loading && certificates.length > 0 && (
                    <div>
                        <div className="flex items-center gap-4 mb-6 p-4 rounded-lg bg-[var(--theme-surface)] border border-[var(--theme-border)]">
                            <div className="h-12 w-12 rounded-lg bg-[var(--theme-accent-primary)] flex items-center justify-center text-lg font-bold text-[var(--theme-button-primary-text)]">
                                {certificates[0]?.studentName?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-[var(--theme-text-primary)]">{certificates[0]?.studentName}</h2>
                                <p className="text-sm text-[var(--theme-text-secondary)]">
                                    <span className="text-[var(--theme-accent-primary)] font-medium">{certificates.length}</span> {certificates.length === 1 ? t('portfolio.results.countOne') : t('portfolio.results.countMany')}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {certificates.map((cert) => (
                                <Card key={cert._id}>
                                    <CardContent className="pt-5">
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            {cert.qrCodeData && (
                                                <div className="shrink-0 text-center">
                                                    <img src={cert.qrCodeData} alt="QR" className="h-16 w-16 rounded-lg border border-[var(--theme-border)]" />
                                                    <p className="text-xs text-[var(--theme-text-muted)] mt-1 flex items-center justify-center gap-1">
                                                        <QrCode className="h-3 w-3" /> Scan
                                                    </p>
                                                </div>
                                            )}

                                            <div className="flex-1">
                                                <div className="flex items-start justify-between gap-2 mb-3">
                                                    <div>
                                                        <p className="text-xs text-[var(--theme-text-secondary)] uppercase tracking-wider mb-1">{t('portfolio.results.achievement')}</p>
                                                        <h3 className="font-semibold text-[var(--theme-text-primary)]">{cert.domain}</h3>
                                                    </div>
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-[var(--theme-success-bg)] text-[var(--theme-success-text)]">
                                                        <CheckCircle2 className="h-3 w-3" />
                                                        {t('portfolio.results.valid')}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                                                    <div className="flex items-center gap-1.5 text-[var(--theme-text-secondary)]">
                                                        <Calendar className="h-3.5 w-3.5" />
                                                        {new Date(cert.startDate).toLocaleDateString()} - {new Date(cert.endDate).toLocaleDateString()}
                                                    </div>
                                                    {cert.organizationId?.name && (
                                                        <div className="flex items-center gap-1.5 text-[var(--theme-text-secondary)]">
                                                            <Building2 className="h-3.5 w-3.5" />
                                                            {cert.organizationId.name}
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-1.5 text-[var(--theme-text-secondary)] font-mono">
                                                        <Award className="h-3.5 w-3.5" />
                                                        {cert.certificateId}
                                                    </div>
                                                </div>

                                                <div className="flex gap-2">
                                                    <Button variant="outline" size="sm" onClick={() => copyLink(cert.certificateId)}>
                                                        {copiedId === cert.certificateId ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                                                        {copiedId === cert.certificateId ? t('portfolio.results.copied') : t('portfolio.results.copy')}
                                                    </Button>
                                                    <Button variant="ghost" size="sm" onClick={() => window.open(`/verify?id=${cert.certificateId}`, '_blank')}>
                                                        <Share2 className="h-3.5 w-3.5" />
                                                        {t('portfolio.results.verify')}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentPortfolioPage;
