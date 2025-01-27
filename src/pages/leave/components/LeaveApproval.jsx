import React from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function LeaveApproval({ request, onApprove, onReject }) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">Validation de la Demande de Congé</h3>
        </div>

        <div className="p-4">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Employé</dt>
              <dd className="mt-1 text-sm text-gray-900">{request.employee}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Type de Congé</dt>
              <dd className="mt-1 text-sm text-gray-900">{request.type}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Période</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(request.startDate).toLocaleDateString('fr-FR')} - 
                {new Date(request.endDate).toLocaleDateString('fr-FR')}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Durée</dt>
              <dd className="mt-1 text-sm text-gray-900">{request.duration}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Commentaire</dt>
              <dd className="mt-1 text-sm text-gray-900">{request.comment}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">
              Commentaire du Manager
            </label>
            <textarea
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
              placeholder="Ajoutez un commentaire..."
            />
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onReject}
              className="inline-flex items-center px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-50"
            >
              <XMarkIcon className="h-5 w-5 mr-2" />
              Refuser
            </button>
            <button
              onClick={onApprove}
              className="inline-flex items-center px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50"
            >
              <CheckIcon className="h-5 w-5 mr-2" />
              Approuver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
