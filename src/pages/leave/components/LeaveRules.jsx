import React, { useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const initialRules = [
  {
    id: 1,
    type: 'Congés Payés',
    daysPerYear: 25,
    minDaysNotice: 14,
    maxConsecutiveDays: 30,
    restrictions: ['Pas plus de 3 semaines en période estivale']
  },
  {
    id: 2,
    type: 'RTT',
    daysPerYear: 12,
    minDaysNotice: 7,
    maxConsecutiveDays: 5,
    restrictions: ['Maximum 2 jours consécutifs']
  }
];

export default function LeaveRules() {
  const [rules, setRules] = useState(initialRules);
  const [editingRule, setEditingRule] = useState(null);

  const handleAddRule = () => {
    const newRule = {
      id: rules.length + 1,
      type: '',
      daysPerYear: 0,
      minDaysNotice: 0,
      maxConsecutiveDays: 0,
      restrictions: []
    };
    setEditingRule(newRule);
  };

  const handleSaveRule = (rule) => {
    if (rule.id) {
      setRules(rules.map(r => r.id === rule.id ? rule : r));
    } else {
      setRules([...rules, { ...rule, id: rules.length + 1 }]);
    }
    setEditingRule(null);
  };

  const handleDeleteRule = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette règle ?')) {
      setRules(rules.filter(r => r.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h3 className="text-lg font-medium">Règles de Congés</h3>
        <button
          onClick={handleAddRule}
          className="btn-primary flex items-center"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Ajouter une Règle
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="bg-white shadow rounded-lg p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-medium text-gray-900">{rule.type}</h4>
                <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Jours par an</dt>
                    <dd className="text-sm text-gray-900">{rule.daysPerYear} jours</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Délai minimum</dt>
                    <dd className="text-sm text-gray-900">{rule.minDaysNotice} jours</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Maximum consécutif</dt>
                    <dd className="text-sm text-gray-900">{rule.maxConsecutiveDays} jours</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Restrictions</dt>
                    <dd className="text-sm text-gray-900">
                      <ul className="list-disc list-inside">
                        {rule.restrictions.map((restriction, index) => (
                          <li key={index}>{restriction}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
              <button
                onClick={() => handleDeleteRule(rule.id)}
                className="text-red-600 hover:text-red-800"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
