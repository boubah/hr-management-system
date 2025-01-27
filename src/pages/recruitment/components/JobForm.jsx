import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';

const departments = [
  'Technologie',
  'Ressources Humaines',
  'Finance',
  'Marketing',
  'Commercial',
  'Opérations'
];

const jobTypes = [
  'CDI',
  'CDD',
  'Stage',
  'Alternance',
  'Freelance'
];

const locations = [
  'Paris',
  'Lyon',
  'Marseille',
  'Bordeaux',
  'Lille',
  'Remote'
];

export default function JobForm({ job, onSubmit, onClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: job || {
      status: 'Ouvert'
    }
  });

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">
            {job ? 'Modifier une Offre' : 'Nouvelle Offre d\'Emploi'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Titre du Poste
              </label>
              <input
                type="text"
                {...register('title', { required: 'Le titre est requis' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Département
              </label>
              <select
                {...register('department', { required: 'Le département est requis' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
              >
                <option value="">Sélectionner un département</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type de Contrat
              </label>
              <select
                {...register('type', { required: 'Le type de contrat est requis' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
              >
                <option value="">Sélectionner un type</option>
                {jobTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Localisation
              </label>
              <select
                {...register('location', { required: 'La localisation est requise' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
              >
                <option value="">Sélectionner une localisation</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                {...register('status')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
              >
                <option value="Ouvert">Ouvert</option>
                <option value="Fermé">Fermé</option>
                <option value="En pause">En pause</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register('description', { required: 'La description est requise' })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {job ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
