import React, { useState } from 'react';
import { PlusIcon, ClockIcon } from '@heroicons/react/24/outline';
import usePerformanceStore from '../../../store/performanceStore';
import NewObjectiveForm from './NewObjectiveForm';

export default function ObjectivesList() {
  const { objectives } = usePerformanceStore();
  const [showNewObjective, setShowNewObjective] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Objectifs</h3>
        <button
          onClick={() => setShowNewObjective(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-uims-red hover:bg-uims-red/90"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Nouvel Objectif
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {objectives.map((objective) => (
            <li key={objective.id}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">
                      {objective.title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      {objective.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      objective.priority === 'High'
                        ? 'bg-red-100 text-red-800'
                        : objective.priority === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {objective.priority}
                    </span>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      objective.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {objective.status}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block text-uims-red">
                          Progression
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-uims-red">
                          {objective.progress}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-red-100">
                      <div
                        style={{ width: `${objective.progress}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-uims-red"
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <ClockIcon className="h-5 w-5 mr-2" />
                  Échéance : {new Date(objective.dueDate).toLocaleDateString('fr-FR')}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {showNewObjective && (
        <NewObjectiveForm onClose={() => setShowNewObjective(false)} />
      )}
    </div>
  );
}
