import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import usePerformanceStore from '../../../store/performanceStore';

export default function NewEvaluationForm({ onClose }) {
  const { addEvaluation } = usePerformanceStore();
  const [formData, setFormData] = useState({
    type: 'Annuelle',
    employeeId: '',
    date: new Date().toISOString().split('T')[0],
    rating: '',
    evaluator: '',
    status: 'En cours',
    competencies: {
      technical: 0,
      communication: 0,
      leadership: 0,
      teamwork: 0,
      innovation: 0
    },
    comments: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvaluation(formData);
    onClose();
  };

  const handleCompetencyChange = (competency, value) => {
    setFormData(prev => ({
      ...prev,
      competencies: {
        ...prev.competencies,
        [competency]: Number(value)
      }
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Nouvelle Évaluation
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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type d'évaluation
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                >
                  <option value="Annuelle">Annuelle</option>
                  <option value="Semestrielle">Semestrielle</option>
                  <option value="Trimestrielle">Trimestrielle</option>
                  <option value="Projet">Projet</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employé
                </label>
                <input
                  type="text"
                  value={formData.employeeId}
                  onChange={(e) => setFormData(prev => ({ ...prev, employeeId: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                  placeholder="Nom de l'employé"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Évaluateur
                </label>
                <input
                  type="text"
                  value={formData.evaluator}
                  onChange={(e) => setFormData(prev => ({ ...prev, evaluator: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                  placeholder="Nom de l'évaluateur"
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Compétences</h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {Object.entries(formData.competencies).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {key}
                    </label>
                    <select
                      value={value}
                      onChange={(e) => handleCompetencyChange(key, e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                    >
                      {[0, 1, 2, 3, 4, 5].map((rating) => (
                        <option key={rating} value={rating}>{rating}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Commentaires
              </label>
              <textarea
                value={formData.comments}
                onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                placeholder="Commentaires et observations..."
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
