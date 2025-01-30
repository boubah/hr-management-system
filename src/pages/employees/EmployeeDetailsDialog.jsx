import React, { useState } from 'react';
import { Tab } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import useEmployeeStore from '../../store/employeeStore';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function EmployeeDetailsDialog({ employeeId, onClose }) {
  const { employees, updateEmployee, addEmployee } = useEmployeeStore();
  const isNew = employeeId === 'new';
  const employee = isNew ? {
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    role: '',
    status: 'Actif',
    startDate: new Date().toISOString().split('T')[0]
  } : employees.find(emp => emp.id === employeeId);

  const [formData, setFormData] = useState(employee);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNew) {
      addEmployee(formData);
    } else {
      updateEmployee(employeeId, formData);
    }
    onClose();
  };

  const tabs = [
    { name: 'Informations', id: 'info' },
    { name: 'Contrat', id: 'contract' },
    { name: 'Documents', id: 'documents' },
  ];

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {isNew ? 'Nouvel Employé' : `${employee.firstName} ${employee.lastName}`}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <Tab.Group>
            <Tab.List className="border-b border-gray-200">
              <div className="px-6">
                <nav className="-mb-px flex space-x-8">
                  {tabs.map((tab) => (
                    <Tab
                      key={tab.id}
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

            <Tab.Panels className="p-6">
              <Tab.Panel>
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
                      required
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
                      required
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
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Département
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                      required
                    >
                      <option value="">Sélectionner un département</option>
                      <option value="Technologie">Technologie</option>
                      <option value="Ressources Humaines">Ressources Humaines</option>
                      <option value="Finance">Finance</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Poste
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                    >
                      <option value="Actif">Actif</option>
                      <option value="Inactif">Inactif</option>
                    </select>
                  </div>
                </div>
              </Tab.Panel>

              <Tab.Panel>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Date de début
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Type de contrat
                    </label>
                    <select
                      name="contractType"
                      value={formData.contractType}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                    >
                      <option value="">Sélectionner un type</option>
                      <option value="CDI">CDI</option>
                      <option value="CDD">CDD</option>
                      <option value="Alternance">Alternance</option>
                      <option value="Stage">Stage</option>
                    </select>
                  </div>
                </div>
              </Tab.Panel>

              <Tab.Panel>
                <div className="space-y-6">
                  <div className="flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-medium text-uims-red hover:text-uims-red/90"
                        >
                          <span>Télécharger un fichier</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">ou glisser-déposer</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, PDF jusqu'à 10MB</p>
                    </div>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-uims-red hover:bg-uims-red/90"
              >
                {isNew ? 'Créer' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
