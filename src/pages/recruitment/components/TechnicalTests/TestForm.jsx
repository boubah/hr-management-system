import React from 'react';
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useForm, useFieldArray } from 'react-hook-form';

const departments = [
  'Technologie',
  'Design',
  'Marketing',
  'Commercial',
  'Finance',
  'RH'
];

const difficulties = [
  'Débutant',
  'Intermédiaire',
  'Avancé'
];

export default function TestForm({ test, onSubmit, onClose }) {
  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: test || {
      skills: [''],
      questions: [{ text: '', type: 'multiple', options: [''], correctAnswer: '', points: 0 }]
    }
  });

  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: 'skills'
  });

  const { fields: questionFields, append: appendQuestion, remove: removeQuestion } = useFieldArray({
    control,
    name: 'questions'
  });

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">
            {test ? 'Modifier le Test' : 'Nouveau Test Technique'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          <div className="space-y-6">
            {/* Informations générales */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Titre du Test
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
                  Durée (minutes)
                </label>
                <input
                  type="number"
                  {...register('duration', { required: 'La durée est requise' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                />
                {errors.duration && <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Difficulté
                </label>
                <select
                  {...register('difficulty', { required: 'La difficulté est requise' })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                >
                  <option value="">Sélectionner une difficulté</option>
                  {difficulties.map(diff => (
                    <option key={diff} value={diff}>{diff}</option>
                  ))}
                </select>
                {errors.difficulty && <p className="mt-1 text-sm text-red-600">{errors.difficulty.message}</p>}
              </div>
            </div>

            {/* Compétences requises */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Compétences Évaluées
              </label>
              <div className="space-y-2">
                {skillFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <input
                      {...register(`skills.${index}`)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                      placeholder="Ex: React.js"
                    />
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendSkill('')}
                  className="mt-2 inline-flex items-center text-sm text-uims-red hover:text-uims-red/80"
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Ajouter une compétence
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Instructions
              </label>
              <textarea
                {...register('instructions')}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                placeholder="Instructions détaillées pour le candidat..."
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
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
              {test ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
