import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import usePerformanceStore from '../../../store/performanceStore';
import NewEvaluationForm from './NewEvaluationForm';

export default function EvaluationsList() {
  const { evaluations } = usePerformanceStore();
  const [showNewEvaluation, setShowNewEvaluation] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Évaluations</h3>
        <button
          onClick={() => setShowNewEvaluation(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-uims-red hover:bg-uims-red/90"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Nouvelle Évaluation
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {evaluations.map((evaluation) => (
            <li key={evaluation.id}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-full bg-uims-red text-white flex items-center justify-center text-xl font-bold">
                        {evaluation.rating}
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">
                        Évaluation {evaluation.type}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {new Date(evaluation.date).toLocaleDateString('fr-FR')} • 
                        Évaluateur: {evaluation.evaluator}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      evaluation.status === 'Complété'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {evaluation.status}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    {Object.entries(evaluation.competencies).map(([key, value]) => (
                      <div key={key}>
                        <dt className="text-sm font-medium text-gray-500 capitalize">
                          {key}
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {value}/5
                        </dd>
                      </div>
                    ))}
                  </div>
                </div>

                {evaluation.comments && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      {evaluation.comments}
                    </p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showNewEvaluation && (
        <NewEvaluationForm
          onClose={() => setShowNewEvaluation(false)}
        />
      )}
    </div>
  );
}
