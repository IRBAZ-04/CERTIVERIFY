import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { downloadCertificatePDF } from '../utils/downloadUtils';

const AdminDashboardPage = () => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
    
    // Create Mode State
    const [form, setForm] = useState({ certificateId: '', studentName: '', course: '', date: '' });
    const [creating, setCreating] = useState(false);
    const [message, setMessage] = useState('');
    
    // Registry Mode State
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCertificates, setTotalCertificates] = useState(0);
    const limit = 10;
    
    // Settings Mode State
    const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');
    const [changingPassword, setChangingPassword] = useState(false);
    
    // Tab active state
    const [activeTab, setActiveTab] = useState('list'); // 'list' | 'create' | 'settings'

    const fetchCertificates = useCallback(async () => {
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
            }
        } finally {
            setLoading(false);
        }
    }, [page, search, navigate]);

    useEffect(() => {
        if (!userInfo?.token) {
            navigate('/login');
            return;
        }
        if (userInfo.role !== 'admin' && userInfo.role !== 'SUPER_ADMIN') {
            navigate('/user-dashboard');
        }
        fetchCertificates();
    }, [navigate, fetchCertificates]);

    const handleSearchChange = (value) => {
        setSearch(value);
        setPage(1);
    };

    const handleGenerate = async (e) => {
        e.preventDefault();
        setCreating(true);
        setMessage('');
        try {
            const payload = {
                certId: form.certificateId || `CERT-${new Date().getFullYear()}-${Math.floor(Math.random()*(999-100+1)+100)}-${Math.floor(Math.random()*(99999-10000+1)+10000)}`,
                name: form.studentName,
                course: form.course,
                date: form.date
            };
            const { data } = await API.post('/certificates', payload);
            setMessage(`Certificate generated successfully: ${data.certificateId || data.certId}`);
            setForm({ certificateId: '', studentName: '', course: '', date: '' });
            fetchCertificates();
        } catch (err) {
            setMessage(err.response?.data?.message || 'Generation failed.');
        } finally {
            setCreating(false);
        }
    };
    
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setPasswordError('New passwords do not match');
            return;
        }
        if (passwordForm.newPassword.length < 8) {
            setPasswordError('Password must be at least 8 characters');
            return;
        }
        setChangingPassword(true);
        try {
            const { data } = await API.put('/auth/password', { currentPassword: passwordForm.currentPassword, newPassword: passwordForm.newPassword });
            setPasswordSuccess(data.message || 'Password changed successfully');
            setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
            localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (err) {
            setPasswordError(err.response?.data?.message || 'Failed to change password');
        } finally {
            setChangingPassword(false);
        }
    };

    return (
        <div className="bg-background text-on-surface font-body min-h-screen">
            {/* Context Navigation Tabs */}
            <div className="px-12 py-6 border-b-[0.5px] border-outline-variant/30 flex gap-8 items-end">
                <button 
                    onClick={() => setActiveTab('list')} 
                    className={`font-label text-xs uppercase tracking-[0.05em] transition-colors ${activeTab === 'list' ? 'text-primary font-bold border-b border-primary pb-1' : 'text-on-surface/50 hover:text-on-surface'}`}
                >
                    View Registry
                </button>
                <button 
                    onClick={() => setActiveTab('create')} 
                    className={`font-label text-xs uppercase tracking-[0.05em] transition-colors ${activeTab === 'create' ? 'text-primary font-bold border-b border-primary pb-1' : 'text-on-surface/50 hover:text-on-surface'}`}
                >
                    Issue New
                </button>
                <button 
                    onClick={() => setActiveTab('settings')} 
                    className={`font-label text-xs uppercase tracking-[0.05em] transition-colors ${activeTab === 'settings' ? 'text-primary font-bold border-b border-primary pb-1' : 'text-on-surface/50 hover:text-on-surface'}`}
                >
                    Settings
                </button>
            </div>

            <main className="max-w-7xl mx-auto px-12 py-16">
                
                {/* ---------------- REGISTRY OVERVIEW TAB ---------------- */}
                {activeTab === 'list' && (
                    <>
                        <section className="mb-16">
                            <div className="flex justify-between items-end mb-12">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant mb-2 block">System Overview</span>
                                    <h1 className="text-5xl font-headline font-normal tracking-tight text-on-surface">Admin Dashboard</h1>
                                </div>
                                <div className="flex gap-4">
                                    <div className="text-right hidden sm:block">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-on-surface-variant block">System Status</span>
                                        <span className="text-xs font-bold text-primary flex items-center gap-2 justify-end">
                                            <span className="w-1.5 h-1.5 bg-primary"></span> ONLINE
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 bg-outline-variant/30 border-[0.5px] border-outline-variant/50">
                                <div className="bg-surface p-10 flex flex-col justify-between group hover:bg-surface-container-low transition-colors duration-500">
                                    <div>
                                        <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-on-surface-variant">Total Issued Certificates</span>
                                        <div className="flex items-baseline gap-2 mt-4">
                                            <h2 className="text-6xl font-headline font-normal">{totalCertificates}</h2>
                                        </div>
                                    </div>
                                    <div className="mt-8 text-[11px] text-on-surface-variant/80 leading-relaxed font-medium">
                                        All valid digital records hosted securely in the database.
                                    </div>
                                </div>
                                <div className="bg-surface p-10 flex flex-col justify-between group hover:bg-surface-container-low transition-colors duration-500">
                                    <div>
                                        <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-on-surface-variant">Verification Activity</span>
                                        <div className="flex items-baseline gap-2 mt-4">
                                            <h2 className="text-6xl font-headline font-normal">Active</h2>
                                        </div>
                                    </div>
                                    <div className="mt-8 text-[11px] text-on-surface-variant/80 leading-relaxed font-medium">
                                        Public verification portal is currently active and handling web requests efficiently.
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-headline font-normal tracking-tight">Recent Certificates</h3>
                                <div className="flex gap-4">
                                    <div className="relative">
                                        <input 
                                            placeholder="Search records..." 
                                            value={search} 
                                            onChange={(e) => handleSearchChange(e.target.value)} 
                                            className="text-[11px] font-bold uppercase tracking-[0.1em] border-[0.5px] border-outline-variant px-4 py-2 bg-transparent focus:outline-none focus:border-primary w-48 transition-colors"
                                        />
                                    </div>
                                    <Link to="/upload-excel" className="text-[11px] font-bold uppercase tracking-[0.1em] border-[0.5px] border-outline-variant px-4 py-2 flex items-center gap-2 hover:bg-surface-container transition-colors hidden sm:flex">
                                        <span className="material-symbols-outlined text-[14px]">upload_file</span> Bulk Upload
                                    </Link>
                                    <button onClick={fetchCertificates} className="text-[11px] font-bold uppercase tracking-[0.1em] border-[0.5px] border-outline-variant px-4 py-2 flex items-center gap-2 hover:bg-surface-container transition-colors">
                                        <span className="material-symbols-outlined text-[14px]">refresh</span> Refresh
                                    </button>
                                </div>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="fine-border-b">
                                            <th className="py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Certificate ID</th>
                                            <th className="py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Student Name</th>
                                            <th className="py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Course Focus</th>
                                            <th className="py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">Date Issued</th>
                                            <th className="py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-outline-variant/30">
                                        {loading ? (
                                            <tr>
                                                <td colSpan="5" className="py-12 text-center text-[10px] uppercase tracking-widest text-on-surface-variant">Fetching Records...</td>
                                            </tr>
                                        ) : certificates.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="py-12 text-center text-[10px] uppercase tracking-widest text-on-surface-variant">No Records Found</td>
                                            </tr>
                                        ) : (
                                            certificates.map((cert) => (
                                                <tr key={cert._id} className="hover:bg-surface-container-low transition-colors group">
                                                    <td className="py-6 font-mono text-xs tracking-tighter">{cert.certId}</td>
                                                    <td className="py-6 text-sm font-bold">{cert.name}</td>
                                                    <td className="py-6">
                                                        <span className="text-[10px] text-on-surface-variant uppercase tracking-wider">{cert.course}</span>
                                                    </td>
                                                    <td className="py-6 text-sm text-on-surface-variant">{cert.date}</td>
                                                    <td className="py-6 text-right">
                                                        <button 
                                                            onClick={() => downloadCertificatePDF(cert.certId)}
                                                            className="text-[10px] font-bold uppercase tracking-widest bg-primary-container/10 text-primary-container px-3 py-1 hover:bg-primary-container/20 transition-colors"
                                                        >
                                                            Open PDF
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            
                            {totalPages > 1 && (
                                <div className="mt-12 flex justify-center gap-4 items-center">
                                    <button 
                                        disabled={page === 1} 
                                        onClick={() => setPage(page - 1)} 
                                        className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary transition-colors disabled:opacity-30"
                                    >BACK</button>
                                    <span className="text-xs font-mono">{page} / {totalPages}</span>
                                    <button 
                                        disabled={page === totalPages} 
                                        onClick={() => setPage(page + 1)} 
                                        className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary transition-colors disabled:opacity-30"
                                    >NEXT</button>
                                </div>
                            )}
                        </section>
                    </>
                )}

                {/* ---------------- ISSUE NEW TAB ---------------- */}
                {activeTab === 'create' && (
                    <div className="grid grid-cols-12 min-h-[calc(100vh-300px)] border-[0.5px] border-outline-variant/30 shadow-2xl">
                        <div className="col-span-12 lg:col-span-5 px-8 md:px-12 py-16 bg-surface-container-low border-b lg:border-b-0 lg:border-r-[0.5px] border-outline-variant/30">
                            <div className="max-w-md mx-auto lg:ml-0">
                                <section className="mb-12">
                                    <label className="text-[11px] font-bold font-label uppercase tracking-[0.15em] text-on-surface/50 mb-8 block">Issue Individual Certificate</label>
                                    <form onSubmit={handleGenerate} className="space-y-10">
                                        <div className="group">
                                            <label className="text-[11px] font-bold font-label uppercase tracking-[0.05em] text-on-surface">Certificate ID</label>
                                            <input 
                                                className="w-full bg-transparent border-0 border-b-[0.5px] border-outline-variant py-3 focus:ring-0 focus:border-primary-container font-body text-sm text-on-surface transition-colors"
                                                placeholder="e.g. CERT-2026-001"
                                                value={form.certificateId}
                                                onChange={(e) => setForm({...form, certificateId: e.target.value})}
                                            />
                                            <p className="text-[10px] text-on-surface/40 mt-2 font-body italic">Auto-generated if left empty.</p>
                                        </div>
                                        <div className="group">
                                            <label className="text-[11px] font-bold font-label uppercase tracking-[0.05em] text-on-surface">Student Full Name</label>
                                            <input 
                                                required
                                                className="w-full bg-transparent border-0 border-b-[0.5px] border-outline-variant py-3 focus:ring-0 focus:border-primary-container font-body text-sm text-on-surface transition-colors"
                                                placeholder="e.g. John Doe"
                                                value={form.studentName}
                                                onChange={(e) => setForm({...form, studentName: e.target.value})}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="group">
                                                <label className="text-[11px] font-bold font-label uppercase tracking-[0.05em] text-on-surface">Issue Date</label>
                                                <input 
                                                    required
                                                    type="date"
                                                    className="w-full bg-transparent border-0 border-b-[0.5px] border-outline-variant py-3 focus:ring-0 focus:border-primary-container font-body text-sm text-on-surface transition-colors uppercase"
                                                    value={form.date}
                                                    onChange={(e) => setForm({...form, date: e.target.value})}
                                                />
                                            </div>
                                            <div className="group">
                                                <label className="text-[11px] font-bold font-label uppercase tracking-[0.05em] text-on-surface">Course Domain</label>
                                                <input 
                                                    required
                                                    className="w-full bg-transparent border-0 border-b-[0.5px] border-outline-variant py-3 focus:ring-0 focus:border-primary-container font-body text-sm text-on-surface transition-colors"
                                                    placeholder="e.g. Machine Learning"
                                                    value={form.course}
                                                    onChange={(e) => setForm({...form, course: e.target.value})}
                                                />
                                            </div>
                                        </div>
                                        
                                        {message && (
                                            <div className="p-4 bg-primary-container/10 border-l-2 border-primary-container mt-4 text-[11px] font-bold uppercase tracking-widest text-primary-container">
                                                {message}
                                            </div>
                                        )}

                                        <div className="mt-12 flex space-x-4">
                                            <button 
                                                disabled={creating}
                                                type="submit"
                                                className="flex-1 bg-primary-container text-white py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all disabled:opacity-50"
                                            >
                                                {creating ? 'Issuing...' : 'Issue Document'}
                                            </button>
                                        </div>
                                    </form>
                                </section>
                            </div>
                        </div>

                        <div className="col-span-12 lg:col-span-7 bg-surface p-12 lg:p-24 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                                <span className="text-[20vw] font-headline font-bold italic tracking-tighter">CERTIVERIFY</span>
                            </div>
                            <div className="perspective-container w-full max-w-2xl">
                                <div className="certificate-tilt bg-white w-full aspect-[1/1.414] p-8 md:p-12 flex flex-col relative overflow-hidden border-[0.5px] border-outline-variant/20">
                                    <div className="absolute inset-4 border border-primary/10 pointer-events-none"></div>
                                    <div className="flex justify-between items-start mb-16">
                                        <div className="w-16 h-16 bg-primary flex items-center justify-center">
                                            <span className="material-symbols-outlined text-white text-3xl">award_star</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-on-surface/40">Certificate ID</p>
                                            <p className="text-[12px] font-bold font-label text-on-surface tracking-widest">{form.certificateId || "DRAFT ID"}</p>
                                        </div>
                                    </div>
                                    <div className="text-center mb-12">
                                        <h2 className="font-headline text-2xl md:text-3xl italic mb-2">Certificate of Completion</h2>
                                        <div className="w-24 h-[0.5px] bg-primary/30 mx-auto mb-8"></div>
                                        <p className="text-[10px] font-label uppercase tracking-[0.1em] text-on-surface/60 mb-1">This document verifies the graduation of</p>
                                        <h3 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-on-surface mb-8">Academic Achievement</h3>
                                    </div>
                                    <div className="space-y-6 flex-grow">
                                        <div className="grid grid-cols-2 gap-4 pb-4 border-b-[0.5px] border-outline-variant/30">
                                            <div>
                                                <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-on-surface/40">Student Name</p>
                                                <p className="text-sm font-bold font-label">{form.studentName || "[ AWAITING INPUT ]"}</p>
                                            </div>
                                            <div>
                                                <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-on-surface/40">Issuance Date</p>
                                                <p className="text-sm font-bold font-label">{form.date || "[ AWAITING INPUT ]"}</p>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 gap-4 pb-4 border-b-[0.5px] border-outline-variant/30">
                                            <div>
                                                <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-on-surface/40">Course Name</p>
                                                <p className="text-sm font-body leading-relaxed">{form.course || "[ AWAITING INPUT ]"}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-auto flex justify-between items-end">
                                        <div className="opacity-50">
                                            <div className="w-20 h-20 bg-surface-container-high border-[0.5px] border-outline-variant flex items-center justify-center">
                                                <span className="material-symbols-outlined text-outline-variant">qr_code_2</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="w-32 h-[0.5px] bg-on-surface mb-2"></div>
                                            <p className="text-[8px] font-bold uppercase tracking-[0.1em] text-on-surface/40">Authorized By</p>
                                            <p className="font-headline italic text-lg text-primary">CertiVerify Admin</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ---------------- SETTINGS TAB ---------------- */}
                {activeTab === 'settings' && (
                    <div className="max-w-2xl mx-auto bg-surface-container-low border-[0.5px] border-outline-variant/30 p-12 lg:p-20 mt-12">
                        <div className="mb-12 border-b-[0.5px] border-outline-variant/30 pb-6">
                            <h2 className="font-headline text-4xl mb-2">Account Settings</h2>
                            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-on-surface/50">Manage Administrator Password</p>
                        </div>
                        
                        <form onSubmit={handlePasswordChange} className="space-y-10">
                            <div className="group">
                                <label className="text-[11px] font-bold font-label uppercase tracking-[0.05em] text-on-surface">Current Password</label>
                                <input 
                                    required
                                    type="password"
                                    className="w-full bg-transparent border-0 border-b-[0.5px] border-outline-variant py-3 focus:ring-0 focus:border-primary-container font-body text-sm text-on-surface transition-colors"
                                    value={passwordForm.currentPassword}
                                    onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                                />
                            </div>
                            <div className="group flex gap-8">
                                <div className="flex-1">
                                    <label className="text-[11px] font-bold font-label uppercase tracking-[0.05em] text-on-surface">New Password</label>
                                    <input 
                                        required
                                        type="password"
                                        className="w-full bg-transparent border-0 border-b-[0.5px] border-outline-variant py-3 focus:ring-0 focus:border-primary-container font-body text-sm text-on-surface transition-colors"
                                        value={passwordForm.newPassword}
                                        onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="text-[11px] font-bold font-label uppercase tracking-[0.05em] text-on-surface">Confirm New Password</label>
                                    <input 
                                        required
                                        type="password"
                                        className="w-full bg-transparent border-0 border-b-[0.5px] border-outline-variant py-3 focus:ring-0 focus:border-primary-container font-body text-sm text-on-surface transition-colors"
                                        value={passwordForm.confirmPassword}
                                        onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                                    />
                                </div>
                            </div>
                            
                            {passwordError && (
                                <div className="p-4 bg-error/10 border-l-2 border-error text-[11px] font-bold uppercase tracking-widest text-error">
                                    {passwordError}
                                </div>
                            )}

                            {passwordSuccess && (
                                <div className="p-4 bg-primary-container/10 border-l-2 border-primary-container text-[11px] font-bold uppercase tracking-widest text-primary-container">
                                    {passwordSuccess}
                                </div>
                            )}

                            <div className="pt-8">
                                <button 
                                    type="submit" 
                                    disabled={changingPassword}
                                    className="bg-on-surface text-surface px-12 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-primary transition-all disabled:opacity-50"
                                >
                                    {changingPassword ? 'Updating...' : 'Change Password'}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboardPage;
