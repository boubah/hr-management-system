import React, { useState } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';
import useEmployeeStore from '../../../store/employeeStore';

export default function PersonalInfo({ employeeId }) {
  const { employees, updateEmployee } = useEmployeeStore();
  const employee = employees.find(emp => emp.id === employeeId);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(employee);

  if (!employee) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateEmployee(employeeId, formData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Prénom
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Téléphone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date de naissance
            </label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nationalité
            </label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-uims-red hover:bg-uims-red/90"
          >
            Enregistrer
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => setIsEditing(true)}
          className="inline-flex items-center text-sm text-uims-red hover:text-uims-red/80"
        >
          <PencilIcon className="h-4 w-4 mr-1" />
          Modifier
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <dt className="text-sm font-medium text-gray-500">Prénom</dt>
          <dd className="mt-1 text-sm text-gray-900">{employee.firstName}</dd>
        </div>

        <div>
          <dt className="text-sm font-medium text-gray-500">Nom</dt>
          <dd className="mt-1 text-sm text-gray-900">{employee.lastName}</dd>
        </div>

        <div>
          <dt className="text-sm font-medium text-gray-500">Email</dt>
          <dd className="mt-1 text-sm text-gray-900">{employee.email}</dd>
        </div>

        <div>
          <dt className="text-sm font-medium text-gray-500">Téléphone</dt>
          <dd className="mt-1 text-sm text-gray-900">{employee.phone}</dd>
        </div>

        <div>
          <dt className="text-sm font-medium text-gray-500">Date de naissance</dt>
          <dd className="mt-1 text-sm text-gray-900">
            {new Date(employee.birthDate).toLocaleDateString('fr-FR')}
          </dd>
        </div>

        <div>
          <dt className="text-sm font-medium text-gray-500">Nationalité</dt>
          <dd className="mt-1 text-sm text-gray-900">{employee.nationality}</dd>
        </div>
      </div>
    </div>
  );
}
