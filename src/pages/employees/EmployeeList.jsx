import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import useEmployeeStore from '../../store/employeeStore';
import EmployeeDetailsDialog from './EmployeeDetailsDialog';

export default function EmployeeList() {
  const { employees, selectedEmployeeId, setSelectedEmployee } = useEmployeeStore();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Employés</h2>
          <p className="mt-1 text-sm text-gray-500">
            Liste des employés
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            onClick={() => setSelectedEmployee('new')}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-uims-red px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-uims-red/90"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
            Nouvel Employé
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Département
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Poste
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr 
                key={employee.id}
                onClick={() => setSelectedEmployee(employee.id)}
                className={`cursor-pointer hover:bg-gray-50 ${
                  selectedEmployeeId === employee.id ? 'bg-gray-50' : ''
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={`https://ui-avatars.com/api/?name=${employee.firstName}+${employee.lastName}&background=D62828&color=fff`}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {employee.firstName} {employee.lastName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {employee.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.department}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.role}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    employee.status === 'Actif'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {employee.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedEmployeeId && (
        <EmployeeDetailsDialog
          employeeId={selectedEmployeeId}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
}
