import React, { useState } from 'react';
import { XMarkIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

const evaluationCriteria = [
  { id: 'technical', name: 'Compétences Techniques' },
  { id: 'communication', name: 'Communication' },
  { id: 'experience', name: 'Expérience' },
  { id: 'cultural', name: 'Adéquation Culturelle' },
  { id: 'motivation', name: 'Motivation' }
];

export default function EvaluationForm({ candidate, onClose }) {
  const [ratings, setRatings] = useState({});
  const [comments, setComments] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const handleRating = (criteriaId, rating) => {
    setRatings(prev => ({
      ...prev,
      [criteriaId]: rating
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour sauvegarder l'évaluation
    console.log('Evaluation submitted:', { ratings, comments, recommendation });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">Évaluation du Candidat</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-6">
            {/* Critères d'évaluation */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">
                Évaluation des Critères
              </h4>
              <div className="space-y-4">
                {evaluationCriteria.map((criteria) => (
                  <div key={criteria.id} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{criteria.name}</span>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          className="p-1"
                          onClick={() => handleRating(criteria.id, rating)}
                        >
                          {rating <= (ratings[criteria.id] || 0) ? (
                            <StarIconSolid className="h-5 w-5 text-yellow-400" />
                          ) : (
                            <StarIcon className="h-5 w-5 text-gray-300" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Commentaires détaillés */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Commentaires Détaillés
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                placeholder="Points forts, axes d'amélioration, observations..."
              />
            </div>

            {/* Recommandation */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Recommandation
              </label>
              <div className="mt-2 space-y-2">
                {['Très favorable', 'Favorable', 'Réserves', 'Défavorable'].map((rec) => (
                  <label key={rec} className="flex items-center">
                    <input
                      type="radio"
                      name="recommendation"
                      value={rec}
                      checked={recommendation === rec}
                      onChange={(e) => setRecommendation(e.target.value)}
                      className="h-4 w-4 border-gray-300 text-uims-red focus:ring-uims-red"
                    />
                    <span className="ml-2 text-sm text-gray-700">{rec}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
