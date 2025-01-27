import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import LeaveRequests from './components/LeaveRequests';
import LeaveCalendar from './components/LeaveCalendar';
import LeaveBalance from './components/LeaveBalance';
import LeaveStats from './components/LeaveStats';
import LeaveHistory from './components/LeaveHistory';
import CustomReports from './components/CustomReports';
import CalendarIntegration from './components/CalendarIntegration';
import ConflictManagement from './components/ConflictManagement';
import NewLeaveRequest from './components/NewLeaveRequest';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function LeaveManagement() {
  const [showNewRequest, setShowNewRequest] = useState(false);

  const tabs = [
    { name: 'Demandes', component: <LeaveRequests /> },
    { name: 'Calendrier', component: <LeaveCalendar /> },
    { name: 'Solde', component: <LeaveBalance /> },
    { name: 'Statistiques', component: <LeaveStats /> },
    { name: 'Historique', component: <LeaveHistory /> },
    { name: 'Rapports', component: <CustomReports /> },
    { name: 'Intégrations', component: <CalendarIntegration /> },
    { name: 'Conflits', component: <ConflictManagement /> },
  ];

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-uims-black">Gestion des Congés</h2>
          <p className="mt-1 text-sm text-gray-500">
            Gérez vos demandes de congés et consultez votre solde
          </p>
        </div>
        <button
          onClick={() => setShowNewRequest(true)}
          className="btn-primary"
        >
          Nouvelle Demande
        </button>
      </div>

      <div className="w-full">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-white p-1 shadow">
            {tabs.map((tab) => (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-uims-red text-white shadow'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-uims-black'
                  )
                }
              >
                {tab.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-4">
            {tabs.map((tab, idx) => (
              <Tab.Panel
                key={idx}
                className="rounded-xl bg-white p-6 shadow"
              >
                {tab.component}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>

      {showNewRequest && (
        <NewLeaveRequest onClose={() => setShowNewRequest(false)} />
      )}
    </div>
  );
}
