import React, { useState } from 'react';
import { CalendarIcon, ArrowPathIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const calendarServices = [
  {
    id: 'google',
    name: 'Google Calendar',
    icon: '/icons/google-calendar.png',
    connected: true
  },
  {
    id: 'outlook',
    name: 'Outlook Calendar',
    icon: '/icons/outlook-calendar.png',
    connected: false
  },
  {
    id: 'apple',
    name: 'Apple Calendar',
    icon: '/icons/apple-calendar.png',
    connected: false
  }
];

const syncSettings = [
  {
    id: 'auto_sync',
    label: 'Synchronisation automatique',
    description: 'Synchroniser automatiquement les congés approuvés',
    enabled: true
  },
  {
    id: 'team_events',
    label: 'Événements d\'équipe',
    description: 'Afficher les congés de l\'équipe dans mon calendrier',
    enabled: true
  },
  {
    id: 'notifications',
    label: 'Notifications calendrier',
    description: 'Recevoir des rappels pour les congés à venir',
    enabled: false
  }
];

export default function CalendarIntegration() {
  const [settings, setSettings] = useState(syncSettings);

  const toggleSetting = (id) => {
    setSettings(settings.map(setting =>
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium mb-6">Intégration Calendrier</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {calendarServices.map((service) => (
            <div
              key={service.id}
              className="relative rounded-lg border p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10"
                      src={service.icon}
                      alt={service.name}
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {service.name}
                    </h4>
                    <p className="mt-1 text-xs text-gray-500">
                      {service.connected ? 'Connecté' : 'Non connecté'}
                    </p>
                  </div>
                </div>
                <button
                  className={`px-3 py-1 rounded-md text-sm ${
                    service.connected
                      ? 'text-red-600 hover:text-red-700'
                      : 'text-uims-red hover:text-uims-red/80'
                  }`}
                >
                  {service.connected ? 'Déconnecter' : 'Connecter'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h4 className="text-base font-medium mb-4">Paramètres de Synchronisation</h4>
          <div className="space-y-4">
            {settings.map((setting) => (
              <div
                key={setting.id}
                className="flex items-center justify-between"
              >
                <div>
                  <h5 className="text-sm font-medium text-gray-900">
                    {setting.label}
                  </h5>
                  <p className="text-sm text-gray-500">{setting.description}</p>
                </div>
                <button
                  onClick={() => toggleSetting(setting.id)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-uims-red focus:ring-offset-2 ${
                    setting.enabled ? 'bg-uims-red' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      setting.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button className="btn-primary flex items-center">
            <ArrowPathIcon className="h-5 w-5 mr-2" />
            Synchroniser Maintenant
          </button>
        </div>
      </div>
    </div>
  );
}
