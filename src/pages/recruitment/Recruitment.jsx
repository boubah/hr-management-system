import React from 'react';
import { Tab } from '@headlessui/react';
import JobList from './components/JobList';
import CandidateList from './components/CandidateList';
import RecruitmentPipeline from './components/RecruitmentPipeline';
import RecruitmentDashboard from './components/RecruitmentDashboard';
import TestsList from './components/TechnicalTests/TestsList';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Recruitment() {
  const tabs = [
    { name: 'Tableau de Bord', component: <RecruitmentDashboard /> },
    { name: 'Pipeline', component: <RecruitmentPipeline /> },
    { name: 'Offres d\'emploi', component: <JobList /> },
    { name: 'Candidats', component: <CandidateList /> },
    { name: 'Tests Techniques', component: <TestsList /> }
  ];

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-uims-black">Recrutement</h2>
          <p className="mt-1 text-sm text-gray-500">
            Gérez vos offres d'emploi et suivez les candidatures
          </p>
        </div>
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
    </div>
  );
}
