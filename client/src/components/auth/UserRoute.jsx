import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const UserRoute = () => {
    const { user, loading, isAdmin } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-surface">
                <div className="w-12 h-12 border-t-2 border-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Role-based restriction: Admin should go to admin dashboard instead of user dashboard if they end up here
    if (isAdmin) {
        console.log('[Routing] Admin attempted to access User Route. Redirecting to Admin Dashboard.');
        return <Navigate to="/admin-dashboard" replace />;
    }

    return <Outlet />;
};

export default UserRoute;
