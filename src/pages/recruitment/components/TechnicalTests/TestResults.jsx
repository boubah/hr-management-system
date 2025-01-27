import React, { useState } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import TestScoring from './TestScoring';

export default function TestResults({ results }) {
  const [selectedResult, setSelectedResult] = useState(null);

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h3 className="text-lg font-semibold">Résultats des Tests</h3>
          <p className="mt-2 text-sm text-gray-700">
            Historique des tests passés et leurs résultats
          </p>
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
                    Test
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Score
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
                {results.map((result) => (
                  <tr key={result.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={result.candidate.photo}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {result.candidate.name}
                          </div>
                          <div className="text-gray-500">
                            {result.candidate.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {result.test.title}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {format(new Date(result.date), 'Pp', { locale: fr })}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                      {result.score}%
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                        result.passed
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {result.passed ? 'Réussi' : 'Échoué'}
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button
                        onClick={() => setSelectedResult(result)}
                        className="text-uims-red hover:text-uims-red/80"
                      >
                        Voir détails
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedResult && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <TestScoring
                testResult={selectedResult}
                test={selectedResult.test}
              />
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedResult(null)}
                  className="btn-secondary"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
