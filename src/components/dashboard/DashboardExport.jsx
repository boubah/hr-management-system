import React, { useState } from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

export default function DashboardExport({ data, format = 'excel' }) {
  const [isExporting, setIsExporting] = useState(false);

  const formatData = () => {
    // Format data based on export type
    switch (format) {
      case 'excel':
        return {
          sheets: [
            {
              name: 'Overview',
              data: [
                ['Metric', 'Value', 'Change'],
                ['Total Employees', data.employees.total, '+12%'],
                ['Pending Leaves', data.leaves.pending, '+4'],
                ['Open Positions', data.recruitment.openPositions, '+3'],
                ['Average Performance', data.performance.avgScore, '+0.5']
              ]
            }
          ]
        };
      case 'pdf':
        return {
          title: 'Dashboard Report',
          date: new Date().toLocaleDateString(),
          sections: [
            {
              title: 'Key Metrics',
              data: data
            }
          ]
        };
      default:
        return data;
    }
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const formattedData = formatData();
      // Export logic would go here
      console.log('Exporting:', formattedData);
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-uims-red hover:bg-uims-red/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-uims-red"
    >
      <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
      {isExporting ? 'Exporting...' : 'Export'}
    </button>
  );
}
