import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Download, FileSpreadsheet, Loader2, AlertCircle, Plus, FileText, Database, Users, ShieldCheck, Award, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import API from '../services/api';
import { downloadCertificatePDF } from '../utils/downloadUtils';
import Sidebar from '../components/ui/Sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { t } = useTranslation();
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [file, setFile] = useState(null);
    const [uploadReport, setUploadReport] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCertificates, setTotalCertificates] = useState(0);
    const limit = 10;

    const [users, setUsers] = useState([]);
    const [usersLoading, setUsersLoading] = useState(true);
    const [creatingUser, setCreatingUser] = useState(false);
    const [updatingUserId, setUpdatingUserId] = useState(null);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'USER' });

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [singleData, setSingleData] = useState({ certId: '', name: '', course: '', date: '' });
    const [creating, setCreating] = useState(false);

    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const canCreateSuperAdmin = userInfo.role === 'SUPER_ADMIN';

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: page.toString(),
                limit: limit.toString(),
                ...(search && { search })
            });
            const { data } = await API.get(`/certificates?${params}`);
            setCertificates(data.certificates);
            setTotalPages(data.totalPages);
            setTotalCertificates(data.total);
        } catch (err) {
            if (err.response?.status === 401) {
                localStorage.removeItem('userInfo');
                navigate('/login');
                return;
            }
            showMessage('error', t('dashboard.messages.loadFail'));
        } finally {
            setLoading(false);
        }
    }, [page, search, navigate, t]);

    useEffect(() => {
        if (!userInfo.token) {
            navigate('/login');
            return;
        }
        if (userInfo.role === 'USER') {
            setLoading(false);
            return;
        }
        fetchData();
        fetchUsers();
    }, [navigate, fetchData]);

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    };

    const handleSearchChange = (value) => {
        setSearch(value);
        setPage(1);
    };



    const fetchUsers = async () => {
        try {
            setUsersLoading(true);
            const { data } = await API.get('/auth/users');
            setUsers(data);
        } catch (err) {
            if (err.response?.status === 401) {
                localStorage.removeItem('userInfo');
                navigate('/login');
                return;
            }
            showMessage('error', err.response?.data?.message || 'Failed to load users.');
        } finally {
            setUsersLoading(false);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        setUploadReport(null);
        try {
            const { data } = await API.post('/certificates/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setUploadReport(data);
            showMessage('success', data.message || 'Upload completed.');
            setFile(null);
            document.getElementById('file-upload').value = '';
            fetchData();
        } catch (err) {
            setUploadReport(err.response?.data?.rejectedRows ? err.response.data : null);
            showMessage('error', err.response?.data?.message || t('dashboard.messages.uploadFail'));
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
            setSingleData({ certId: '', name: '', course: '', date: '' });
            fetchData();
        } catch (err) {
            showMessage('error', err.response?.data?.message || t('dashboard.messages.loadFail'));
        } finally {
            setCreating(false);
        }
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setCreatingUser(true);
        try {
            await API.post('/auth/users', newUser);
            showMessage('success', 'Account created successfully.');
            setNewUser({ name: '', email: '', password: '', role: 'USER' });
            fetchUsers();
        } catch (err) {
            showMessage('error', err.response?.data?.message || 'Failed to create account.');
        } finally {
            setCreatingUser(false);
        }
    };

    const handleUpdateUser = async (user) => {
        setUpdatingUserId(user._id);
        try {
            await API.patch(`/auth/users/${user._id}`, {
                name: user.name,
                role: user.role,
                status: user.status
            });
            showMessage('success', 'Account updated.');
            fetchUsers();
        } catch (err) {
            showMessage('error', err.response?.data?.message || 'Failed to update account.');
        } finally {
            setUpdatingUserId(null);
        }
    };

    const handleLogout = async () => {
        try {
            await API.post('/auth/logout');
        } catch {
            // Ignore network/logout failures and always clear local session.
        } finally {
            localStorage.removeItem('userInfo');
            navigate('/login');
        }
    };

    const validCertificates = certificates.filter((cert) => cert.status === 'VALID').length;
    const revokedCertificates = certificates.filter((cert) => cert.status === 'REVOKED').length;

    if (userInfo.role === 'USER') {
        return (
            <div className="min-h-[calc(100vh-8rem)] py-20 px-4 bg-[var(--theme-background)] flex flex-col items-center justify-center">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full text-center space-y-6"
                >
                    <div className="h-20 w-20 mx-auto rounded-2xl bg-[var(--theme-accent-primary)] flex items-center justify-center shadow-sm">
                        <Users className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-[var(--theme-text-primary)]">
                        Welcome, {userInfo.name}
                    </h1>
                    <p className="text-lg text-[var(--theme-text-secondary)]">
                        Access your certificate verification and downloads securely from our central portal.
                    </p>
                    <div className="pt-4">
                        <Button size="xl" className="w-full gap-2" onClick={() => navigate('/verify')}>
                            <ShieldCheck className="h-5 w-5" />
                            Go to Verify Certificate
                        </Button>
                    </div>
                    <div className="pt-2">
                        <Button variant="outline" onClick={handleLogout}>
                            {t('nav.logout')}
                        </Button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-[var(--theme-background)]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">
                    <Sidebar />
                    <div className="flex-1 space-y-8">
                        {/* Header */}
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-[var(--theme-border)]"
                        >
                            <div>
                                <h1 className="text-3xl font-bold text-[var(--theme-text-primary)]">{t('dashboard.title')}</h1>
                                <p className="mt-1 text-sm text-[var(--theme-text-secondary)]">
                                    {userInfo.role === 'SUPER_ADMIN' ? t('dashboard.superAdmin') : t('dashboard.orgDash')}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--theme-accent-soft-bg)]">
                                    <div className="h-7 w-7 rounded-lg bg-[var(--theme-accent-primary)] flex items-center justify-center text-white text-xs font-semibold">
                                        {userInfo.name?.charAt(0)}
                                    </div>
                                    <span className="text-sm font-medium text-[var(--theme-text-primary)] hidden sm:block">{userInfo.name}</span>
                                </div>
                                <Button variant="outline" size="sm" onClick={handleLogout}>
                                    {t('nav.logout')}
                                </Button>
                            </div>
                        </motion.div>

                        {/* Messages */}
                        {message.text && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`p-4 rounded-xl flex items-center gap-3 ${
                                    message.type === 'error'
                                        ? 'bg-[var(--theme-error-bg)] border border-[var(--theme-error-border)] text-[var(--theme-error-text)]'
                                        : 'bg-[var(--theme-success-bg)] border border-[var(--theme-success-border)] text-[var(--theme-success-text)]'
                                }`}>
                                <AlertCircle className="h-5 w-5 shrink-0" />
                                <span className="text-sm font-medium">{message.text}</span>
                            </motion.div>
                        )}

                        {/* Stats */}
                        {!loading && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <Card className="h-full">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm text-[var(--theme-text-secondary)]">Total Certificates</p>
                                                    <p className="text-4xl font-bold text-[var(--theme-text-primary)] mt-2">{totalCertificates}</p>
                                                </div>
                                                <div className="h-12 w-12 rounded-xl bg-[var(--theme-accent-soft-bg)] flex items-center justify-center">
                                                    <Award className="h-6 w-6 text-[var(--theme-accent-primary)]" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <Card className="h-full">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm text-[var(--theme-text-secondary)]">Valid</p>
                                                    <p className="text-4xl font-bold text-[var(--theme-success-text)] mt-2">{validCertificates}</p>
                                                </div>
                                                <div className="h-12 w-12 rounded-xl bg-[var(--theme-success-bg)] flex items-center justify-center">
                                                    <ShieldCheck className="h-6 w-6 text-[var(--theme-success-text)]" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <Card className="h-full">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm text-[var(--theme-text-secondary)]">Revoked</p>
                                                    <p className="text-4xl font-bold text-[var(--theme-error-text)] mt-2">{revokedCertificates}</p>
                                                </div>
                                                <div className="h-12 w-12 rounded-xl bg-[var(--theme-error-bg)] flex items-center justify-center">
                                                    <AlertCircle className="h-6 w-6 text-[var(--theme-error-text)]" />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Database className="h-5 w-5 text-[var(--theme-accent-primary)]" />
                                            {t('dashboard.actions.importTitle')}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <form onSubmit={handleUpload} className="space-y-4">
                                            <label htmlFor="file-upload" className="group relative block border-2 border-dashed border-[var(--theme-border)] rounded-xl p-8 flex flex-col items-center justify-center bg-[var(--theme-surface)] hover:bg-[var(--theme-hover-surface)] hover:border-[var(--theme-accent-primary)] transition-all cursor-pointer">
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
                                                {file && (
                                                    <div className="absolute inset-x-0 bottom-3 px-4">
                                                        <p className="text-xs text-[var(--theme-accent-primary)] font-medium truncate text-center px-3 py-1.5 rounded-lg bg-[var(--theme-accent-soft-bg)]">
                                                            {file.name}
                                                        </p>
                                                    </div>
                                                )}
                                            </label>
                                             <div className="flex justify-end pt-4">
                                                <Button type="submit" className="w-full sm:w-auto" size="lg" disabled={!file || uploading}>
                                                    {uploading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Upload className="h-5 w-5 mr-2" />}
                                                    {t('dashboard.actions.process')}
                                                </Button>
                                             </div>
                                        </form>
                                        {uploadReport?.summary && (
                                            <div className="mt-4 rounded-lg border border-[var(--theme-border)] p-4 text-sm">
                                                <p className="font-medium text-[var(--theme-text-primary)]">
                                                    Processed: {uploadReport.summary.inserted} inserted, {uploadReport.summary.rejected} rejected
                                                </p>
                                                {uploadReport.rejectedRows?.length > 0 && (
                                                    <div className="mt-2 max-h-40 overflow-auto text-[var(--theme-text-secondary)]">
                                                        {uploadReport.rejectedRows.slice(0, 10).map((row) => (
                                                            <p key={`reject-${row.row}`}>Row {row.row}: {row.reasons.join(', ')}</p>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Card className="h-full">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <FileText className="h-5 w-5 text-[var(--theme-text-primary)]" />
                                            {t('dashboard.actions.issuanceTitle')}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-1 flex flex-col justify-center items-center text-center p-8">
                                        <div className="h-16 w-16 rounded-2xl bg-[var(--theme-hover-surface)] flex items-center justify-center mb-6">
                                            <Plus className="h-8 w-8 text-[var(--theme-accent-primary)]" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-[var(--theme-text-primary)] mb-2">{t('dashboard.actions.manualTitle')}</h3>
                                        <p className="text-sm text-[var(--theme-text-secondary)] mb-8 max-w-[280px]">{t('dashboard.actions.manualDesc')}</p>
                                         <div className="flex justify-end pt-4">
                                            <Button size="lg" onClick={() => setIsCreateOpen(true)} className="w-full sm:w-auto gap-2">
                                                <Plus className="h-5 w-5" />
                                                {t('dashboard.actions.newCert')}
                                            </Button>
                                         </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>

                        {/* Table */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Card className="overflow-hidden">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b border-[var(--theme-border)] gap-4">
                                    <h2 className="text-xl font-semibold text-[var(--theme-text-primary)]">{t('dashboard.table.title')}</h2>
                                    <div className="relative w-full sm:w-[500px] lg:w-[700px]">
                                        <Input
                                            icon={Search}
                                            type="text"
                                            placeholder="Search by name, cert ID, or course..."
                                            value={search}
                                            onChange={(e) => handleSearchChange(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    {loading ? (
                                        <div className="flex justify-center py-16">
                                            <Loader2 className="h-8 w-8 animate-spin text-[var(--theme-accent-primary)]" />
                                        </div>
                                    ) : certificates.length === 0 ? (
                                        <div className="text-center py-16">
                                            <FileText className="h-12 w-12 text-[var(--theme-text-muted)] mx-auto mb-4" />
                                            <p className="text-[var(--theme-text-primary)] font-medium">{search ? 'No matching certificates found' : t('dashboard.table.empty')}</p>
                                            <p className="text-sm text-[var(--theme-text-secondary)] mt-1">{search ? 'Try a different search term' : t('dashboard.table.emptyDesc')}</p>
                                        </div>
                                    ) : (
                                        <table className="w-full border-collapse text-left">
                                            <thead>
                                                <tr className="bg-[var(--theme-hover-surface)]/50 border-b border-[var(--theme-border)]">
                                                    <th className="text-xs font-semibold text-[var(--theme-text-secondary)] uppercase tracking-wider px-6 py-4">Certificate ID</th>
                                                    <th className="text-xs font-semibold text-[var(--theme-text-secondary)] uppercase tracking-wider px-6 py-4">Name</th>
                                                    <th className="text-xs font-semibold text-[var(--theme-text-secondary)] uppercase tracking-wider px-6 py-4 hidden sm:table-cell">Course</th>
                                                    <th className="text-xs font-semibold text-[var(--theme-text-secondary)] uppercase tracking-wider px-6 py-4 hidden md:table-cell">Date</th>
                                                                                                         <th className="text-right text-xs font-semibold text-[var(--theme-text-secondary)] uppercase tracking-wider px-6 py-4">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[var(--theme-border)] bg-[var(--theme-surface)]">
                                                {certificates.map((cert) => (
                                                    <tr key={cert._id} className="hover:bg-[var(--theme-hover-surface)] transition-colors group">
                                                        <td className="px-6 py-4">
                                                            <span className="font-mono text-sm px-2.5 py-1 rounded-lg bg-[var(--theme-hover-surface)] text-[var(--theme-text-primary)]">
                                                                {cert.certId}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 font-medium text-[var(--theme-text-primary)]">{cert.name}</td>
                                                        <td className="px-6 py-4 hidden sm:table-cell">
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--theme-hover-surface)] text-[var(--theme-text-primary)]">
                                                                {cert.course}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-[var(--theme-text-secondary)] text-sm hidden md:table-cell">
                                                            {cert.date}
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="flex justify-end gap-2">
                                                                                                                                 <Button variant="outline" size="sm" onClick={() => {
                                                                    downloadCertificatePDF(cert.certId);
                                                                }}>
                                                                    <span className="sr-only sm:not-sr-only sm:mr-2">PDF</span>
                                                                    <Download className="h-4 w-4 shrink-0" />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                                {certificates.length > 0 && (
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-[var(--theme-border)] bg-[var(--theme-surface)]">
                                        <p className="text-sm text-[var(--theme-text-secondary)]">
                                            Showing {certificates.length} of {totalCertificates} certificates
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                                disabled={page === 1 || loading}
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                                Previous
                                            </Button>
                                            <span className="text-sm text-[var(--theme-text-primary)] px-3">
                                                Page {page} of {totalPages}
                                            </span>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                                disabled={page === totalPages || loading}
                                            >
                                                Next
                                                <ChevronRight className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Card>
                        </motion.div>

                        {/* Modal */}
                        <Modal isOpen={isCreateOpen} onClose={() => !creating && setIsCreateOpen(false)} title={t('dashboard.modal.title')}>
                            <form onSubmit={handleCreateSingle} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-[var(--theme-text-primary)] mb-2">{t('dashboard.modal.certId')}</label>
                                        <Input required placeholder="CERT-2026-001" value={singleData.certId} onChange={(e) => setSingleData({ ...singleData, certId: e.target.value })} />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-[var(--theme-text-primary)] mb-2">{t('dashboard.modal.student')}</label>
                                        <Input required placeholder={t('login.namePlaceholder')} value={singleData.name} onChange={(e) => setSingleData({ ...singleData, name: e.target.value })} />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-[var(--theme-text-primary)] mb-2">{t('dashboard.modal.domain')}</label>
                                        <Input required placeholder="Machine Learning Fundamentals" value={singleData.course} onChange={(e) => setSingleData({ ...singleData, course: e.target.value })} />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-[var(--theme-text-primary)] mb-2">{t('dashboard.modal.start')}</label>
                                        <Input type="date" required value={singleData.date} onChange={(e) => setSingleData({ ...singleData, date: e.target.value })} />
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
        </div>
    );
};

export default Dashboard;
