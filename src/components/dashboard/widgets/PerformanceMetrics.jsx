import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  StarIcon,
  ChartBarIcon,
  DocumentCheckIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { defaultOptions, chartColors } from '../ChartConfig';
import StatCard from './StatCard';

const performanceStats = [
  {
    name: 'Score Moyen',
    value: '8.2/10',
    change: '+0.5',
    icon: StarIcon,
  },
  {
    name: 'Évaluations Complétées',
    value: '85%',
    change: '+10%',
    icon: DocumentCheckIcon,
  },
  {
    name: 'Objectifs Atteints',
    value: '78%',
    change: '+5%',
    icon: ChartBarIcon,
  },
  {
    name: 'Prochaine Revue',
    value: '15j',
    change: '-5j',
    icon: ClockIcon,
  },
];

const ratingDistribution = {
  labels: ['Excellent', 'Très Bien', 'Bien', 'À améliorer', 'Insuffisant'],
  datasets: [
    {
      data: [25, 45, 35, 15, 5],
      backgroundColor: chartColors.primary,
    },
  ],
};

const skillsData = {
  labels: ['Leadership', 'Communication', 'Technique', 'Innovation', 'Collaboration'],
  datasets: [
    {
      label: 'Score Moyen',
      data: [8.5, 7.8, 8.2, 7.5, 8.8],
      backgroundColor: chartColors.primary[0],
    },
    {
      label: 'Objectif',
      data: [9, 8, 8.5, 8, 9],
      backgroundColor: chartColors.secondary[0],
    },
  ],
};

export default function PerformanceMetrics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {performanceStats.map((stat) => (
          <StatCard key={stat.name} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-medium text-uims-black mb-4">
            Distribution des Évaluations
          </h3>
          <div className="h-64">
            <Doughnut data={ratingDistribution} options={defaultOptions} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-medium text-uims-black mb-4">
            Scores par Compétence
          </h3>
          <div className="h-64">
            <Bar data={skillsData} options={defaultOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
