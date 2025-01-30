import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import PersonalInfo from './PersonalInfo';
import EmploymentHistory from './EmploymentHistory';
import SkillsQualifications from './SkillsQualifications';
import PerformanceMetrics from './PerformanceMetrics';
import useEmployeeStore from '../../../store/employeeStore';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function EmployeeProfile({ employeeId, onClose }) {
  const { employees } = useEmployeeStore();
  const employee = employees.find(emp => emp.id === employeeId);

  const tabs = [
    { name: 'Informations Personnelles', component: PersonalInfo },
    { name: 'Historique Professionnel', component: EmploymentHistory },
    { name: 'Compétences & Qualifications', component: SkillsQualifications },
    { name: 'Performance', component: PerformanceMetrics },
  ];

  if (!employee) return null;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Profil de {employee.firstName} {employee.lastName}
          </h3>
          <button
            onClick={onClose}
            className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <span className="sr-only">Fermer</span>
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
      </div>

      <Tab.Group>
        <Tab.List className="border-b border-gray-200 px-4">
          <div className="-mb-px flex space-x-8">
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
          </div>
        </Tab.List>
        <Tab.Panels className="p-6">
          {tabs.map((tab, idx) => (
            <Tab.Panel key={idx}>
              <tab.component employeeId={employeeId} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
