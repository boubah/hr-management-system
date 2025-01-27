import React, { useState } from 'react';
import { EyeIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';

const initialCandidates = [
  {
    id: 1,
    name: 'Sophie Martin',
    email: 'sophie.martin@email.com',
    position: 'Développeur Full Stack',
    status: 'Nouveau',
    appliedDate: '2024-02-10',
    experience: '5 ans'
  },
  {
    id: 2,
    name: 'Thomas Bernard',
    email: 'thomas.bernard@email.com',
    position: 'Responsable RH',
    status: 'Entretien',
    appliedDate: '2024-02-08',
    experience: '8 ans'
  }
];

const statusStyles = {
  'Nouveau': 'bg-blue-100 text-blue-800',
  'Entretien': 'bg-yellow-100 text-yellow-800',
  'Retenu': 'bg-green-100 text-green-800',
  'Rejeté': 'bg-red-100 text-red-800'
};

export default function CandidateList() {
  const [candidates] = useState(initialCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h3 className="text-lg font-semibold">Liste des Candidats</h3>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                    Candidat
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Poste
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Expérience
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Date de Candidature
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {candidates.map((candidate) => (
                  <tr key={candidate.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                      <div className="font-medium text-gray-900">{candidate.name}</div>
                      <div className="text-gray-500">{candidate.email}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {candidate.position}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {candidate.experience}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {new Date(candidate.appliedDate).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        statusStyles[candidate.status]
                      }`}>
                        {candidate.status}
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button
                        onClick={() => setSelectedCandidate(candidate)}
                        className="text-uims-red hover:text-uims-red/80 mr-4"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <DocumentArrowDownIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
