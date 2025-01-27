import React, { useState } from 'react';
import { ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const conflicts = [
  {
    id: 1,
    type: 'Chevauchement',
    employees: ['Marie Martin', 'Jean Dupont'],
    department: 'IT',
    period: '15/03/2024 - 20/03/2024',
    status: 'pending',
    impact: 'high'
  },
  {
    id: 2,
    type: 'Quota Dépassé',
    employees: ['Sophie Bernard'],
    department: 'RH',
    period: '01/04/2024 - 15/04/2024',
    status: 'resolved',
    impact: 'medium'
  }
];

const impactStyles = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800'
};

export default function ConflictManagement() {
  const [selectedConflict, setSelectedConflict] = useState(null);

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-medium">Gestion des Conflits</h3>
            <p className="mt-1 text-sm text-gray-500">
              Gérez les conflits de congés et les chevauchements
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <span className="relative inline-flex rounded-md shadow-sm">
              <button className="btn-primary">
                Vérifier les Conflits
              </button>
            </span>
          </div>
        </div>

        <div className="mt-6">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                    Type
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Employés
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Département
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Période
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Impact
                  </th>
                  <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {conflicts.map((conflict) => (
                  <tr key={conflict.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                      <div className="flex items-center">
                        <ExclamationTriangleIcon
                          className={`h-5 w-5 mr-2 ${
                            conflict.status === 'resolved' ? 'text-green-500' : 'text-red-500'
                          }`}
                        />
                        <span className="font-medium text-gray-900">
                          {conflict.type}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {conflict.employees.join(', ')}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {conflict.department}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {conflict.period}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        impactStyles[conflict.impact]
                      }`}>
                        {conflict.impact.toUpperCase()}
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button
                        onClick={() => setSelectedConflict(conflict)}
                        className="text-uims-red hover:text-uims-red/80"
                      >
                        Résoudre
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedConflict && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 p-6">
            <h3 className="text-lg font-medium mb-4">
              Résolution de Conflit
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Actions Possibles:</h4>
                <div className="mt-2 space-y-2">
                  <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-50">
                    Proposer des dates alternatives
                  </button>
                  <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-50">
                    Diviser la période de congé
                  </button>
                  <button className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-50">
                    Escalader au manager
                  </button>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setSelectedConflict(null)}
                  className="btn-secondary"
                >
                  Fermer
                </button>
                <button className="btn-primary">
                  Appliquer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
