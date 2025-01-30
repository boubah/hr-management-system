import React from 'react';
import usePayrollStore from '../../../store/payrollStore';

export default function PayrollOverview() {
  const { payrolls } = usePayrollStore();

  const stats = [
    {
      name: 'Masse Salariale',
      value: '156 000 000 GNF',
      change: '+5.4%',
      changeType: 'increase'
    },
    {
      name: 'CNSS à Verser',
      value: '28 500 000 GNF',
      subtext: '23% (18% patronal + 5% salarial)',
      changeType: 'neutral'
    },
    {
      name: 'ITS à Verser',
      value: '15 600 000 GNF',
      subtext: 'Impôt sur Traitements et Salaires',
      changeType: 'neutral'
    },
    {
      name: 'Taxe Pro.',
      value: '2 340 000 GNF',
      subtext: '1.5% de la masse salariale',
      changeType: 'neutral'
    }
  ];

  const departmentCosts = [
    { name: 'Direction Générale', amount: '35 000 000 GNF', percentage: '22.4%' },
    { name: 'Administration', amount: '28 000 000 GNF', percentage: '17.9%' },
    { name: 'Production', amount: '45 000 000 GNF', percentage: '28.8%' },
    { name: 'Commercial', amount: '25 000 000 GNF', percentage: '16.0%' },
    { name: 'Maintenance', amount: '23 000 000 GNF', percentage: '14.7%' }
  ];

  const monthlyTrends = [
    { month: 'Janvier', amount: '150 000 000 GNF', change: '+2.3%' },
    { month: 'Février', amount: '156 000 000 GNF', change: '+4.0%' },
    { month: 'Mars', amount: '162 000 000 GNF', change: '+3.8%' },
    { month: 'Avril', amount: '159 000 000 GNF', change: '-1.9%' },
    { month: 'Mai', amount: '165 000 000 GNF', change: '+3.8%' }
  ];

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-uims-red rounded-lg p-5 text-white">
            <h3 className="text-lg font-medium">{stat.name}</h3>
            <p className="mt-2 text-2xl font-bold">{stat.value}</p>
            {stat.subtext && (
              <p className="mt-1 text-sm opacity-80">{stat.subtext}</p>
            )}
            {stat.change && (
              <p className={`mt-1 text-sm ${
                stat.changeType === 'increase' ? 'text-green-300' : 
                stat.changeType === 'decrease' ? 'text-red-300' : 
                'text-gray-300'
              }`}>
                {stat.change} vs mois précédent
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Répartition par catégorie */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Répartition par Service
          </h3>
          <div className="space-y-4">
            {departmentCosts.map((dept) => (
              <div key={dept.name} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{dept.name}</p>
                  <p className="text-lg font-semibold text-gray-900">{dept.amount}</p>
                </div>
                <span className="text-sm text-gray-500">{dept.percentage}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Charges Sociales et Fiscales
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">CNSS Patronale (18%)</p>
                <p className="text-lg font-semibold text-gray-900">28 080 000 GNF</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">CNSS Salariale (5%)</p>
                <p className="text-lg font-semibold text-gray-900">7 800 000 GNF</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ITS</p>
                <p className="text-lg font-semibold text-gray-900">15 600 000 GNF</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taxe Professionnelle (1.5%)</p>
                <p className="text-lg font-semibold text-gray-900">2 340 000 GNF</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Évolution mensuelle */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Évolution de la Masse Salariale
        </h3>
        <div className="space-y-4">
          {monthlyTrends.map((month) => (
            <div key={month.month} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{month.month}</p>
                <p className="text-lg font-semibold text-gray-900">{month.amount}</p>
              </div>
              <span className={`text-sm ${
                month.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {month.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Primes et Indemnités */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Primes et Indemnités
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-gray-600">Indemnités de Transport</p>
            <p className="text-lg font-semibold text-gray-900">50 000 GNF par employé</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Prime d'Ancienneté</p>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">3% (3 ans de service)</p>
              <p className="text-sm text-gray-500">5% (5 ans de service)</p>
              <p className="text-sm text-gray-500">7% (10 ans de service)</p>
              <p className="text-sm text-gray-500">9% (15 ans de service)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
