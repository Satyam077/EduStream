import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

// Auth
import { useAuth } from './context/AuthContext';
import { canAccess, getDefaultRoute } from './config/roleConfig';

// Layout Components
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';

// Pages
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Attendance from './pages/Attendance';
import LeaveManagement from './pages/LeaveManagement';
import Exams from './pages/Exams';
import FeeManagement from './pages/FeeManagement';
import FeePayment from './pages/FeePayment';
import Events from './pages/Events';
import Notifications from './pages/Notifications';
import Timetable from './pages/Timetable';
import Library from './pages/Library';
import Transport from './pages/Transport';
import ParentPortal from './pages/ParentPortal';
import Complaints from './pages/Complaints';
import Roles from './pages/Roles';
import AuditLogs from './pages/AuditLogs';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Login from './pages/Login';

// Route guard component
function ProtectedRoute({ path, children }) {
  const { user } = useAuth();
  if (!user || !canAccess(user.role, path)) {
    return <Navigate to={getDefaultRoute(user?.role || 'admin')} replace />;
  }
  return children;
}

// All app routes with their allowed paths
const appRoutes = [
  { path: '/', element: <Dashboard /> },
  { path: '/students', element: <Students /> },
  { path: '/teachers', element: <Teachers /> },
  { path: '/attendance', element: <Attendance /> },
  { path: '/leaves', element: <LeaveManagement /> },
  { path: '/exams', element: <Exams /> },
  { path: '/fees', element: <FeeManagement /> },
  { path: '/fee-payment', element: <FeePayment /> },
  { path: '/events', element: <Events /> },
  { path: '/notifications', element: <Notifications /> },
  { path: '/timetable', element: <Timetable /> },
  { path: '/library', element: <Library /> },
  { path: '/transport', element: <Transport /> },
  { path: '/parent-portal', element: <ParentPortal /> },
  { path: '/complaints', element: <Complaints /> },
  { path: '/roles', element: <Roles /> },
  { path: '/audit-logs', element: <AuditLogs /> },
  { path: '/settings', element: <Settings /> },
  { path: '/profile', element: <Profile /> },
];

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();

  const toggleSidebar = () => setSidebarCollapsed(prev => !prev);

  if (!isLoggedIn) {
    return <Login />;
  }

  const defaultRoute = getDefaultRoute(user.role);

  return (
    <div className="app-layout">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} userRole={user.role} />
      <div className={`main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Navbar onToggleSidebar={toggleSidebar} onLogout={logout} />
        <div className="page-content">
          <Routes>
            {appRoutes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRoute path={route.path}>
                    {route.element}
                  </ProtectedRoute>
                }
              />
            ))}
            <Route path="*" element={<Navigate to={defaultRoute} replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
