import { useState } from 'react';
import { ScanLine, Upload, CheckCircle2, AlertTriangle, Loader2, Shield, FileImage, X, Eye, EyeOff } from 'lucide-react';
import API from '../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useTranslation } from 'react-i18next';

const FraudScanPage = () => {
    const { t } = useTranslation();
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [certId, setCertId] = useState('');
    const [scanning, setScanning] = useState(false);
    const [result, setResult] = useState(null);
    const [showFullText, setShowFullText] = useState(false);
    const [dragging, setDragging] = useState(false);

    const handleFileSelect = (file) => {
        if (file && file.type.startsWith('image/')) {
            setImage(file);
            setResult(null);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];
        handleFileSelect(file);
    };

    const handleScan = async (e) => {
        e.preventDefault();
        if (!image || !certId.trim()) return;

        setScanning(true);
        setResult(null);

        const formData = new FormData();
        formData.append('image', image);
        formData.append('certificateId', certId);

        try {
            const { data } = await API.post('/certificates/ocr', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResult({ authentic: true, ...data });
        } catch (err) {
            setResult({
                authentic: false,
                ...(err.response?.data || { message: 'Scan failed. Please try again.' })
            });
        } finally {
            setScanning(false);
        }
    };

    const clearImage = () => {
        setImage(null);
        setImagePreview(null);
        setResult(null);
    };

    const CheckItem = ({ label, passed }) => (
        <div className={`flex items-center gap-3 p-3 rounded-lg border ${passed ? 'bg-[var(--theme-success-bg)] border-[var(--theme-success-border)]' : 'bg-[var(--theme-error-bg)] border-[var(--theme-error-border)]'}`}>
            {passed ? <CheckCircle2 className="h-4 w-4 text-[var(--theme-success-text)]" /> : <X className="h-4 w-4 text-[var(--theme-error-text)]" />}
            <span className={`text-sm font-medium ${passed ? 'text-[var(--theme-success-text)]' : 'text-[var(--theme-error-text)]'}`}>{label}</span>
            <span className={`ml-auto text-xs font-medium ${passed ? 'text-[var(--theme-success-text)]' : 'text-[var(--theme-error-text)]'}`}>{passed ? 'PASS' : 'FAIL'}</span>
        </div>
    );

    return (
        <div className="min-h-[calc(100vh-8rem)] py-12 px-4 bg-[var(--theme-background)]">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--theme-accent-soft-bg)] text-[var(--theme-accent-primary)] mb-4">
                        <ScanLine className="h-3.5 w-3.5" />
                        {t('fraud.badge')}
                    </div>
                    <h1 className="text-3xl font-bold text-[var(--theme-text-primary)] mb-3">
                        {t('fraud.title')}
                    </h1>
                    <p className="text-[var(--theme-text-secondary)] max-w-xl mx-auto">
                        {t('fraud.subtitle')}
                    </p>
                </div>

                <form onSubmit={handleScan}>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileImage className="h-5 w-5 text-[var(--theme-accent-primary)]" />
                                    {t('fraud.upload.title')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {imagePreview ? (
                                    <div className="relative">
                                        <img src={imagePreview} alt="Certificate" className="w-full rounded-lg object-cover max-h-48 border border-[var(--theme-border)]" />
                                        <button type="button" onClick={clearImage}
                                            className="absolute top-2 right-2 p-1.5 rounded-md bg-[var(--theme-error-bg)] text-[var(--theme-error-text)] hover:bg-[var(--theme-error-border)] transition-colors">
                                            <X className="h-4 w-4" />
                                        </button>
                                        <p className="text-xs text-[var(--theme-text-muted)] mt-2">{image?.name}</p>
                                    </div>
                                ) : (
                                    <div
                                        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                                        onDragLeave={() => setDragging(false)}
                                        onDrop={handleDrop}
                                        className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                                            dragging ? 'border-[var(--theme-accent-primary)] bg-[var(--theme-accent-soft-bg)]' : 'border-[var(--theme-border)] hover:border-[var(--theme-text-muted)]'
                                        }`}
                                    >
                                        <input type="file" accept="image/*" onChange={(e) => handleFileSelect(e.target.files[0])}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" aria-label="Upload certificate image" />
                                        <Upload className="h-8 w-8 text-[var(--theme-text-secondary)] mx-auto mb-2" />
                                        <p className="text-sm text-[var(--theme-text-secondary)]">{t('fraud.upload.drop')}</p>
                                        <p className="text-xs text-[var(--theme-text-muted)] mt-1">PNG, JPG, WEBP</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card className="h-full">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-[var(--theme-text-secondary)]" />
                                    {t('fraud.config.title')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-[var(--theme-text-secondary)] mb-1.5">{t('fraud.config.certId')}</label>
                                    <Input
                                        required
                                        placeholder="CERT-2026-001"
                                        value={certId}
                                        onChange={(e) => setCertId(e.target.value)}
                                        className="font-mono"
                                    />
                                    <p className="text-xs text-[var(--theme-text-muted)] mt-1">{t('fraud.config.idDesc')}</p>
                                </div>

                                <div className="p-3 rounded-lg bg-[var(--theme-hover-surface)]">
                                    <p className="text-xs text-[var(--theme-text-secondary)] mb-2">{t('fraud.config.checks')}</p>
                                    {[
                                        t('fraud.config.checkItems.name'),
                                        t('fraud.config.checkItems.domain'),
                                        t('fraud.config.checkItems.id'),
                                        t('fraud.config.checkItems.confidence')
                                    ].map(f => (
                                        <div key={f} className="flex items-center gap-2 text-xs text-[var(--theme-text-secondary)]">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--theme-success-text)]" />
                                            {f}
                                        </div>
                                    ))}
                                </div>

                                <Button type="submit" className="w-full" disabled={!image || !certId.trim() || scanning}>
                                    {scanning ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> {t('fraud.config.scanning')}</> : <><ScanLine className="h-4 w-4 mr-2" /> {t('fraud.config.button')}</>}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </form>

                {result && !scanning && (
                    <Card className={result.authentic ? 'border-[var(--theme-success-border)]' : 'border-[var(--theme-error-border)]'}>
                        <div className={`h-1 rounded-t-lg ${result.authentic ? 'bg-[var(--theme-success-text)]' : 'bg-[var(--theme-error-text)]'}`} />
                        <CardHeader className={result.authentic ? 'bg-[var(--theme-success-bg)]' : 'bg-[var(--theme-error-bg)]'}>
                            <div className="flex items-center gap-3">
                                {result.authentic ? <CheckCircle2 className="h-6 w-6 text-[var(--theme-success-text)]" /> : <AlertTriangle className="h-6 w-6 text-[var(--theme-error-text)]" />}
                                <div>
                                    <CardTitle className={result.authentic ? 'text-[var(--theme-success-text)]' : 'text-[var(--theme-error-text)]'}>
                                        {result.authentic ? t('fraud.results.authentic') : t('fraud.results.alert')}
                                    </CardTitle>
                                    <p className="text-sm text-[var(--theme-text-secondary)] mt-0.5">{result.message}</p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4 space-y-4">
                            {result.checks && (
                                <div className="space-y-2">
                                    <p className="text-xs font-medium text-[var(--theme-text-secondary)] uppercase tracking-wider">{t('fraud.results.checks')}</p>
                                    <CheckItem label={t('fraud.results.nameMatch')} passed={result.checks.isNameMatches} />
                                    <CheckItem label={t('fraud.results.domainMatch')} passed={result.checks.isDomainMatches} />
                                    <CheckItem label={t('fraud.results.idMatch')} passed={result.checks.isIdMatches} />
                                </div>
                            )}

                            {result.textExtracted && (
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => setShowFullText(!showFullText)}
                                        className="flex items-center gap-2 text-sm text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-colors mb-2"
                                    >
                                        {showFullText ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        {showFullText ? t('fraud.results.hideOcr') : t('fraud.results.showOcr')}
                                    </button>
                                    {showFullText && (
                                        <div className="p-3 rounded-lg bg-[var(--theme-hover-surface)] font-mono text-xs text-[var(--theme-text-secondary)] whitespace-pre-wrap max-h-32 overflow-y-auto">
                                            {result.textExtracted}
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default FraudScanPage;
