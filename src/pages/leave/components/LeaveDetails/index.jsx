import React from 'react';
import { XMarkIcon, DocumentIcon, ClockIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function LeaveDetails({ request, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-3xl w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">Détails de la Demande de Congé</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informations principales */}
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-4">Informations Générales</h4>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Employé</dt>
                  <dd className="mt-1 text-sm text-gray-900">{request.employee}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Département</dt>
                  <dd className="mt-1 text-sm text-gray-900">{request.department}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Manager</dt>
                  <dd className="mt-1 text-sm text-gray-900">{request.manager}</dd>
                </div>
              </dl>
            </div>

            {/* Détails du congé */}
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-4">Détails du Congé</h4>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Type de Congé</dt>
                  <dd className="mt-1 text-sm text-gray-900">{request.type}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Période</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    Du {new Date(request.startDate).toLocaleDateString('fr-FR')} au {new Date(request.endDate).toLocaleDateString('fr-FR')}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Durée</dt>
                  <dd className="mt-1 text-sm text-gray-900">{request.duration}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Commentaire */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Commentaire</h4>
            <p className="text-sm text-gray-900 bg-gray-50 rounded-lg p-3">
              {request.comment}
            </p>
          </div>

          {/* Documents joints */}
          {request.documents && request.documents.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Documents Joints</h4>
              <ul className="divide-y divide-gray-200">
                {request.documents.map((doc, index) => (
                  <li key={index} className="py-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <DocumentIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{doc.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{doc.size}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Historique */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-500 mb-2">Historique</h4>
            <div className="flow-root">
              <ul className="-mb-8">
                {request.history.map((event, eventIdx) => (
                  <li key={eventIdx}>
                    <div className="relative pb-8">
                      {eventIdx !== request.history.length - 1 ? (
                        <span
                          className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white">
                            <ClockIcon className="h-5 w-5 text-gray-500" />
                          </span>
                        </div>
                        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                          <div>
                            <p className="text-sm text-gray-500">
                              {event.action} par <span className="font-medium text-gray-900">{event.by}</span>
                            </p>
                            {event.comment && (
                              <p className="mt-1 text-sm text-gray-500">{event.comment}</p>
                            )}
                          </div>
                          <div className="whitespace-nowrap text-right text-sm text-gray-500">
                            {format(new Date(event.date), 'Pp', { locale: fr })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="btn-secondary"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
