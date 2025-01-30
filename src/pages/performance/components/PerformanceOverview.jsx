import React from 'react';
import usePerformanceStore from '../../../store/performanceStore';

export default function PerformanceOverview() {
  const { evaluations, objectives } = usePerformanceStore();

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-uims-red rounded-lg p-5 text-white">
          <h3 className="text-lg font-medium">Score Moyen</h3>
          <p className="mt-2 text-3xl font-bold">4.3/5</p>
          <p className="mt-1 text-sm opacity-80">+0.2 vs période précédente</p>
        </div>
        <div className="bg-uims-red rounded-lg p-5 text-white">
          <h3 className="text-lg font-medium">Objectifs Atteints</h3>
          <p className="mt-2 text-3xl font-bold">75%</p>
          <p className="mt-1 text-sm opacity-80">15 sur 20 objectifs</p>
        </div>
        <div className="bg-uims-red rounded-lg p-5 text-white">
          <h3 className="text-lg font-medium">Évaluations</h3>
          <p className="mt-2 text-3xl font-bold">92%</p>
          <p className="mt-1 text-sm opacity-80">Taux de complétion</p>
        </div>
        <div className="bg-uims-red rounded-lg p-5 text-white">
          <h3 className="text-lg font-medium">Progression</h3>
          <p className="mt-2 text-3xl font-bold">+15%</p>
          <p className="mt-1 text-sm opacity-80">Amélioration globale</p>
        </div>
      </div>

      {/* Statistiques simples au lieu des graphiques pour commencer */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Scores par Compétence
          </h3>
          <div className="space-y-4">
            {['Technique', 'Communication', 'Leadership', 'Travail d\'équipe', 'Innovation'].map((skill) => (
              <div key={skill} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{skill}</span>
                <span className="text-sm font-medium text-gray-900">4.5/5</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Statut des Objectifs
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Complétés</span>
              <span className="text-sm font-medium text-green-600">30%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">En cours</span>
              <span className="text-sm font-medium text-yellow-600">45%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Non commencés</span>
              <span className="text-sm font-medium text-red-600">25%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
