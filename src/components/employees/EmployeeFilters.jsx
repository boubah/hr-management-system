import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import useEmployeeStore from '../../store/employeeStore';

const departments = [
  'Tous',
  'Technologie',
  'Ressources Humaines',
  'Finance',
  'Marketing',
  'Commercial'
];

const statuses = [
  'Tous',
  'Actif',
  'Inactif'
];

export default function EmployeeFilters({ onClose }) {
  const { filters, setFilters } = useEmployeeStore();

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Filtres</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Département
            </label>
            <select
              value={filters.department}
              onChange={(e) => setFilters({ department: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept.toLowerCase()}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ status: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
            >
              {statuses.map((status) => (
                <option key={status} value={status.toLowerCase()}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Recherche
            </label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
              placeholder="Nom, email, poste..."
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
