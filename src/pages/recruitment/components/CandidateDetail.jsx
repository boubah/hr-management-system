import React, { useState } from 'react';
import { XMarkIcon, DocumentTextIcon, PaperClipIcon } from '@heroicons/react/24/outline';
import InterviewScheduler from './InterviewScheduler';
import EvaluationForm from './EvaluationForm';

const statusOptions = [
  { id: 'nouveau', name: 'Nouveau', color: 'bg-blue-100 text-blue-800' },
  { id: 'entretien', name: 'Entretien', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'retenu', name: 'Retenu', color: 'bg-green-100 text-green-800' },
  { id: 'rejeté', name: 'Rejeté', color: 'bg-red-100 text-red-800' }
];

export default function CandidateDetail({ candidate, onClose, onUpdateStatus }) {
  const [showScheduler, setShowScheduler] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(candidate.status);

  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    onUpdateStatus(candidate.id, newStatus);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">Détails du Candidat</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Informations principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium mb-4">Informations Personnelles</h4>
              <dl className="grid grid-cols-1 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Nom complet</dt>
                  <dd className="mt-1 text-sm text-gray-900">{candidate.name}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900">{candidate.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Téléphone</dt>
                  <dd className="mt-1 text-sm text-gray-900">{candidate.phone || 'Non renseigné'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Expérience</dt>
                  <dd className="mt-1 text-sm text-gray-900">{candidate.experience}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Candidature</h4>
              <dl className="grid grid-cols-1 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Poste</dt>
                  <dd className="mt-1 text-sm text-gray-900">{candidate.position}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Date de candidature</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {new Date(candidate.appliedDate).toLocaleDateString('fr-FR')}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1">
                    <select
                      value={currentStatus}
                      onChange={(e) => handleStatusChange(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                    >
                      {statusOptions.map((status) => (
                        <option key={status.id} value={status.name}>
                          {status.name}
                        </option>
                      ))}
                    </select>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Documents */}
          <div className="mt-8">
            <h4 className="text-lg font-medium mb-4">Documents</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <DocumentTextIcon className="h-8 w-8 text-gray-400" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">CV</p>
                    <p className="text-sm text-gray-500">PDF, 2.4 MB</p>
                  </div>
                </div>
                <button className="text-uims-red hover:text-uims-red/80">
                  <PaperClipIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <DocumentTextIcon className="h-8 w-8 text-gray-400" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Lettre de motivation</p>
                    <p className="text-sm text-gray-500">PDF, 1.2 MB</p>
                  </div>
                </div>
                <button className="text-uims-red hover:text-uims-red/80">
                  <PaperClipIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => setShowScheduler(true)}
              className="btn-primary"
            >
              Planifier un Entretien
            </button>
            <button
              onClick={() => setShowEvaluation(true)}
              className="btn-secondary"
            >
              Ajouter une Évaluation
            </button>
          </div>

          {/* Notes et commentaires */}
          <div className="mt-8">
            <h4 className="text-lg font-medium mb-4">Notes et Commentaires</h4>
            <textarea
              rows={4}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
              placeholder="Ajouter une note..."
            />
          </div>
        </div>
      </div>

      {showScheduler && (
        <InterviewScheduler
          candidate={candidate}
          onClose={() => setShowScheduler(false)}
        />
      )}

      {showEvaluation && (
        <EvaluationForm
          candidate={candidate}
          onClose={() => setShowEvaluation(false)}
        />
      )}
    </div>
  );
}
