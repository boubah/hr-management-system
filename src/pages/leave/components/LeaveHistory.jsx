import React from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';

const history = [
  {
    id: 1,
    action: 'Demande créée',
    date: '2024-02-10T09:00:00',
    user: 'Marie Martin',
    details: 'Congés du 15/03/2024 au 20/03/2024',
    type: 'create'
  },
  {
    id: 2,
    action: 'Demande modifiée',
    date: '2024-02-10T10:30:00',
    user: 'Marie Martin',
    details: 'Modification des dates: 16/03/2024 au 21/03/2024',
    type: 'update'
  },
  {
    id: 3,
    action: 'Demande approuvée',
    date: '2024-02-11T14:15:00',
    user: 'Jean Dupont',
    details: 'Approuvé avec commentaire: OK pour ces dates',
    type: 'approve'
  }
];

const actionStyles = {
  create: 'bg-blue-100 text-blue-800',
  update: 'bg-yellow-100 text-yellow-800',
  approve: 'bg-green-100 text-green-800',
  reject: 'bg-red-100 text-red-800'
};

export default function LeaveHistory() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium mb-6">Historique des Modifications</h3>
      
      <div className="flow-root">
        <ul className="-mb-8">
          {history.map((event, eventIdx) => (
            <li key={event.id}>
              <div className="relative pb-8">
                {eventIdx !== history.length - 1 ? (
                  <span
                    className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${actionStyles[event.type]}`}>
                      <ClockIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p className="text-sm text-gray-500">
                        <span className="font-medium text-gray-900">
                          {event.action}
                        </span>{' '}
                        par {event.user}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        {event.details}
                      </p>
                    </div>
                    <div className="whitespace-nowrap text-right text-sm text-gray-500">
                      {new Date(event.date).toLocaleString('fr-FR')}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
