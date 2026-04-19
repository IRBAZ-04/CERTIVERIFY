import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CustomCursor from './components/ui/CustomCursor';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboardPage from './pages/UserDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ExcelUploadPage from './pages/ExcelUploadPage';
import VerifyPage from './pages/VerifyPage';
import AdminRoute from './components/auth/AdminRoute';
import UserRoute from './components/auth/UserRoute';

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: "easeIn" } },
};

import { useAuth } from './context/AuthContext';

// Session Timeout Component — 10 min inactivity auto-logout with warning
function SessionTimeoutManager() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const timeoutRef = useRef(null);
  const warningRef = useRef(null);
  const toastRef = useRef(null);
  const SESSION_TIMEOUT = 10 * 60 * 1000; // 10 minutes
  const WARNING_BEFORE = 60 * 1000; // Show warning 1 min before logout

  const clearTimers = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (warningRef.current) clearTimeout(warningRef.current);
    if (toastRef.current && toastRef.current.parentNode) {
      toastRef.current.parentNode.removeChild(toastRef.current);
      toastRef.current = null;
    }
  };

  const showWarning = () => {
    // Create a floating toast warning
    if (toastRef.current) return;
    const toast = document.createElement('div');
    toast.id = 'session-timeout-warning';
    toast.innerHTML = `
      <div style="position:fixed;bottom:24px;right:24px;z-index:9999;background:#1e293b;color:#f1f5f9;padding:16px 24px;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.3);display:flex;align-items:center;gap:12px;font-family:system-ui,sans-serif;font-size:14px;border:1px solid #334155;animation:slideUp 0.3s ease-out;">
        <div style="width:8px;height:8px;border-radius:50%;background:#f59e0b;animation:pulse 1s infinite;"></div>
        <span>Session expires in <strong>1 minute</strong>. Move your mouse to stay logged in.</span>
      </div>
      <style>
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      </style>
    `;
    document.body.appendChild(toast);
    toastRef.current = toast;
  };

  const doLogout = () => {
    clearTimers();
    logout();
    window.location.href = '/login';
  };

  const resetTimeout = () => {
    clearTimers();
    if (!user) return;

    // Update last activity timestamp
    localStorage.setItem('sessionStart', Date.now().toString());

    // Set warning (1 min before logout)
    warningRef.current = setTimeout(() => {
      showWarning();
    }, SESSION_TIMEOUT - WARNING_BEFORE);

    // Set logout
    timeoutRef.current = setTimeout(() => {
      doLogout();
    }, SESSION_TIMEOUT);
  };

  useEffect(() => {
    if (!user) return;

    // Check if session already expired (e.g. after page refresh)
    const sessionStart = localStorage.getItem('sessionStart');
    if (sessionStart) {
      const elapsed = Date.now() - parseInt(sessionStart, 10);
      if (elapsed >= SESSION_TIMEOUT) {
        doLogout();
        return;
      }
    }

    // Start fresh timeout
    resetTimeout();

    // Track user activity to reset the timer
    const activities = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click', 'mousemove'];
    const eventListener = () => resetTimeout();
    activities.forEach(activity => document.addEventListener(activity, eventListener, { passive: true }));

    return () => {
      clearTimers();
      activities.forEach(activity => document.removeEventListener(activity, eventListener));
    };
  }, [user]);

  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/search" element={<VerifyPage />} />

          {/* User Protected Routes */}
          <Route element={<UserRoute />}>
              <Route path="/user-dashboard" element={<UserDashboardPage />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<AdminRoute />}>
              <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
              <Route path="/dashboard" element={<AdminDashboardPage />} />
              <Route path="/upload-excel" element={<ExcelUploadPage />} />
          </Route>
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <SessionTimeoutManager />
        <div className="flex flex-col min-h-screen bg-background text-on-surface relative selection:bg-primary-container selection:text-white">
          <CustomCursor />
          <Header />
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
