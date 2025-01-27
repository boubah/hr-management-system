import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/employees/EmployeeList';
import EmployeeDetail from './pages/employees/EmployeeDetail';
import LeaveManagement from './pages/leave/LeaveManagement';
import Recruitment from './pages/recruitment/Recruitment';
import Performance from './pages/performance/Performance';
import Payroll from './pages/payroll/Payroll';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path="employees/:id" element={<EmployeeDetail />} />
          <Route path="leave" element={<LeaveManagement />} />
          <Route path="recruitment" element={<Recruitment />} />
          <Route path="performance" element={<Performance />} />
          <Route path="payroll" element={<Payroll />} />
        </Route>
      </Routes>
    </Router>
  );
}
