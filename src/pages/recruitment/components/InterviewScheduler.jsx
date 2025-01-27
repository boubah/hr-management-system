import React, { useState } from 'react';
import { XMarkIcon, UserGroupIcon, VideoCameraIcon } from '@heroicons/react/24/outline';

const interviewTypes = [
  { id: 'phone', name: 'Téléphone', icon: 'phone' },
  { id: 'video', name: 'Visioconférence', icon: 'video' },
  { id: 'onsite', name: 'Sur site', icon: 'location' }
];

const interviewers = [
  { id: 1, name: 'Marie Dupont', role: 'RH' },
  { id: 2, name: 'Jean Martin', role: 'Manager Tech' },
  { id: 3, name: 'Sophie Bernard', role: 'CTO' }
];

export default function InterviewScheduler({ candidate, onClose }) {
  const [formData, setFormData] = useState({
    type: '',
    date: '',
    time: '',
    duration: '60',
    interviewers: [],
    location: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour sauvegarder l'entretien
    console.log('Interview scheduled:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">Planifier un Entretien</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            {/* Type d'entretien */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type d'entretien
              </label>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {interviewTypes.map((type) => (
                  <div
                    key={type.id}
                    className={`relative rounded-lg border p-4 flex cursor-pointer focus:outline-none ${
                      formData.type === type.id
                        ? 'border-uims-red bg-uims-red/5'
                        : 'border-gray-300'
                    }`}
                    onClick={() => setFormData({ ...formData, type: type.id })}
                  >
                    {type.icon === 'video' && <VideoCameraIcon className="h-6 w-6 text-gray-400" />}
                    {type.icon === 'location' && <UserGroupIcon className="h-6 w-6 text-gray-400" />}
                    <div className="ml-3">
                      <span className="block text-sm font-medium text-gray-900">
                        {type.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Date et heure */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Heure
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                />
              </div>
            </div>

            {/* Durée */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Durée
              </label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
              >
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 heure</option>
                <option value="90">1 heure 30</option>
                <option value="120">2 heures</option>
              </select>
            </div>

            {/* Interviewers */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Interviewers
              </label>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {interviewers.map((interviewer) => (
                  <label
                    key={interviewer.id}
                    className="relative flex items-start py-2"
                  >
                    <div className="min-w-0 flex-1 text-sm">
                      <div className="font-medium text-gray-700">{interviewer.name}</div>
                      <div className="text-gray-500">{interviewer.role}</div>
                    </div>
                    <div className="ml-3 flex h-5 items-center">
                      <input
                        type="checkbox"
                        checked={formData.interviewers.includes(interviewer.id)}
                        onChange={(e) => {
                          const newInterviewers = e.target.checked
                            ? [...formData.interviewers, interviewer.id]
                            : formData.interviewers.filter(id => id !== interviewer.id);
                          setFormData({ ...formData, interviewers: newInterviewers });
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-uims-red focus:ring-uims-red"
                      />
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Localisation (si sur site) */}
            {formData.type === 'onsite' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Localisation
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                  placeholder="Salle de réunion, étage, etc."
                />
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Notes pour les interviewers
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                placeholder="Instructions particulières, points à aborder..."
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
              Planifier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
