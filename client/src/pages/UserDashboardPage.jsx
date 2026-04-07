import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const UserDashboardPage = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');

  useEffect(() => {
    if (!userInfo?.token) {
      navigate('/login');
      return;
    }
    if (userInfo.role !== 'user') {
      navigate('/admin-dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-[calc(100vh-8rem)] p-6 bg-[var(--theme-background)]">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>User Dashboard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-[var(--theme-text-secondary)]">
              Use certificate search to verify and download your certificate.
            </p>
            <Link to="/search">
              <Button>Verify Certificate</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboardPage;
