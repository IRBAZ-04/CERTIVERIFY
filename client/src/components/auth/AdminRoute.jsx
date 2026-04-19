import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = () => {
    const { user, loading, isAdmin } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-surface">
                <div className="w-12 h-12 border-t-2 border-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user || !isAdmin) {
        console.warn(`[Security] Unauthorized access attempt to Admin Route. Role: ${user?.role || 'Guest'}`);
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default AdminRoute;
