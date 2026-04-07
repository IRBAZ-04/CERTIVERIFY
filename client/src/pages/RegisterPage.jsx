import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', adminPasscode: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await API.post('/auth/register', formData);
      localStorage.setItem('userInfo', JSON.stringify(data));
      if (data.role === 'user') {
        navigate('/user-dashboard');
      } else {
        navigate('/admin-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 bg-[var(--theme-background)]">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Register</CardTitle>
            <CardDescription>Create a user account</CardDescription>
          </CardHeader>
          <CardContent>
            {error && <p className="text-sm text-[var(--theme-error-text)] mb-3">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input required placeholder="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              <Input required type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <Input required type="password" placeholder="Password (min 8 chars)" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
              <Input type="password" placeholder="Admin Passcode (Optional)" value={formData.adminPasscode} onChange={(e) => setFormData({ ...formData, adminPasscode: e.target.value })} />
              <Button type="submit" className="w-full" loading={loading}>Register</Button>
            </form>
            <p className="text-sm text-[var(--theme-text-secondary)] mt-4 text-center">
              Already have an account? <Link className="text-[var(--theme-accent-primary)]" to="/login">Login</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
