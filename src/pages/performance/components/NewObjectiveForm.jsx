import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import usePerformanceStore from '../../../store/performanceStore';

export default function NewObjectiveForm({ onClose }) {
  const { addObjective } = usePerformanceStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    status: 'In Progress',
    progress: 0,
    priority: 'Medium',
    category: 'Technical'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addObjective(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Nouvel Objectif
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Titre
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date de début
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date d'échéance
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Priorité
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                >
                  <option value="Low">Basse</option>
                  <option value="Medium">Moyenne</option>
                  <option value="High">Haute</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Catégorie
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                >
                  <option value="Technical">Technique</option>
                  <option value="Business">Business</option>
                  <option value="Personal">Personnel</option>
                  <option value="Team">Équipe</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Progression initiale (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => setFormData(prev => ({ ...prev, progress: parseInt(e.target.value) }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-uims-red hover:bg-uims-red/90"
            >
              Créer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
