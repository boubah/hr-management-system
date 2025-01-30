import React from 'react';
import { Menu } from '@headlessui/react';
import {
  AdjustmentsHorizontalIcon,
  ArrowDownTrayIcon,
  ChartBarIcon,
  TableCellsIcon,
} from '@heroicons/react/24/outline';
import useDashboardStore from '../../store/dashboardStore';

const dateRangeOptions = [
  { value: 'today', label: "Aujourd'hui" },
  { value: 'week', label: 'Cette semaine' },
  { value: 'month', label: 'Ce mois' },
  { value: 'quarter', label: 'Ce trimestre' },
  { value: 'year', label: "Cette année" },
];

const departmentOptions = [
  { value: 'all', label: 'Tous les départements' },
  { value: 'tech', label: 'Technologie' },
  { value: 'hr', label: 'Ressources Humaines' },
  { value: 'sales', label: 'Commercial' },
  { value: 'finance', label: 'Finance' },
];

export default function DashboardHeader() {
  const { filters, setFilter, preferences, setPreference } = useDashboardStore();

  const handleExport = (format) => {
    console.log(`Exporting in ${format} format`);
  };

  return (
    <div className="mb-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-uims-black">Tableau de Bord</h1>
          <p className="mt-2 text-sm text-gray-600">
            Vue d'ensemble des indicateurs clés de performance
          </p>
        </div>
        <div className="mt-4 flex space-x-3 sm:mt-0">
          <Menu as="div" className="relative">
            <Menu.Button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-uims-red">
              <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
              Filtres
            </Menu.Button>
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Période
                  </label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => setFilter('dateRange', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:border-uims-red focus:ring-uims-red"
                  >
                    {dateRangeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Département
                  </label>
                  <select
                    value={filters.department}
                    onChange={(e) => setFilter('department', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:border-uims-red focus:ring-uims-red"
                  >
                    {departmentOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Menu.Items>
          </Menu>

          <Menu as="div" className="relative">
            <Menu.Button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-uims-red">
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              Exporter
            </Menu.Button>
            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleExport('excel')}
                      className={`${
                        active ? 'bg-gray-50 text-uims-red' : 'text-gray-700'
                      } block px-4 py-2 text-sm w-full text-left`}
                    >
                      Excel
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleExport('pdf')}
                      className={`${
                        active ? 'bg-gray-50 text-uims-red' : 'text-gray-700'
                      } block px-4 py-2 text-sm w-full text-left`}
                    >
                      PDF
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>

          <div className="flex rounded-md shadow-sm">
            <button
              onClick={() => setPreference('layout', 'grid')}
              className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-medium ring-1 ring-inset ring-gray-300 focus:z-10 ${
                preferences.layout === 'grid'
                  ? 'bg-uims-red text-white hover:bg-uims-red/90'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ChartBarIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => setPreference('layout', 'table')}
              className={`relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-medium ring-1 ring-inset ring-gray-300 focus:z-10 ${
                preferences.layout === 'table'
                  ? 'bg-uims-red text-white hover:bg-uims-red/90'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <TableCellsIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
