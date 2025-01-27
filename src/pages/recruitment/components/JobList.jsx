import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import JobForm from './JobForm';

const initialJobs = [
  {
    id: 1,
    title: 'Développeur Full Stack',
    department: 'Technologie',
    location: 'Paris',
    type: 'CDI',
    status: 'Ouvert',
    applications: 12,
    postedDate: '2024-02-01'
  },
  {
    id: 2,
    title: 'Responsable RH',
    department: 'Ressources Humaines',
    location: 'Lyon',
    type: 'CDI',
    status: 'Ouvert',
    applications: 8,
    postedDate: '2024-02-05'
  }
];

const statusStyles = {
  'Ouvert': 'bg-green-100 text-green-800',
  'Fermé': 'bg-red-100 text-red-800',
  'En pause': 'bg-yellow-100 text-yellow-800'
};

export default function JobList() {
  const [jobs, setJobs] = useState(initialJobs);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) {
      setJobs(jobs.filter(job => job.id !== id));
    }
  };

  const handleEdit = (job) => {
    setSelectedJob(job);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (jobData) => {
    if (selectedJob) {
      setJobs(jobs.map(job => 
        job.id === selectedJob.id ? { ...jobData, id: job.id } : job
      ));
    } else {
      setJobs([...jobs, { ...jobData, id: jobs.length + 1 }]);
    }
    setIsFormOpen(false);
    setSelectedJob(null);
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h3 className="text-lg font-semibold">Liste des Offres d'Emploi</h3>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => {
              setSelectedJob(null);
              setIsFormOpen(true);
            }}
            className="btn-primary flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Nouvelle Offre
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
                    Poste
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Département
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Localisation
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Type
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Candidatures
                  </th>
                  <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                      {job.title}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {job.department}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {job.location}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {job.type}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        statusStyles[job.status]
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {job.applications}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button
                        onClick={() => handleEdit(job)}
                        className="text-uims-red hover:text-uims-red/80 mr-4"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
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
        <JobForm
          job={selectedJob}
          onSubmit={handleFormSubmit}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedJob(null);
          }}
        />
      )}
    </div>
  );
}
