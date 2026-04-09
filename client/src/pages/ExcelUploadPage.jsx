import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileSpreadsheet, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import API from '../services/api';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';

const ExcelUploadPage = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [uploadSummary, setUploadSummary] = useState(null);

  useEffect(() => {
    if (!userInfo?.token) {
      navigate('/login');
      return;
    }
    if (userInfo.role !== 'admin' && userInfo.role !== 'SUPER_ADMIN') {
      navigate('/user-dashboard');
    }
  }, [navigate]);

  const onUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setMessage('');
    setUploadSummary(null);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const { data } = await API.post('/certificates/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage(data.message || 'Upload completed successfully!');
      setMessageType('success');
      if (data.summary) {
        setUploadSummary(data.summary);
      }
      setFile(null);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Upload failed. Please try again.');
      setMessageType('error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 px-4 bg-[var(--theme-background)]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader className="text-center pb-2">
              <div className="h-14 w-14 rounded-2xl bg-[var(--theme-accent-soft-bg)] mx-auto mb-4 flex items-center justify-center">
                <FileSpreadsheet className="h-7 w-7 text-[var(--theme-accent-primary)]" />
              </div>
              <CardTitle className="text-2xl">Upload Excel File</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={onUpload} className="space-y-6">
                <label className="group relative flex flex-col items-center justify-center border-2 border-dashed border-[var(--theme-border)] rounded-xl p-12 bg-[var(--theme-surface)] hover:bg-[var(--theme-hover-surface)] hover:border-[var(--theme-accent-primary)] transition-all cursor-pointer">
                  <FileSpreadsheet className="h-12 w-12 text-[var(--theme-text-muted)] group-hover:text-[var(--theme-accent-primary)] transition-colors mb-4" />
                  <p className="text-sm font-medium text-[var(--theme-text-primary)] mb-1">
                    {file ? file.name : 'Drop your Excel file here or click to browse'}
                  </p>
                  <p className="text-xs text-[var(--theme-text-secondary)]">
                    Supported formats: .xlsx, .xls
                  </p>
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>

                <div className="p-4 rounded-xl bg-[var(--theme-hover-surface)] border border-[var(--theme-border)] text-xs text-[var(--theme-text-secondary)] space-y-2">
                  <p className="font-semibold text-[var(--theme-text-primary)]">Accepted Excel Columns:</p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                    <p><span className="font-medium text-[var(--theme-text-primary)]">Name:</span> Name, Student Name, Full Name</p>
                    <p><span className="font-medium text-[var(--theme-text-primary)]">Course:</span> Course, Domain, Domain Name</p>
                    <p><span className="font-medium text-[var(--theme-text-primary)]">Date:</span> Date, Issue Date, Start Date</p>
                    <p><span className="font-medium text-[var(--theme-accent-primary)]">Cert ID:</span> Optional — auto-generated if missing</p>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={!file || uploading}>
                  {uploading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5 mr-2" />
                      Upload Excel
                    </>
                  )}
                </Button>

                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl flex items-start gap-3 ${
                      messageType === 'error'
                        ? 'bg-[var(--theme-error-bg)] border border-[var(--theme-error-border)] text-[var(--theme-error-text)]'
                        : 'bg-[var(--theme-success-bg)] border border-[var(--theme-success-border)] text-[var(--theme-success-text)]'
                    }`}
                  >
                    {messageType === 'error' ? (
                      <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{message}</p>
                      {uploadSummary && (
                        <div className="mt-2 text-xs space-y-1">
                          <p>✓ Inserted: {uploadSummary.inserted} certificates</p>
                          {uploadSummary.autoGenerated > 0 && (
                            <p className="font-semibold">✨ Auto-generated IDs: {uploadSummary.autoGenerated}</p>
                          )}
                          {uploadSummary.rejected > 0 && (
                            <p>✗ Rejected: {uploadSummary.rejected} rows (missing critical data)</p>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ExcelUploadPage;
