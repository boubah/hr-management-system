import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import PayrollOverview from './components/PayrollOverview';
import PayrollList from './components/PayrollList';
import PayrollSettings from './components/PayrollSettings';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Payroll() {
  const tabs = [
    { name: 'Vue d\'ensemble', component: PayrollOverview },
    { name: 'Bulletins de paie', component: PayrollList },
    { name: 'Paramètres', component: PayrollSettings },
  ];

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion de la Paie</h2>
          <p className="mt-1 text-sm text-gray-500">
            Gestion des salaires et bulletins de paie
          </p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <Tab.Group>
          <Tab.List className="border-b border-gray-200">
            <div className="px-6">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    className={({ selected }) =>
                      classNames(
                        'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none',
                        selected
                          ? 'border-uims-red text-uims-red'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      )
                    }
                  >
                    {tab.name}
                  </Tab>
                ))}
              </nav>
            </div>
          </Tab.List>
          <Tab.Panels>
            {tabs.map((tab, idx) => (
              <Tab.Panel key={idx} className="p-6">
                <tab.component />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
