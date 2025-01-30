import React, { Suspense } from 'react';
import { Tab } from '@headlessui/react';

// Importation différée des composants lourds
const PerformanceOverview = React.lazy(() => import('./components/PerformanceOverview'));
const EvaluationsList = React.lazy(() => import('./components/EvaluationsList'));
const ObjectivesList = React.lazy(() => import('./components/ObjectivesList'));
const SkillsMatrix = React.lazy(() => import('./components/SkillsMatrix'));

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-uims-red"></div>
    </div>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Performance() {
  const tabs = [
    { name: 'Vue d\'ensemble', component: PerformanceOverview },
    { name: 'Évaluations', component: EvaluationsList },
    { name: 'Objectifs', component: ObjectivesList },
    { name: 'Matrice des compétences', component: SkillsMatrix },
  ];

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Performances</h2>
          <p className="mt-1 text-sm text-gray-500">
            Suivi des évaluations et des objectifs
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
                <Suspense fallback={<LoadingSpinner />}>
                  <tab.component />
                </Suspense>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
