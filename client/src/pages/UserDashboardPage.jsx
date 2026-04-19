import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Search, Award } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const UserDashboardPage = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (isAdmin) {
      navigate('/admin-dashboard');
    }
  }, [user, isAdmin, navigate]);

  return (
    <div className="min-h-[calc(100vh-8rem)] py-12 px-4 bg-[var(--theme-background)]">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="h-16 w-16 rounded-2xl bg-[var(--theme-accent-primary)] mx-auto mb-5 flex items-center justify-center shadow-sm">
            <Award className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[var(--theme-text-primary)]">Welcome, {user?.name} ({user?.role})</h1>
          <p className="text-[var(--theme-text-secondary)] mt-2">Access your certificate verification portal</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link to="/verify">
            <Card hover className="cursor-pointer">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-2xl bg-[var(--theme-accent-soft-bg)] flex items-center justify-center mb-5">
                  <ShieldCheck className="h-7 w-7 text-[var(--theme-accent-primary)]" />
                </div>
                <h2 className="text-xl font-semibold text-[var(--theme-text-primary)] mb-2">Verify Certificate</h2>
                <p className="text-sm text-[var(--theme-text-secondary)] mb-6 max-w-xs">
                  Search and verify certificates by their unique ID
                </p>
                <Button size="lg" className="gap-2">
                  <Search className="h-5 w-5" />
                  Verify Certificate
                </Button>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
