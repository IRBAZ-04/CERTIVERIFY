import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, ShieldCheck, Key, Eye, EyeOff } from 'lucide-react';
import API from '../services/api';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', adminPasscode: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminPasscode, setShowAdminPasscode] = useState(false);

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
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:flex flex-col justify-center pr-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-[var(--theme-accent-gold-soft-bg)] text-[var(--theme-accent-gold)] mb-6 w-fit">
              <UserPlus className="h-3.5 w-3.5" />
              Join Today
            </div>
            <h1 className="text-4xl font-bold text-[var(--theme-text-primary)] tracking-tight mb-4">
              Create Your Account
            </h1>
            <p className="text-lg text-[var(--theme-text-secondary)] leading-relaxed">
              Start managing and verifying certificates with enterprise-grade security and instant verification.
            </p>
            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3 text-sm text-[var(--theme-text-secondary)]">
                <div className="h-8 w-8 rounded-lg bg-[var(--theme-accent-soft-bg)] flex items-center justify-center">
                  <ShieldCheck className="h-4 w-4 text-[var(--theme-accent-primary)]" />
                </div>
                <span>Unlimited certificate verification</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[var(--theme-text-secondary)]">
                <div className="h-8 w-8 rounded-lg bg-[var(--theme-accent-soft-bg)] flex items-center justify-center">
                  <Key className="h-4 w-4 text-[var(--theme-accent-primary)]" />
                </div>
                <span>Admin access with passcode</span>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Register Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="w-full">
              <CardContent className="p-8">
                <div className="lg:hidden text-center mb-8">
                  <div className="h-12 w-12 rounded-xl bg-[var(--theme-accent-primary)] mx-auto mb-4 flex items-center justify-center">
                    <UserPlus className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--theme-text-primary)]">
                    Create Account
                  </h2>
                  <p className="text-sm text-[var(--theme-text-secondary)] mt-1">
                    Get started with CertiVerify
                  </p>
                </div>

                <div className="hidden lg:block mb-8">
                  <h2 className="text-2xl font-bold text-[var(--theme-text-primary)]">
                    Get Started
                  </h2>
                  <p className="text-sm text-[var(--theme-text-secondary)] mt-1">
                    Fill in your details to create an account
                  </p>
                </div>

                {error && (
                  <div className="bg-[var(--theme-error-bg)] border border-[var(--theme-error-border)] text-[var(--theme-error-text)] text-sm p-4 rounded-xl mb-6 flex items-center gap-3">
                    <ShieldCheck className="h-5 w-5 shrink-0" />
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-[var(--theme-text-primary)] mb-2">
                      Full Name
                    </label>
                    <Input
                      required
                      icon={User}
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--theme-text-primary)] mb-2">
                      Email Address
                    </label>
                    <Input
                      required
                      type="email"
                      icon={Mail}
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--theme-text-primary)] mb-2">
                      Password
                    </label>
                    <Input
                      required
                      type={showPassword ? "text" : "password"}
                      icon={Lock}
                      rightIcon={showPassword ? EyeOff : Eye}
                      rightIconAction={() => setShowPassword(!showPassword)}
                      placeholder="Min. 8 characters"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--theme-text-primary)] mb-2">
                      Admin Passcode <span className="text-[var(--theme-text-muted)]">(Optional)</span>
                    </label>
                    <Input
                      type={showAdminPasscode ? "text" : "password"}
                      icon={Key}
                      rightIcon={showAdminPasscode ? EyeOff : Eye}
                      rightIconAction={() => setShowAdminPasscode(!showAdminPasscode)}
                      placeholder="Enter for admin access"
                      value={formData.adminPasscode}
                      onChange={(e) => setFormData({ ...formData, adminPasscode: e.target.value })}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    loading={loading}
                  >
                    Create Account
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-[var(--theme-text-secondary)]">
                    Already have an account?{' '}
                    <Link to="/login" className="text-[var(--theme-accent-primary)] font-medium hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
