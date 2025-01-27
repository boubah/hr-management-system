import React, { useState } from 'react';
import { BellAlertIcon, PlusIcon } from '@heroicons/react/24/outline';

const initialReminders = [
  {
    id: 1,
    type: 'Solde Congés',
    condition: 'remaining_days > 10',
    message: 'Il vous reste plus de 10 jours de congés à prendre',
    frequency: 'monthly',
    enabled: true
  },
  {
    id: 2,
    type: 'Approbation',
    condition: 'pending_approval > 48h',
    message: 'Des demandes de congés sont en attente depuis plus de 48h',
    frequency: 'daily',
    enabled: true
  }
];

export default function LeaveReminders() {
  const [reminders, setReminders] = useState(initialReminders);

  const toggleReminder = (id) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id ? { ...reminder, enabled: !reminder.enabled } : reminder
    ));
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium">Rappels Automatiques</h3>
          <p className="mt-1 text-sm text-gray-500">
            Configurez les rappels automatiques pour la gestion des congés
          </p>
        </div>
        <button className="btn-primary flex items-center">
          <PlusIcon className="h-5 w-5 mr-2" />
          Nouveau Rappel
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            className="bg-white shadow rounded-lg p-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <BellAlertIcon className="h-6 w-6 text-uims-red" />
                </div>
                <div>
                  <h4 className="text-base font-medium text-gray-900">{reminder.type}</h4>
                  <p className="mt-1 text-sm text-gray-500">{reminder.message}</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      {reminder.frequency}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      reminder.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {reminder.enabled ? 'Actif' : 'Inactif'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <button
                  onClick={() => toggleReminder(reminder.id)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-uims-red focus:ring-offset-2 ${
                    reminder.enabled ? 'bg-uims-red' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      reminder.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
