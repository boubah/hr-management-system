import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import EmployeeForm from './EmployeeForm';

const initialEmployees = [
  {
    id: 1,
    nom: 'Diallo',
    prenom: 'Amadou',
    email: 'amadou.diallo@uims.com',
    poste: 'Développeur Senior',
    departement: 'Technologie',
    dateEmbauche: '2022-03-15',
    status: 'Actif'
  },
  {
    id: 2,
    nom: 'Koné',
    prenom: 'Fatoumata',
    email: 'fatoumata.kone@uims.com',
    poste: 'Responsable RH',
    departement: 'Ressources Humaines',
    dateEmbauche: '2021-06-01',
    status: 'Actif'
  }
];

export default function EmployeeList() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (employeeData) => {
    if (selectedEmployee) {
      setEmployees(employees.map(emp => 
        emp.id === selectedEmployee.id ? { ...employeeData, id: emp.id } : emp
      ));
    } else {
      setEmployees([...employees, { ...employeeData, id: employees.length + 1 }]);
    }
    setIsFormOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-2xl font-bold text-uims-black">Liste des Employés</h2>
          <p className="mt-2 text-sm text-gray-700">
            Liste complète des employés avec leurs informations de base
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            onClick={() => {
              setSelectedEmployee(null);
              setIsFormOpen(true);
            }}
            className="btn-primary flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Ajouter un Employé
          </button>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Nom Complet</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Poste</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Département</th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {employees.map((employee) => (
                    <tr key={employee.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                        <div className="font-medium text-gray-900">{employee.prenom} {employee.nom}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employee.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employee.poste}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employee.departement}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          employee.status === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => handleEdit(employee)}
                          className="text-uims-red hover:text-uims-red/80 mr-4"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(employee.id)}
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
      </div>

      {isFormOpen && (
        <EmployeeForm
          employee={selectedEmployee}
          onSubmit={handleFormSubmit}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedEmployee(null);
          }}
        />
      )}
    </div>
  );
}
