import React, { useState } from 'react';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';

export default function LeaveExport() {
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [format, setFormat] = useState('excel');
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      // Simulation d'export
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Exporting...', { dateRange, format });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-medium mb-4">Exporter les Données</h3>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date de début
          </label>
          <input
            type="date"
            value={dateRange.startDate}
            onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date de fin
          </label>
          <input
            type="date"
            value={dateRange.endDate}
            onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Format
          </label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
          >
            <option value="excel">Excel</option>
            <option value="pdf">PDF</option>
            <option value="csv">CSV</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleExport}
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center"
          >
            <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
            {loading ? 'Export en cours...' : 'Exporter'}
          </button>
        </div>
      </div>
    </div>
  );
}
