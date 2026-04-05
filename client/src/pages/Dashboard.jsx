import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Download, Trash2, FileSpreadsheet, Loader2, AlertCircle, Plus, LayoutDashboard, Activity, FileText, Database, ShieldAlert } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import API from '../services/api';
import Sidebar from '../components/ui/Sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
    const { t } = useTranslation();
    const [certificates, setCertificates] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [singleData, setSingleData] = useState({ certificateId: '', studentName: '', domain: '', startDate: '', endDate: '' });
    const [creating, setCreating] = useState(false);

    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

    useEffect(() => {
        if (!userInfo.token) {
            navigate('/login');
        } else {
            fetchData();
        }
    }, [navigate]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [certRes, analyticsRes] = await Promise.all([
                API.get('/certificates'),
                API.get('/certificates/analytics')
            ]);
            setCertificates(certRes.data);
            setAnalytics(analyticsRes.data);
        } catch (err) {
            if (err.response?.status === 401) {
                localStorage.removeItem('userInfo');
                navigate('/login');
            }
            showMessage('error', t('dashboard.messages.loadFail'));
        } finally {
            setLoading(false);
        }
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        try {
            const { data } = await API.post('/certificates/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            showMessage('success', t('dashboard.messages.success'));
            setFile(null);
            document.getElementById('file-upload').value = '';
            fetchData();
        } catch (err) {
            showMessage('error', t('dashboard.messages.uploadFail'));
        } finally {
            setUploading(false);
        }
    };

    const handleCreateSingle = async (e) => {
        e.preventDefault();
        setCreating(true);
        try {
            await API.post('/certificates', singleData);
            showMessage('success', t('dashboard.messages.success'));
            setIsCreateOpen(false);
            setSingleData({ certificateId: '', studentName: '', domain: '', startDate: '', endDate: '' });
            fetchData();
        } catch (err) {
            showMessage('error', t('dashboard.messages.loadFail'));
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm(t('dashboard.messages.deleted'))) {
            try {
                await API.delete(`/certificates/${id}`);
                showMessage('success', t('dashboard.messages.deleted'));
                fetchData();
            } catch (err) {
                showMessage('error', t('dashboard.messages.deleteFail'));
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/login');
    };

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-[var(--theme-background)]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-[18rem,1fr] gap-8">
                <Sidebar />
                <div className="space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-[var(--theme-border)]">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-[var(--theme-text-primary)]">{t('dashboard.title')}</h1>
                            <p className="mt-1 text-sm text-[var(--theme-text-secondary)]">
                                {userInfo.role === 'SUPER_ADMIN' ? t('dashboard.superAdmin') : t('dashboard.orgDash')}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-[var(--theme-accent-soft-bg)] flex items-center justify-center text-[var(--theme-accent-primary)] font-semibold text-sm">
                                    {userInfo.name?.charAt(0)}
                                </div>
                                <span className="text-sm font-medium text-[var(--theme-text-primary)] hidden sm:block">{userInfo.name}</span>
                            </div>
                            <Button variant="outline" size="sm" onClick={handleLogout}>
                                {t('nav.logout')}
                            </Button>
                        </div>
                    </div>

                    {message.text && (
                        <div className={`p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 ${message.type === 'error'
                            ? 'bg-[var(--theme-error-bg)]/50 border border-[var(--theme-error-border)] text-[var(--theme-error-text)]'
                            : 'bg-[var(--theme-success-bg)]/50 border border-[var(--theme-success-border)] text-[var(--theme-success-text)]'
                            }`}>
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            <span className="text-sm font-medium">{message.text}</span>
                        </div>
                    )}

                    {/* Analytics */}
                    {!loading && analytics && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <Card className="lg:col-span-2">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Activity className="h-5 w-5 text-[var(--theme-accent-primary)]" />
                                        {t('dashboard.analytics.activity')}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="h-72">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={analytics.overview} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <XAxis dataKey="name" stroke="var(--theme-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                                            <YAxis stroke="var(--theme-text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                                            <Tooltip contentStyle={{ backgroundColor: 'var(--theme-surface)', border: '1px solid var(--theme-border)', borderRadius: '12px', boxShadow: 'var(--theme-shadow-md)' }} cursor={{ fill: 'var(--theme-hover-surface)' }} />
                                            <Bar dataKey="issued" fill="var(--theme-accent-primary)" radius={[4, 4, 0, 0]} barSize={32} />
                                            <Bar dataKey="verified" fill="var(--theme-success-text)" radius={[4, 4, 0, 0]} barSize={32} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <div className="flex flex-col gap-6">
                                <Card className="flex-1 flex flex-col justify-center">
                                    <CardContent className="p-6 text-center">
                                        <div className="mx-auto h-12 w-12 rounded-full bg-[var(--theme-accent-soft-bg)] flex items-center justify-center mb-4">
                                            <FileText className="h-6 w-6 text-[var(--theme-accent-primary)]" />
                                        </div>
                                        <p className="text-sm font-medium text-[var(--theme-text-secondary)] uppercase tracking-wider mb-2">{t('dashboard.analytics.total')}</p>
                                        <p className="text-5xl font-bold text-[var(--theme-text-primary)] tracking-tight">{analytics.totalCertificates}</p>
                                    </CardContent>
                                </Card>
                                <Card className="flex-1 flex flex-col justify-center relative overflow-hidden bg-[var(--theme-error-bg)]/20 border-[var(--theme-error-border)]/50">
                                    <CardContent className="p-6 text-center relative z-10">
                                        <div className="mx-auto h-12 w-12 rounded-full bg-[var(--theme-error-bg)] flex items-center justify-center mb-4">
                                            <ShieldAlert className="h-6 w-6 text-[var(--theme-error-text)]" />
                                        </div>
                                        <p className="text-sm font-medium text-[var(--theme-error-text)] uppercase tracking-wider mb-2">{t('dashboard.analytics.fraud')}</p>
                                        <p className="text-5xl font-bold text-[var(--theme-error-text)] tracking-tight">{analytics.fraudAttempts}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card hover>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Database className="h-5 w-5 text-[var(--theme-accent-primary)]" />
                                    {t('dashboard.actions.importTitle')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleUpload} className="space-y-4">
                                    <label htmlFor="file-upload" className="relative group block border-2 border-dashed border-[var(--theme-border)] rounded-xl p-8 flex flex-col items-center justify-center bg-[var(--theme-surface)] hover:bg-[var(--theme-hover-surface)] hover:border-[var(--theme-accent-primary)] transition-all cursor-pointer">
                                        <FileSpreadsheet className="h-10 w-10 text-[var(--theme-text-muted)] group-hover:text-[var(--theme-accent-primary)] transition-colors mb-3" />
                                        <p className="text-sm font-medium text-[var(--theme-text-primary)] mb-1">{t('dashboard.actions.dropText')}</p>
                                        <p className="text-xs text-[var(--theme-text-secondary)]">{t('dashboard.actions.formats')}</p>
                                        <input
                                            id="file-upload"
                                            type="file"
                                            accept=".xlsx, .xls"
                                            onChange={(e) => setFile(e.target.files[0])}
                                            className="hidden"
                                        />
                                        {file && <div className="absolute inset-x-0 bottom-3 px-4"><p className="text-xs text-[var(--theme-accent-primary)] font-medium truncate text-center px-3 py-1 rounded bg-[var(--theme-accent-soft-bg)]">{file.name}</p></div>}
                                    </label>
                                    <Button type="submit" className="w-full" size="lg" disabled={!file || uploading}>
                                        {uploading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Upload className="h-5 w-5 mr-2" />}
                                        {t('dashboard.actions.process')}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>

                        <Card hover className="flex flex-col">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-[var(--theme-text-primary)]" />
                                    {t('dashboard.actions.issuanceTitle')}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col justify-center items-center text-center p-8">
                                <div className="h-16 w-16 rounded-full bg-[var(--theme-hover-surface)] flex items-center justify-center mb-6">
                                    <Plus className="h-8 w-8 text-[var(--theme-text-muted)]" />
                                </div>
                                <h3 className="text-lg font-semibold text-[var(--theme-text-primary)] mb-2">{t('dashboard.actions.manualTitle')}</h3>
                                <p className="text-sm text-[var(--theme-text-secondary)] mb-8 max-w-[250px]">{t('dashboard.actions.manualDesc')}</p>
                                <Button size="lg" onClick={() => setIsCreateOpen(true)} className="w-full sm:w-auto">
                                    <Plus className="h-5 w-5 mr-2" />
                                    {t('dashboard.actions.newCert')}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Table */}
                    <Card className="overflow-hidden border-0 shadow-md ring-1 ring-[var(--theme-border)]">
                        <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-b border-[var(--theme-border)] bg-[var(--theme-surface)]/50">
                            <h2 className="text-xl font-semibold text-[var(--theme-text-primary)]">{t('dashboard.table.title')}</h2>
                        </div>
                        <div className="overflow-x-auto">
                            {loading ? (
                                <div className="flex justify-center py-16">
                                    <Loader2 className="h-8 w-8 animate-spin text-[var(--theme-accent-primary)]" />
                                </div>
                            ) : certificates.length === 0 ? (
                                <div className="text-center py-16">
                                    <FileText className="h-12 w-12 text-[var(--theme-text-muted)] mx-auto mb-4" />
                                    <p className="text-[var(--theme-text-primary)] font-medium">{t('dashboard.table.empty')}</p>
                                    <p className="text-sm text-[var(--theme-text-secondary)] mt-1">{t('dashboard.table.emptyDesc')}</p>
                                </div>
                            ) : (
                                <table className="w-full border-collapse text-left">
                                    <thead>
                                        <tr className="bg-[var(--theme-hover-surface)]/50 border-b border-[var(--theme-border)]">
                                            <th className="text-xs font-semibold text-[var(--theme-text-secondary)] uppercase tracking-wider px-6 py-4">{t('dashboard.table.id')}</th>
                                            <th className="text-xs font-semibold text-[var(--theme-text-secondary)] uppercase tracking-wider px-6 py-4">{t('dashboard.table.student')}</th>
                                            <th className="text-xs font-semibold text-[var(--theme-text-secondary)] uppercase tracking-wider px-6 py-4 hidden sm:table-cell">{t('dashboard.table.domain')}</th>
                                            <th className="text-xs font-semibold text-[var(--theme-text-secondary)] uppercase tracking-wider px-6 py-4 hidden md:table-cell">{t('dashboard.table.validity')}</th>
                                            <th className="text-right text-xs font-semibold text-[var(--theme-text-secondary)] uppercase tracking-wider px-6 py-4">{t('dashboard.table.actions')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[var(--theme-border)] bg-[var(--theme-surface)]">
                                        {certificates.map((cert) => (
                                            <tr key={cert._id} className="hover:bg-[var(--theme-hover-surface)] transition-colors group">
                                                <td className="px-6 py-4">
                                                    <span className="font-mono text-sm px-2 py-1 rounded bg-[var(--theme-hover-surface)] text-[var(--theme-text-primary)] group-hover:bg-[var(--theme-surface)] border border-[var(--theme-border)] transition-colors">
                                                        {cert.certificateId}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 font-medium text-[var(--theme-text-primary)]">{cert.studentName}</td>
                                                <td className="px-6 py-4 text-[var(--theme-text-secondary)] hidden sm:table-cell">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--theme-hover-surface)] text-[var(--theme-text-primary)]">
                                                        {cert.domain}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-[var(--theme-text-secondary)] text-sm hidden md:table-cell">
                                                    {new Date(cert.startDate).toLocaleDateString()} - {new Date(cert.endDate).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button variant="outline" size="sm" onClick={() => {
                                                            import('../utils/generatePDF').then(({ generateCertificatePDF }) => generateCertificatePDF(cert));
                                                        }}>
                                                            <Download className="h-4 w-4 shrink-0" />
                                                            <span className="sr-only sm:not-sr-only sm:ml-2">PDF</span>
                                                        </Button>
                                                        <Button variant="outline" size="icon" onClick={() => handleDelete(cert._id)} className="border-transparent hover:border-[var(--theme-error-border)] hover:bg-[var(--theme-error-bg)] hover:text-[var(--theme-error-text)]">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </Card>

                    <Modal isOpen={isCreateOpen} onClose={() => !creating && setIsCreateOpen(false)} title={t('dashboard.modal.title')}>
                        <form onSubmit={handleCreateSingle} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-[var(--theme-text-primary)] mb-1.5">{t('dashboard.modal.certId')}</label>
                                    <Input required placeholder="CERT-2026-001" value={singleData.certificateId} onChange={(e) => setSingleData({ ...singleData, certificateId: e.target.value })} />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-[var(--theme-text-primary)] mb-1.5">{t('dashboard.modal.student')}</label>
                                    <Input required placeholder={t('login.namePlaceholder')} value={singleData.studentName} onChange={(e) => setSingleData({ ...singleData, studentName: e.target.value })} />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-[var(--theme-text-primary)] mb-1.5">{t('dashboard.modal.domain')}</label>
                                    <Input required placeholder="Machine Learning Fundamentals" value={singleData.domain} onChange={(e) => setSingleData({ ...singleData, domain: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--theme-text-primary)] mb-1.5">{t('dashboard.modal.start')}</label>
                                    <Input type="date" required value={singleData.startDate} onChange={(e) => setSingleData({ ...singleData, startDate: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--theme-text-primary)] mb-1.5">{t('dashboard.modal.end')}</label>
                                    <Input type="date" required value={singleData.endDate} onChange={(e) => setSingleData({ ...singleData, endDate: e.target.value })} />
                                </div>
                            </div>
                            <div className="flex justify-end gap-3 pt-6 border-t border-[var(--theme-border)]">
                                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)} disabled={creating}>{t('dashboard.modal.cancel')}</Button>
                                <Button type="submit" loading={creating}>{t('dashboard.modal.generate')}</Button>
                            </div>
                        </form>
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
