import React, { useState, useEffect } from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import EmployeeMetrics from '../components/dashboard/widgets/EmployeeMetrics';
import LeaveMetrics from '../components/dashboard/widgets/LeaveMetrics';
import RecruitmentMetrics from '../components/dashboard/widgets/RecruitmentMetrics';
import PerformanceMetrics from '../components/dashboard/widgets/PerformanceMetrics';
import useDashboardStore from '../store/dashboardStore';

export default function Dashboard() {
  const { preferences, filters } = useDashboardStore();
  const [activeWidget, setActiveWidget] = useState('employees');

  useEffect(() => {
    const interval = setInterval(() => {
      // Refresh data logic here
    }, preferences.refreshInterval);

    return () => clearInterval(interval);
  }, [preferences.refreshInterval]);

  const renderWidget = () => {
    switch (activeWidget) {
      case 'employees':
        return <EmployeeMetrics />;
      case 'leaves':
        return <LeaveMetrics />;
      case 'recruitment':
        return <RecruitmentMetrics />;
      case 'performance':
        return <PerformanceMetrics />;
      default:
        return <EmployeeMetrics />;
    }
  };

  return (
    <div className="space-y-6">
      <DashboardHeader />

      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-4" aria-label="Tabs">
            {[
              { id: 'employees', name: 'Employés' },
              { id: 'leaves', name: 'Congés' },
              { id: 'recruitment', name: 'Recrutement' },
              { id: 'performance', name: 'Performance' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveWidget(tab.id)}
                className={`${
                  activeWidget === tab.id
                    ? 'border-uims-red text-uims-red'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors duration-200`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <div className="bg-gray-50 rounded-lg">
            {renderWidget()}
          </div>
        </div>
      </div>
    </div>
  );
}
