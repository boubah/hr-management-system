import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { month: 'Jan', congesPayes: 5, maladie: 2, autres: 1 },
  { month: 'Fév', congesPayes: 3, maladie: 1, autres: 0 },
  { month: 'Mar', congesPayes: 4, maladie: 2, autres: 1 },
  { month: 'Avr', congesPayes: 6, maladie: 1, autres: 2 },
  { month: 'Mai', congesPayes: 8, maladie: 3, autres: 1 },
  { month: 'Juin', congesPayes: 12, maladie: 2, autres: 2 }
];

const stats = [
  { name: 'Total Jours Pris', value: '45 jours', change: '+12%', changeType: 'increase' },
  { name: 'Moyenne par Employé', value: '15 jours', change: '-2%', changeType: 'decrease' },
  { name: 'Taux d\'Approbation', value: '94%', change: '+3%', changeType: 'increase' },
  { name: 'Délai Moyen d\'Approbation', value: '48h', change: '-24h', changeType: 'decrease' },
];

export default function LeaveStats() {
  return (
    <div className="space-y-6">
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
              <p className="text-2xl font-semibold text-uims-black">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Évolution des Congés</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="congesPayes" name="Congés Payés" fill="#D62828" />
              <Bar dataKey="maladie" name="Maladie" fill="#457B9D" />
              <Bar dataKey="autres" name="Autres" fill="#1D3557" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
