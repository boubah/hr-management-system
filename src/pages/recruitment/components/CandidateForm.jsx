import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';

const positions = [
  'Développeur Full Stack',
  'Développeur Frontend',
  'Développeur Backend',
  'DevOps Engineer',
  'UX/UI Designer',
  'Chef de Projet',
  'Product Owner',
  'Commercial',
  'Responsable RH'
];

export default function CandidateForm({ onSubmit, onClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">Ajouter un Candidat</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <input
                type="text"
                {...register('name', { required: 'Le nom est requis' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register('email', { 
                  required: 'L\'email est requis',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Adresse email invalide'
                  }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <input
                type="tel"
                {...register('phone')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Poste Recherché
              </label>
              <select
                {...register('position', { required: 'Le poste est requis' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
              >
                <option value="">Sélectionner un poste</option>
                {positions.map(position => (
                  <option key={position} value={position}>{position}</option>
                ))}
              </select>
              {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Années d'Expérience
              </label>
              <input
                type="number"
                {...register('experience', { 
                  required: 'L\'expérience est requise',
                  min: { value: 0, message: 'L\'expérience ne peut pas être négative' }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
              />
              {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Source
              </label>
              <select
                {...register('source')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
              >
                <option value="linkedin">LinkedIn</option>
                <option value="website">Site Web</option>
                <option value="referral">Recommandation</option>
                <option value="indeed">Indeed</option>
                <option value="other">Autre</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Notes
              </label>
              <textarea
                {...register('notes')}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                placeholder="Informations complémentaires..."
              />
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
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
