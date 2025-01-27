import React from 'react';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

const requests = [
  {
    id: 1,
    type: 'Congés Payés',
    startDate: '2024-02-15',
    endDate: '2024-02-20',
    status: 'En Attente',
    duration: '5 jours',
    employee: 'Jean Dupont',
    comment: 'Vacances en famille'
  },
  {
    id: 2,
    type: 'Maladie',
    startDate: '2024-02-10',
    endDate: '2024-02-12',
    status: 'Approuvé',
    duration: '2 jours',
    employee: 'Marie Martin',
    comment: 'Certificat médical fourni'
  }
];

const statusStyles = {
  'En Attente': 'bg-yellow-100 text-yellow-800',
  'Approuvé': 'bg-green-100 text-green-800',
  'Refusé': 'bg-red-100 text-red-800'
};

const statusIcons = {
  'En Attente': ClockIcon,
  'Approuvé': CheckCircleIcon,
  'Refusé': XCircleIcon
};

export default function LeaveRequests() {
  return (
    <div className="overflow-hidden">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h3 className="text-lg font-semibold">Demandes de Congés</h3>
        </div>
      </div>
      <div className="mt-6 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                    Employé
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Type
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Période
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Durée
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {requests.map((request) => {
                  const StatusIcon = statusIcons[request.status];
                  return (
                    <tr key={request.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                        {request.employee}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {request.type}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(request.startDate).toLocaleDateString('fr-FR')} - {new Date(request.endDate).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {request.duration}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${statusStyles[request.status]}`}>
                          <StatusIcon className="mr-1.5 h-4 w-4" />
                          {request.status}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button className="text-uims-red hover:text-uims-red/80 mr-4">
                          Détails
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
