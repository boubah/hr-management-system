import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import TestForm from './TestForm';

const initialTests = [
  {
    id: 1,
    title: 'Test Développeur Full Stack React/Node.js',
    department: 'Technologie',
    duration: '120',
    difficulty: 'Intermédiaire',
    skills: ['React', 'Node.js', 'API REST', 'Base de données'],
    totalScore: 100,
    passingScore: 70,
    status: 'Actif',
    completions: 15,
    avgScore: 75
  },
  {
    id: 2,
    title: 'Test UX/UI Designer',
    department: 'Design',
    duration: '90',
    difficulty: 'Avancé',
    skills: ['Figma', 'Design System', 'Prototypage', 'User Research'],
    totalScore: 100,
    passingScore: 75,
    status: 'Actif',
    completions: 8,
    avgScore: 82
  }
];

const difficultyColors = {
  'Débutant': 'bg-green-100 text-green-800',
  'Intermédiaire': 'bg-yellow-100 text-yellow-800',
  'Avancé': 'bg-red-100 text-red-800'
};

export default function TestsList() {
  const [tests, setTests] = useState(initialTests);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce test ?')) {
      setTests(tests.filter(test => test.id !== id));
    }
  };

  const handleDuplicate = (test) => {
    const newTest = {
      ...test,
      id: tests.length + 1,
      title: `${test.title} (copie)`,
      completions: 0,
      avgScore: 0
    };
    setTests([...tests, newTest]);
  };

  const handleEdit = (test) => {
    setSelectedTest(test);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (testData) => {
    if (selectedTest) {
      setTests(tests.map(test => 
        test.id === selectedTest.id ? { ...testData, id: test.id } : test
      ));
    } else {
      setTests([...tests, { ...testData, id: tests.length + 1, completions: 0, avgScore: 0 }]);
    }
    setIsFormOpen(false);
    setSelectedTest(null);
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h3 className="text-lg font-semibold">Tests Techniques</h3>
          <p className="mt-2 text-sm text-gray-700">
            Liste des tests techniques disponibles pour évaluer les candidats
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => {
              setSelectedTest(null);
              setIsFormOpen(true);
            }}
            className="btn-primary flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Nouveau Test
          </button>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                    Test
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Département
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Durée
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Difficulté
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Score Requis
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Statistiques
                  </th>
                  <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tests.map((test) => (
                  <tr key={test.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                      <div className="font-medium text-gray-900">{test.title}</div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {test.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {test.department}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {test.duration} min
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        difficultyColors[test.difficulty]
                      }`}>
                        {test.difficulty}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {test.passingScore}/{test.totalScore}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <div className="text-gray-900">{test.completions} passages</div>
                      <div className="text-gray-500">Moy: {test.avgScore}%</div>
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button
                        onClick={() => handleEdit(test)}
                        className="text-uims-red hover:text-uims-red/80 mr-4"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDuplicate(test)}
                        className="text-gray-600 hover:text-gray-900 mr-4"
                      >
                        <DocumentDuplicateIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(test.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isFormOpen && (
        <TestForm
          test={selectedTest}
          onSubmit={handleFormSubmit}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedTest(null);
          }}
        />
      )}
    </div>
  );
}
