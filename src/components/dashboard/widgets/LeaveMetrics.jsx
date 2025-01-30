import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  CalendarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { defaultOptions, stackedOptions, chartColors } from '../ChartConfig';
import StatCard from './StatCard';

const leaveStats = [
  {
    name: 'Demandes en Attente',
    value: '12',
    change: '+4',
    icon: ClockIcon,
  },
  {
    name: 'Congés en Cours',
    value: '8',
    change: '+2',
    icon: CalendarIcon,
  },
  {
    name: 'Taux d\'Approbation',
    value: '92%',
    change: '+5%',
    icon: CheckCircleIcon,
  },
  {
    name: 'Taux de Refus',
    value: '8%',
    change: '-2%',
    icon: XCircleIcon,
  },
];

const leaveTypeData = {
  labels: ['Congés Payés', 'RTT', 'Maladie', 'Sans Solde', 'Autres'],
  datasets: [
    {
      data: [45, 20, 15, 5, 10],
      backgroundColor: chartColors.primary,
    },
  ],
};

const monthlyLeaveData = {
  labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
  datasets: [
    {
      label: 'Congés Payés',
      data: [15, 12, 18, 22, 25, 30],
      backgroundColor: chartColors.primary[0],
    },
    {
      label: 'RTT',
      data: [8, 6, 10, 12, 15, 18],
      backgroundColor: chartColors.primary[1],
    },
    {
      label: 'Maladie',
      data: [5, 4, 7, 6, 8, 10],
      backgroundColor: chartColors.primary[2],
    },
  ],
};

export default function LeaveMetrics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {leaveStats.map((stat) => (
          <StatCard key={stat.name} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-medium text-uims-black mb-4">
            Répartition par Type de Congé
          </h3>
          <div className="h-64">
            <Doughnut data={leaveTypeData} options={defaultOptions} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-medium text-uims-black mb-4">
            Évolution Mensuelle des Congés
          </h3>
          <div className="h-64">
            <Bar data={monthlyLeaveData} options={stackedOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
