import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  UserGroupIcon,
  BriefcaseIcon,
  DocumentCheckIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { defaultOptions, stackedOptions, chartColors } from '../ChartConfig';
import StatCard from './StatCard';

const recruitmentStats = [
  {
    name: 'Candidatures Totales',
    value: '245',
    change: '+18%',
    icon: UserGroupIcon,
  },
  {
    name: 'Postes Ouverts',
    value: '15',
    change: '+3',
    icon: BriefcaseIcon,
  },
  {
    name: 'Taux de Conversion',
    value: '12%',
    change: '+2%',
    icon: DocumentCheckIcon,
  },
  {
    name: 'Temps Moyen',
    value: '35j',
    change: '-5j',
    icon: ClockIcon,
  },
];

const sourceData = {
  labels: ['LinkedIn', 'Site Web', 'Indeed', 'Référencement', 'Autres'],
  datasets: [
    {
      data: [85, 45, 35, 25, 15],
      backgroundColor: chartColors.primary,
    },
  ],
};

const pipelineData = {
  labels: ['CV', 'Entretien RH', 'Test Technique', 'Entretien Final', 'Offre'],
  datasets: [
    {
      label: 'En cours',
      data: [45, 25, 15, 10, 5],
      backgroundColor: chartColors.primary[1],
    },
    {
      label: 'Traités',
      data: [120, 80, 50, 30, 20],
      backgroundColor: chartColors.primary[2],
    },
  ],
};

export default function RecruitmentMetrics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {recruitmentStats.map((stat) => (
          <StatCard key={stat.name} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-medium text-uims-black mb-4">
            Sources de Recrutement
          </h3>
          <div className="h-64">
            <Doughnut data={sourceData} options={defaultOptions} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-medium text-uims-black mb-4">
            Pipeline de Recrutement
          </h3>
          <div className="h-64">
            <Bar data={pipelineData} options={stackedOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
