import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const ExcelUploadPage = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!userInfo?.token) {
      navigate('/login');
      return;
    }
    if (userInfo.role !== 'admin') {
      navigate('/user-dashboard');
    }
  }, [navigate]);

  const onUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setMessage('');
    const formData = new FormData();
    formData.append('file', file);
    try {
      const { data } = await API.post('/certificates/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage(data.message || 'Upload complete');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] p-6 bg-[var(--theme-background)]">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Excel Upload Page</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onUpload} className="space-y-4">
              <input type="file" accept=".xlsx,.xls" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              <Button type="submit" disabled={!file || uploading}>Upload Excel</Button>
            </form>
            {message && <p className="mt-3 text-sm text-[var(--theme-text-secondary)]">{message}</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExcelUploadPage;
