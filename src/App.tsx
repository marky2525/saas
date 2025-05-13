import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Company Dashboard Pages
const ModuleLibrary = React.lazy(() => import('./pages/dashboard/company/ModuleLibrary'));
const Reports = React.lazy(() => import('./pages/dashboard/company/Reports'));
const TeamManagement = React.lazy(() => import('./pages/dashboard/company/TeamManagement'));
const Security = React.lazy(() => import('./pages/dashboard/company/Security'));

// Public Pages
import Home from './pages/public/Home';
import Login from './pages/auth/Login';

// Company Dashboard Pages
import CompanyDashboard from './pages/dashboard/company/Dashboard';

// SuperAdmin Dashboard Pages
import SuperAdminDashboard from './pages/dashboard/superadmin/Dashboard';
import ModuleManager from './pages/superadmin/ModuleManager';
import CompanyMonitor from './pages/superadmin/CompanyMonitor';
import UserManager from './pages/superadmin/UserManager';
import RequestCenter from './pages/superadmin/RequestCenter';
import AnalyticsAI from './pages/superadmin/AnalyticsAI';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            {/* Add other public routes as needed */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>

          {/* Company Dashboard Routes */}
          <Route path="/" element={<DashboardLayout />}>
            <Route path="dashboard" element={<CompanyDashboard />} />
            <Route 
              path="modules" 
              element={
                <Suspense fallback={<div className="flex items-center justify-center h-full p-4">Loading...</div>}>
                  <ModuleLibrary />
                </Suspense>
              } 
            />
            <Route 
              path="reports" 
              element={
                <Suspense fallback={<div className="flex items-center justify-center h-full p-4">Loading...</div>}>
                  <Reports />
                </Suspense>
              } 
            />
            <Route 
              path="team" 
              element={
                <Suspense fallback={<div className="flex items-center justify-center h-full p-4">Loading...</div>}>
                  <TeamManagement />
                </Suspense>
              } 
            />
            <Route 
              path="settings" 
              element={
                <Suspense fallback={<div className="flex items-center justify-center h-full p-4">Loading...</div>}>
                  <Security />
                </Suspense>
              } 
            />
            {/* Add other company dashboard routes as needed */}
          </Route>

          {/* SuperAdmin Dashboard Routes */}
          <Route path="/admin" element={<DashboardLayout />}>
            <Route path="dashboard" element={<SuperAdminDashboard />} />
            <Route path="modules" element={<ModuleManager />} />
            <Route path="companies" element={<CompanyMonitor />} />
            <Route path="users" element={<UserManager />} />
            <Route path="requests" element={<RequestCenter />} />
            <Route path="analytics" element={<AnalyticsAI />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;