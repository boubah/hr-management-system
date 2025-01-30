import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  UsersIcon,
  UserPlusIcon,
  UserMinusIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { defaultOptions, chartColors } from '../ChartConfig';
import StatCard from './StatCard';

const employeeStats = [
  {
    name: 'Total Employés',
    value: '156',
    change: '+12%',
    icon: UsersIcon,
  },
  {
    name: 'Nouveaux Employés',
    value: '23',
    change: '+8%',
    icon: UserPlusIcon,
  },
  {
    name: 'Départs',
    value: '5',
    change: '-2%',
    icon: UserMinusIcon,
  },
  {
    name: 'Taux de Rétention',
    value: '95%',
    change: '+3%',
    icon: ChartBarIcon,
  },
];

const departmentData = {
  labels: ['Technologie', 'Commercial', 'Marketing', 'RH', 'Finance'],
  datasets: [
    {
      data: [45, 30, 25, 15, 20],
      backgroundColor: chartColors.primary,
    },
  ],
};

const turnoverData = {
  labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
  datasets: [
    {
      label: 'Nouveaux employés',
      data: [8, 12, 5, 10, 15, 8],
      backgroundColor: chartColors.primary[2],
    },
    {
      label: 'Départs',
      data: [3, 2, 4, 3, 5, 2],
      backgroundColor: chartColors.primary[4],
    },
  ],
};

export default function EmployeeMetrics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {employeeStats.map((stat) => (
          <StatCard key={stat.name} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-medium text-uims-black mb-4">
            Répartition par Département
          </h3>
          <div className="h-64">
            <Doughnut data={departmentData} options={defaultOptions} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-medium text-uims-black mb-4">
            Évolution des Effectifs
          </h3>
          <div className="h-64">
            <Bar data={turnoverData} options={defaultOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
