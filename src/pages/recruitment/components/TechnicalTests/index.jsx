import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import TestsList from './TestsList';
import TestResults from './TestResults';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const sampleResults = [
  {
    id: 1,
    candidate: {
      name: 'Sophie Martin',
      email: 'sophie.martin@email.com',
      photo: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    test: {
      title: 'Test Développeur Full Stack React/Node.js',
      totalScore: 100,
      passingScore: 70
    },
    date: '2024-02-15T10:00:00',
    score: 85,
    passed: true,
    answers: [
      {
        correct: true,
        score: 20,
        userAnswer: 'useState, useEffect',
        correctAnswer: 'useState, useEffect'
      },
      // ... autres réponses
    ]
  },
  // ... autres résultats
];

export default function TechnicalTests() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: 'Liste des Tests', component: <TestsList /> },
    { name: 'Résultats', component: <TestResults results={sampleResults} /> }
  ];

  return (
    <div className="space-y-6">
      <Tab.Group onChange={setActiveTab}>
        <Tab.List className="flex space-x-1 rounded-xl bg-gray-100 p-1">
          {tabs.map((tab) => (
            <Tab
              key={tab.name}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white text-uims-red shadow'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )
              }
            >
              {tab.name}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab, idx) => (
            <Tab.Panel key={idx}>
              {tab.component}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
