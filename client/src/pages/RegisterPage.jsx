import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, ShieldCheck, Key, Eye, EyeOff, UserCircle, Crown } from 'lucide-react';
import API from '../services/api';
import { Card, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login } = useAuth();
  const [registerType, setRegisterType] = useState('user');
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    adminPasscode: '' 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminPasscode, setShowAdminPasscode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (registerType === 'admin' && !formData.adminPasscode) {
      setError('Admin passcode is required to create an admin account');
      return;
    }
    
    setLoading(true);
    
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        adminPasscode: registerType === 'admin' ? formData.adminPasscode : ''
      };
      
      const { data } = await API.post('/auth/register', payload);
      login(data);

      // Always navigate to homepage after registration
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleTypeChange = (type) => {
    setRegisterType(type);
    setFormData({ name: '', email: '', password: '', adminPasscode: '' });
    setError('');
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
                {/* Mobile Logo */}
                <div className="lg:hidden text-center mb-6">
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

                {/* Register Type Tabs */}
                <div className="flex gap-2 p-1.5 bg-[var(--theme-hover-surface)] rounded-xl mb-6">
                  <button
                    type="button"
                    onClick={() => handleTypeChange('user')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      registerType === 'user'
                        ? 'bg-[var(--theme-accent-primary)] text-white shadow-md'
                        : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)]'
                    }`}
                  >
                    <UserCircle className="h-4 w-4" />
                    User Account
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeChange('admin')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      registerType === 'admin'
                        ? 'bg-[var(--theme-accent-gold)] text-white shadow-md'
                        : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)]'
                    }`}
                  >
                    <Crown className="h-4 w-4" />
                    Admin Account
                  </button>
                </div>

                {/* Form Header */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[var(--theme-text-primary)]">
                    {registerType === 'admin' ? 'Admin Registration' : 'Get Started'}
                  </h2>
                  <p className="text-sm text-[var(--theme-text-secondary)] mt-1">
                    {registerType === 'admin'
                      ? 'Create an admin account with special privileges'
                      : 'Fill in your details to create an account'
                    }
                  </p>
                </div>

                {error && (
                  <div className="bg-[var(--theme-error-bg)] border border-[var(--theme-error-border)] text-[var(--theme-error-text)] text-sm p-4 rounded-xl mb-6 flex items-center gap-3">
                    <ShieldAlert className="h-5 w-5 shrink-0" />
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
                      onChange={(e) => handleInputChange('name', e.target.value)}
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
                      onChange={(e) => handleInputChange('email', e.target.value)}
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
                      onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                  </div>

                  {registerType === 'admin' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div>
                        <label className="block text-sm font-medium text-[var(--theme-text-primary)] mb-2">
                          Admin Passcode <span className="text-[var(--theme-accent-gold)]">*</span>
                        </label>
                        <Input
                          required
                          type={showAdminPasscode ? "text" : "password"}
                          icon={Key}
                          rightIcon={showAdminPasscode ? EyeOff : Eye}
                          rightIconAction={() => setShowAdminPasscode(!showAdminPasscode)}
                          placeholder="Enter admin passcode"
                          value={formData.adminPasscode}
                          onChange={(e) => handleInputChange('adminPasscode', e.target.value)}
                        />
                        <p className="text-xs text-[var(--theme-text-muted)] mt-2">
                          Contact system administrator for the passcode
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    className={`w-full ${registerType === 'admin' ? 'bg-[var(--theme-accent-gold)] hover:bg-[var(--theme-accent-gold)]/90' : ''}`}
                    size="lg"
                    loading={loading}
                  >
                    {registerType === 'admin' ? 'Create Admin Account' : 'Create Account'}
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
