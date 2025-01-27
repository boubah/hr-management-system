import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Candidatures Totales',
    value: '156',
    change: '+12%',
    changeType: 'increase',
    period: 'vs mois dernier'
  },
  {
    name: 'Postes Ouverts',
    value: '24',
    change: '+3',
    changeType: 'increase',
    period: 'ce mois'
  },
  {
    name: 'Taux de Conversion',
    value: '18%',
    change: '-2%',
    changeType: 'decrease',
    period: 'vs mois dernier'
  },
  {
    name: 'Temps Moyen de Recrutement',
    value: '32j',
    change: '-5j',
    changeType: 'increase',
    period: 'vs moyenne'
  },
];

const applicationsByDepartment = [
  { name: 'Tech', value: 45 },
  { name: 'Commercial', value: 30 },
  { name: 'Marketing', value: 25 },
  { name: 'RH', value: 15 },
  { name: 'Finance', value: 20 },
];

const hiringTrends = [
  { month: 'Jan', applications: 45, hired: 5 },
  { month: 'Fév', applications: 52, hired: 6 },
  { month: 'Mar', applications: 48, hired: 4 },
  { month: 'Avr', applications: 70, hired: 8 },
  { month: 'Mai', applications: 65, hired: 7 },
  { month: 'Juin', applications: 58, hired: 5 },
];

const sourceData = [
  { name: 'LinkedIn', value: 40 },
  { name: 'Site Web', value: 25 },
  { name: 'Références', value: 20 },
  { name: 'Indeed', value: 15 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function RecruitmentDashboard() {
  return (
    <div className="space-y-6">
      {/* Statistiques principales */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <p className="truncate text-sm font-medium text-gray-500">{stat.name}</p>
            </dt>
            <dd className="flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.changeType === 'increase' ? (
                  <ArrowUpIcon className="h-5 w-5 flex-shrink-0 self-center text-green-500" />
                ) : (
                  <ArrowDownIcon className="h-5 w-5 flex-shrink-0 self-center text-red-500" />
                )}
                <span className="ml-1">{stat.change}</span>
              </p>
              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <span className="text-gray-500">{stat.period}</span>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Tendances des recrutements */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tendances des Recrutements</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={hiringTrends}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="applications" name="Candidatures" fill="#0088FE" />
                <Bar dataKey="hired" name="Recrutés" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution par département */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Candidatures par Département</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={applicationsByDepartment}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {applicationsByDepartment.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sources de recrutement */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Sources de Recrutement</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* KPIs détaillés */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Indicateurs de Performance</h3>
          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500">Taux d'acceptation d'offres</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-uims-red">
                  85%
                  <span className="ml-2 text-sm font-medium text-gray-500">sur 20 offres</span>
                </div>
              </dd>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500">Coût par recrutement</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-uims-red">
                  2 500€
                  <span className="ml-2 text-sm font-medium text-gray-500">moyenne</span>
                </div>
              </dd>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500">Durée moyenne du processus</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-uims-red">
                  32 jours
                  <span className="ml-2 text-sm font-medium text-gray-500">de début à fin</span>
                </div>
              </dd>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500">Taux de rétention (90 jours)</dt>
              <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                <div className="flex items-baseline text-2xl font-semibold text-uims-red">
                  92%
                  <span className="ml-2 text-sm font-medium text-gray-500">des recrutés</span>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
