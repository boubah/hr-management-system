import React, { useState } from 'react';
import { ChartBarIcon, TableCellsIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

const reportTypes = [
  {
    id: 'summary',
    name: 'Synthèse des Congés',
    description: 'Vue d\'ensemble des congés par département',
    icon: ChartBarIcon
  },
  {
    id: 'detailed',
    name: 'Rapport Détaillé',
    description: 'Analyse détaillée par employé',
    icon: TableCellsIcon
  },
  {
    id: 'custom',
    name: 'Rapport Personnalisé',
    description: 'Créez votre propre rapport',
    icon: AdjustmentsHorizontalIcon
  }
];

export default function CustomReports() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    department: '',
    type: ''
  });

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium mb-6">Rapports Personnalisés</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {reportTypes.map((type) => (
            <div
              key={type.id}
              onClick={() => setSelectedReport(type.id)}
              className={`relative rounded-lg border p-4 cursor-pointer hover:border-uims-red ${
                selectedReport === type.id ? 'border-uims-red bg-uims-red/5' : 'border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <type.icon className="h-6 w-6 text-uims-red" />
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{type.name}</h4>
                  <p className="mt-1 text-xs text-gray-500">{type.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedReport && (
          <div className="mt-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date de début
                </label>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date de fin
                </label>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Département
                </label>
                <select
                  value={filters.department}
                  onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                >
                  <option value="">Tous les départements</option>
                  <option value="it">IT</option>
                  <option value="hr">RH</option>
                  <option value="finance">Finance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type de Congé
                </label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                >
                  <option value="">Tous les types</option>
                  <option value="paid">Congés Payés</option>
                  <option value="sick">Maladie</option>
                  <option value="unpaid">Sans Solde</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button className="btn-secondary">
                Réinitialiser
              </button>
              <button className="btn-primary">
                Générer le Rapport
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
