import { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  FileSpreadsheet, 
  Plus, 
  CheckCircle2, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Loader2, 
  FileText, 
  Download,
  Sparkles,
  Award
} from 'lucide-react';
import API from '../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
  const [form, setForm] = useState({ certificateId: '', studentName: '', course: '', date: '' });
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState('');

  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCertificates, setTotalCertificates] = useState(0);
  const [activeTab, setActiveTab] = useState('list'); // 'list' or 'create'
  const limit = 10;

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

  const onGenerate = async (e) => {
    e.preventDefault();
    setCreating(true);
    setMessage('');
    try {
      const payload = {
        certificateId: form.certificateId,
        studentName: form.studentName,
        domain: form.course,
        startDate: form.date,
        endDate: form.date
      };
      const { data } = await API.post('/certificates', payload);
      setMessage(`Certificate generated: ${data.certificateId || data.certId}`);
      setForm({ certificateId: '', studentName: '', course: '', date: '' });
      fetchCertificates();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Generation failed');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 px-4 bg-[var(--theme-background)]">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[var(--theme-accent-primary)] to-[var(--theme-accent-hover)] mx-auto mb-4 flex items-center justify-center shadow-lg">
            <ShieldCheck className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-[var(--theme-text-primary)] tracking-tight">Admin Dashboard</h1>
          <p className="text-[var(--theme-text-secondary)] mt-1 text-lg">Digital Credential Management</p>
        </motion.div>

        {/* Compact Tab Selection Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 py-2">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('create')}
            className={`group relative flex items-center gap-4 px-8 py-3 rounded-2xl border-2 transition-all duration-300 w-full sm:w-auto min-w-[220px] ${
              activeTab === 'create'
                ? 'bg-[var(--theme-accent-primary)] border-[var(--theme-accent-primary)] text-white shadow-lg'
                : 'bg-[var(--theme-surface)] border-[var(--theme-border)] text-[var(--theme-text-secondary)] hover:border-[var(--theme-accent-primary)]/50'
            }`}
          >
            <div className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
              activeTab === 'create' ? 'bg-white/20' : 'bg-[var(--theme-accent-soft-bg)]'
            }`}>
              <Plus className={`h-4 w-4 ${activeTab === 'create' ? 'text-white' : 'text-[var(--theme-accent-primary)]'}`} />
            </div>
            <span className={`font-bold text-base ${activeTab === 'create' ? 'text-white' : 'text-[var(--theme-text-primary)]'}`}>Issue New</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('list')}
            className={`group relative flex items-center gap-4 px-8 py-3 rounded-2xl border-2 transition-all duration-300 w-full sm:w-auto min-w-[220px] ${
              activeTab === 'list'
                ? 'bg-[var(--theme-accent-primary)] border-[var(--theme-accent-primary)] text-white shadow-lg'
                : 'bg-[var(--theme-surface)] border-[var(--theme-border)] text-[var(--theme-text-secondary)] hover:border-[var(--theme-accent-primary)]/50'
            }`}
          >
            <div className={`h-8 w-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
              activeTab === 'list' ? 'bg-white/20' : 'bg-[var(--theme-accent-soft-bg)]'
            }`}>
              <FileText className={`h-4 w-4 ${activeTab === 'list' ? 'text-white' : 'text-[var(--theme-accent-primary)]'}`} />
            </div>
            <span className={`font-bold text-base ${activeTab === 'list' ? 'text-white' : 'text-[var(--theme-text-primary)]'}`}>View Registry</span>
          </motion.button>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {activeTab === 'create' ? (
              <motion.div
                key="create-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col md:flex-row gap-8 w-full items-start"
              >
                {/* Left Side: Bulk & Info (40%) */}
                <div className="w-full md:w-[40%] flex flex-col gap-6">
                  <Link to="/upload-excel">
                    <Card hover className="cursor-pointer group bg-gradient-to-br from-[var(--theme-surface)] to-[var(--theme-hover-surface)] border-[var(--theme-border)]">
                      <CardContent className="p-8 flex items-center gap-6">
                        <div className="h-14 w-14 rounded-2xl bg-[var(--theme-accent-soft-bg)] flex items-center justify-center group-hover:bg-[var(--theme-accent-primary)] transition-all duration-500 shadow-sm">
                          <FileSpreadsheet className="h-7 w-7 text-[var(--theme-accent-primary)] group-hover:text-white transition-all duration-500" />
                        </div>
                        <div>
                          <p className="font-bold text-xl text-[var(--theme-text-primary)]">Bulk Import</p>
                          <p className="text-sm text-[var(--theme-text-secondary)] mt-1">Excel Processing</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Card className="border-[var(--theme-border)] shadow-sm bg-[var(--theme-surface)]/50 backdrop-blur-sm overflow-hidden">
                    <div className="h-1 bg-gradient-to-r from-[var(--theme-accent-gold)] to-transparent" />
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-3 text-lg font-bold">
                        <Sparkles className="h-5 w-5 text-[var(--theme-accent-gold)]" />
                        Quick Tips
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-4 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                        <div className="h-2 w-2 rounded-full bg-[var(--theme-accent-gold)] mt-2 shrink-0" />
                        <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">
                          <span className="font-bold text-[var(--theme-text-primary)]">Uniqueness:</span> Use distinct Certificate IDs.
                        </p>
                      </div>
                      <div className="flex gap-4 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                        <div className="h-2 w-2 rounded-full bg-[var(--theme-accent-primary)] mt-2 shrink-0" />
                        <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">
                          <span className="font-bold text-[var(--theme-text-primary)]">Templates:</span> Match required headers.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Side: Individual Form (60%) */}
                <Card className="w-full md:w-[60%] shadow-xl border-[var(--theme-border)] bg-[var(--theme-surface)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                    <Award className="h-32 w-32" />
                  </div>
                  <CardHeader className="border-b border-[var(--theme-border)] pb-6 bg-[var(--theme-hover-surface)]/30">
                    <CardTitle className="flex items-center gap-3 text-2xl font-bold">
                      <Award className="h-6 w-6 text-[var(--theme-accent-primary)]" />
                      Individual Issuance
                    </CardTitle>
                    <p className="text-sm text-[var(--theme-text-secondary)] mt-1">Manual certificate generation</p>
                  </CardHeader>
                  <CardContent className="pt-8 px-8">
                    <form onSubmit={onGenerate} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-[var(--theme-text-secondary)] mb-2 uppercase tracking-[0.15em]">Certificate ID</label>
                          <Input required placeholder="CERT-2026-001" value={form.certificateId} onChange={(e) => setForm({ ...form, certificateId: e.target.value })} className="h-12 text-base font-mono bg-[var(--theme-background)]" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-[var(--theme-text-secondary)] mb-2 uppercase tracking-[0.15em]">Recipient Full Name</label>
                          <Input required placeholder="John Doe" value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} className="h-12 text-base bg-[var(--theme-background)]" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[var(--theme-text-secondary)] mb-2 uppercase tracking-[0.15em]">Course / Domain</label>
                          <Input required placeholder="Machine Learning" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} className="h-12 text-base bg-[var(--theme-background)]" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[var(--theme-text-secondary)] mb-2 uppercase tracking-[0.15em]">Issue Date</label>
                          <Input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="h-12 text-base bg-[var(--theme-background)]" />
                        </div>
                      </div>
                      <div className="flex justify-end pt-4">
                        <Button type="submit" className="px-10 h-14 text-base font-bold shadow-lg shadow-[var(--theme-accent-primary)]/20" size="lg" loading={creating}>
                          <Award className="h-5 w-5 mr-2" />
                          Issue Digital Certificate
                        </Button>
                      </div>
                    </form>
                    {message && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-8 p-5 rounded-2xl bg-[var(--theme-success-bg)] border border-[var(--theme-success-border)] flex items-center gap-4 shadow-sm"
                      >
                        <CheckCircle2 className="h-6 w-6 text-[var(--theme-success-text)]" />
                        <span className="font-bold text-[var(--theme-success-text)]">{message}</span>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="list-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Card className="overflow-hidden shadow-xl border-[var(--theme-border)]">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between p-6 bg-[var(--theme-surface)] border-b border-[var(--theme-border)] gap-6">
                    <div className="shrink-0">
                      <h2 className="text-2xl font-bold text-[var(--theme-text-primary)]">Registry</h2>
                      <p className="text-xs text-[var(--theme-text-secondary)] mt-0.5">Audit log of all issued credentials</p>
                    </div>
                    <div className="relative w-full lg:max-w-md">
                      <Input
                        icon={Search}
                        type="text"
                        placeholder="Filter by name, ID, or course..."
                        value={search}
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="h-11 text-sm bg-[var(--theme-background)]"
                      />
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    {loading ? (
                      <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <Loader2 className="h-10 w-10 animate-spin text-[var(--theme-accent-primary)]" />
                        <p className="text-xs text-[var(--theme-text-secondary)]">Fetching records...</p>
                      </div>
                    ) : certificates.length === 0 ? (
                      <div className="text-center py-20 px-4">
                        <FileText className="h-12 w-12 text-[var(--theme-text-muted)] mx-auto mb-4 opacity-50" />
                        <p className="text-xl font-bold text-[var(--theme-text-primary)]">{search ? 'No Match Found' : 'Empty Registry'}</p>
                        <p className="text-xs text-[var(--theme-text-secondary)] mt-2 italic">Try refining your search or issuing a new certificate.</p>
                      </div>
                    ) : (
                      <table className="w-full border-collapse text-left">
                        <thead>
                          <tr className="bg-[var(--theme-hover-surface)]/30 border-b border-[var(--theme-border)]">
                            <th className="text-[10px] font-bold text-[var(--theme-text-secondary)] uppercase tracking-[0.2em] px-6 py-4">ID</th>
                            <th className="text-[10px] font-bold text-[var(--theme-text-secondary)] uppercase tracking-[0.2em] px-6 py-4">Student</th>
                            <th className="text-[10px] font-bold text-[var(--theme-text-secondary)] uppercase tracking-[0.2em] px-8 py-4 hidden sm:table-cell">Course</th>
                            <th className="text-[10px] font-bold text-[var(--theme-text-secondary)] uppercase tracking-[0.2em] px-6 py-4 hidden md:table-cell">Date</th>
                            <th className="text-[10px] font-bold text-[var(--theme-text-secondary)] uppercase tracking-[0.2em] px-6 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--theme-border)]">
                          {certificates.map((cert) => (
                            <tr key={cert._id} className="hover:bg-[var(--theme-accent-soft-bg)]/20 transition-all duration-200 group">
                              <td className="px-6 py-4">
                                <span className="font-mono text-[11px] font-bold bg-[var(--theme-surface)] px-2 py-1 rounded border border-[var(--theme-border)] text-[var(--theme-accent-primary)] group-hover:bg-white transition-colors duration-200">
                                  {cert.certId}
                                </span>
                              </td>
                              <td className="px-6 py-4 font-bold text-[var(--theme-text-primary)] text-sm">{cert.name}</td>
                              <td className="px-8 py-4 hidden sm:table-cell">
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[var(--theme-background)] border border-[var(--theme-border)] text-[var(--theme-text-secondary)] uppercase tracking-wider">
                                  {cert.course}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-[var(--theme-text-secondary)] text-[11px] hidden md:table-cell">
                                {cert.date}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex justify-end">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => window.open(`/api/certificates/download/${cert.certId}`, '_blank')}
                                    className="h-8 group-hover:bg-[var(--theme-accent-primary)] group-hover:text-white"
                                  >
                                    <span className="sr-only sm:not-sr-only sm:mr-2">PDF</span>
                                    <Download className="h-3 w-3 shrink-0" />
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
                    <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--theme-border)] bg-[var(--theme-surface)]/30">
                      <p className="text-[11px] font-semibold text-[var(--theme-text-secondary)]">
                        Showing {certificates.length} of {totalCertificates}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          disabled={page === 1 || loading}
                          className="h-8 px-3 text-[10px]"
                        >
                          <ChevronLeft className="h-3 w-3 mr-1" />
                          Prev
                        </Button>
                        <div className="text-[11px] font-bold px-2">{page} / {totalPages}</div>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                          disabled={page === totalPages || loading}
                          className="h-8 px-3 text-[10px]"
                        >
                          Next
                          <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
