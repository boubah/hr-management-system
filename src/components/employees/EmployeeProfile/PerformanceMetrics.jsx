import React, { useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import useEmployeeStore from '../../../store/employeeStore';

export default function PerformanceMetrics({ employeeId }) {
  const { employees, updateEmployee } = useEmployeeStore();
  const employee = employees.find(emp => emp.id === employeeId);
  const [isAddingObjective, setIsAddingObjective] = useState(false);
  const [newObjective, setNewObjective] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'In Progress'
  });

  if (!employee) return null;

  const handleAddObjective = (e) => {
    e.preventDefault();
    const updatedObjectives = [
      ...(employee.performanceMetrics?.objectives || []),
      newObjective
    ];
    updateEmployee(employeeId, {
      performanceMetrics: {
        ...employee.performanceMetrics,
        objectives: updatedObjectives
      }
    });
    setNewObjective({
      title: '',
      description: '',
      dueDate: '',
      status: 'In Progress'
    });
    setIsAddingObjective(false);
  };

  const handleUpdateObjectiveStatus = (index, newStatus) => {
    const updatedObjectives = employee.performanceMetrics.objectives.map((obj, i) => 
      i === index ? { ...obj, status: newStatus } : obj
    );
    updateEmployee(employeeId, {
      performanceMetrics: {
        ...employee.performanceMetrics,
        objectives: updatedObjectives
      }
    });
  };

  const handleRemoveObjective = (index) => {
    const updatedObjectives = employee.performanceMetrics.objectives.filter((_, i) => i !== index);
    updateEmployee(employeeId, {
      performanceMetrics: {
        ...employee.performanceMetrics,
        objectives: updatedObjectives
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Vue d'ensemble</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <dt className="text-sm font-medium text-gray-500">Dernière évaluation</dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">
              {new Date(employee.performanceMetrics?.lastReviewDate).toLocaleDateString('fr-FR')}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Note globale</dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">
              {employee.performanceMetrics?.rating}/5
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Objectifs atteints</dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">
              {employee.performanceMetrics?.objectives?.filter(obj => obj.status === 'Completed').length || 0}/
              {employee.performanceMetrics?.objectives?.length || 0}
            </dd>
          </div>
        </div>
      </div>

      {/* Objectives */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Objectifs</h3>
          <button
            onClick={() => setIsAddingObjective(true)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-uims-red hover:bg-uims-red/90"
          >
            <PlusIcon className="h-4 w-4 mr-1" />
            Ajouter un objectif
          </button>
        </div>

        <div className="space-y-4">
          {employee.performanceMetrics?.objectives?.map((objective, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-4 relative hover:shadow-sm transition-shadow"
            >
              <button
                onClick={() => handleRemoveObjective(index)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-600"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">{objective.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{objective.description}</p>
                </div>
                <div className="sm:text-right">
                  <select
                    value={objective.status}
                    onChange={(e) => handleUpdateObjectiveStatus(index, e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 text-sm focus:border-uims-red focus:ring-uims-red"
                  >
                    <option value="Not Started">Non commencé</option>
                    <option value="In Progress">En cours</option>
                    <option value="Completed">Terminé</option>
                  </select>
                  <p className="text-sm text-gray-500 mt-2">
                    Échéance : {new Date(objective.dueDate).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Objective Modal */}
      {isAddingObjective && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Nouvel Objectif</h3>
              <button
                onClick={() => setIsAddingObjective(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleAddObjective} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Titre
                </label>
                <input
                  type="text"
                  value={newObjective.title}
                  onChange={(e) => setNewObjective(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={newObjective.description}
                  onChange={(e) => setNewObjective(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date d'échéance
                </label>
                <input
                  type="date"
                  value={newObjective.dueDate}
                  onChange={(e) => setNewObjective(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddingObjective(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-uims-red hover:bg-uims-red/90"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
