import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

const questionTypes = [
  { id: 'multiple', name: 'Choix Multiple' },
  { id: 'single', name: 'Choix Unique' },
  { id: 'text', name: 'Réponse Libre' },
  { id: 'code', name: 'Code' }
];

export default function QuestionManager({ control, register, errors }) {
  const { fields: questionFields, append: appendQuestion, remove: removeQuestion } = useFieldArray({
    control,
    name: 'questions'
  });

  const addNewQuestion = (type) => {
    const newQuestion = {
      text: '',
      type,
      options: type === 'multiple' || type === 'single' ? [''] : [],
      correctAnswer: '',
      points: 0,
      explanation: ''
    };
    appendQuestion(newQuestion);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-medium text-gray-900">Questions</h4>
        <div className="flex space-x-2">
          {questionTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => addNewQuestion(type.id)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              {type.name}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {questionFields.map((field, questionIndex) => (
          <div
            key={field.id}
            className="bg-gray-50 rounded-lg p-4 relative"
          >
            <button
              type="button"
              onClick={() => removeQuestion(questionIndex)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Question {questionIndex + 1}
                </label>
                <textarea
                  {...register(`questions.${questionIndex}.text`, {
                    required: 'Le texte de la question est requis'
                  })}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                />
                {errors?.questions?.[questionIndex]?.text && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.questions[questionIndex].text.message}
                  </p>
                )}
              </div>

              {(field.type === 'multiple' || field.type === 'single') && (
                <OptionsManager
                  questionIndex={questionIndex}
                  control={control}
                  register={register}
                  errors={errors}
                />
              )}

              {field.type === 'code' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Template de Code
                  </label>
                  <textarea
                    {...register(`questions.${questionIndex}.codeTemplate`)}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm font-mono"
                    placeholder="// Code template..."
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Points
                  </label>
                  <input
                    type="number"
                    {...register(`questions.${questionIndex}.points`, {
                      required: 'Les points sont requis',
                      min: { value: 0, message: 'Les points doivent être positifs' }
                    })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Temps Estimé (minutes)
                  </label>
                  <input
                    type="number"
                    {...register(`questions.${questionIndex}.estimatedTime`)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Explication de la Réponse
                </label>
                <textarea
                  {...register(`questions.${questionIndex}.explanation`)}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                  placeholder="Explication qui sera montrée après la correction..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OptionsManager({ questionIndex, control, register, errors }) {
  const { fields: optionFields, append: appendOption, remove: removeOption } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`
  });

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Options
      </label>
      {optionFields.map((option, optionIndex) => (
        <div key={option.id} className="flex gap-2">
          <input
            {...register(`questions.${questionIndex}.options.${optionIndex}`, {
              required: 'L\'option est requise'
            })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
            placeholder={`Option ${optionIndex + 1}`}
          />
          <button
            type="button"
            onClick={() => removeOption(optionIndex)}
            className="text-red-600 hover:text-red-800"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => appendOption('')}
        className="mt-2 inline-flex items-center text-sm text-uims-red hover:text-uims-red/80"
      >
        <PlusIcon className="h-4 w-4 mr-1" />
        Ajouter une option
      </button>
    </div>
  );
}
