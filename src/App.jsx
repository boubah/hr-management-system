import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import Layout from './components/Layout';
import LoginPage from './pages/auth/LoginPage';
import UnauthorizedPage from './pages/auth/UnauthorizedPage';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/employees/EmployeeList';
import EmployeeDetail from './pages/employees/EmployeeDetail';
import LeaveManagement from './pages/leave/LeaveManagement';
import Recruitment from './pages/recruitment/Recruitment';
import Performance from './pages/performance/Performance';
import Payroll from './pages/payroll/Payroll';
import { ROLES } from './auth/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          <Route element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            
            {/* Routes accessibles aux RH uniquement */}
            <Route element={
              <ProtectedRoute roles={[ROLES.ADMIN]}>
                <Outlet />
              </ProtectedRoute>
            }>
              <Route path="recruitment/*" element={<Recruitment />} />
              <Route path="employees" element={<EmployeeList />} />
              <Route path="employees/:id" element={<EmployeeDetail />} />
              <Route path="payroll" element={<Payroll />} />
            </Route>

            {/* Routes accessibles aux RH et managers */}
            <Route element={
              <ProtectedRoute roles={[ROLES.ADMIN, ROLES.MANAGER]}>
                <Outlet />
              </ProtectedRoute>
            }>
              <Route path="performance" element={<Performance />} />
            </Route>

            {/* Routes accessibles à tous les utilisateurs connectés */}
            <Route path="leave" element={<LeaveManagement />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
