import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
  const [form, setForm] = useState({ certificateId: '', studentName: '', course: '', date: '' });
  const [creating, setCreating] = useState(false);
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

  const onGenerate = async (e) => {
    e.preventDefault();
    setCreating(true);
    setMessage('');
    try {
      const payload = {
        certId: form.certificateId,
        name: form.studentName,
        course: form.course,
        date: form.date
      };
      const { data } = await API.post('/certificates', payload);
      setMessage(`Certificate generated: ${data.certId}`);
      setForm({ certId: '', name: '', course: '', date: '' });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Generation failed');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] p-6 bg-[var(--theme-background)]">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Admin Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link to="/upload-excel">
              <Button>Upload Excel</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generate Certificates</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onGenerate} className="space-y-4">
              <Input required placeholder="Certificate ID" value={form.certificateId} onChange={(e) => setForm({ ...form, certificateId: e.target.value })} />
              <Input required placeholder="Name" value={form.studentName} onChange={(e) => setForm({ ...form, studentName: e.target.value })} />
              <Input required placeholder="Course" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} />
              <Input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              <Button type="submit" loading={creating}>Generate Certificates</Button>
            </form>
            {message && <p className="mt-3 text-sm text-[var(--theme-text-secondary)]">{message}</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
