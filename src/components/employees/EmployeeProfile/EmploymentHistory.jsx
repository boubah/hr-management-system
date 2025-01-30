import React, { useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import useEmployeeStore from '../../../store/employeeStore';

export default function EmploymentHistory({ employeeId }) {
  const { employees, updateEmployee } = useEmployeeStore();
  const employee = employees.find(emp => emp.id === employeeId);
  const [isAdding, setIsAdding] = useState(false);
  const [newPosition, setNewPosition] = useState({
    title: '',
    department: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  if (!employee) return null;

  const handleAddPosition = (e) => {
    e.preventDefault();
    const updatedHistory = [...(employee.employmentHistory || []), newPosition];
    updateEmployee(employeeId, { employmentHistory: updatedHistory });
    setNewPosition({
      title: '',
      department: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    setIsAdding(false);
  };

  const handleRemovePosition = (index) => {
    const updatedHistory = employee.employmentHistory.filter((_, i) => i !== index);
    updateEmployee(employeeId, { employmentHistory: updatedHistory });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Historique des Postes</h3>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-uims-red hover:bg-uims-red/90"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          Ajouter un poste
        </button>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Nouveau Poste</h3>
              <button
                onClick={() => setIsAdding(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleAddPosition} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Titre du poste
                  </label>
                  <input
                    type="text"
                    value={newPosition.title}
                    onChange={(e) => setNewPosition(prev => ({ ...prev, title: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Département
                  </label>
                  <input
                    type="text"
                    value={newPosition.department}
                    onChange={(e) => setNewPosition(prev => ({ ...prev, department: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date de début
                  </label>
                  <input
                    type="date"
                    value={newPosition.startDate}
                    onChange={(e) => setNewPosition(prev => ({ ...prev, startDate: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date de fin
                  </label>
                  <input
                    type="date"
                    value={newPosition.endDate}
                    onChange={(e) => setNewPosition(prev => ({ ...prev, endDate: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={newPosition.description}
                  onChange={(e) => setNewPosition(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
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

      <div className="space-y-4">
        {employee.employmentHistory?.map((position, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-4 relative hover:shadow-sm transition-shadow"
          >
            <button
              onClick={() => handleRemovePosition(index)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-600"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-lg font-medium text-gray-900">{position.title}</h4>
                <p className="text-sm text-gray-500">{position.department}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-sm text-gray-500">
                  {new Date(position.startDate).toLocaleDateString('fr-FR')} - 
                  {position.endDate 
                    ? new Date(position.endDate).toLocaleDateString('fr-FR')
                    : 'Présent'}
                </p>
              </div>
            </div>

            {position.description && (
              <p className="mt-2 text-sm text-gray-600">{position.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
