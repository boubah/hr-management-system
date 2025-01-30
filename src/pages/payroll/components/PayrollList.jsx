import React, { useState } from 'react';
import { PlusIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import usePayrollStore from '../../../store/payrollStore';
import NewPayrollForm from './NewPayrollForm';

export default function PayrollList() {
  const { payrolls, validatePayroll } = usePayrollStore();
  const [showNewPayroll, setShowNewPayroll] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Bulletins de paie</h3>
        <button
          onClick={() => setShowNewPayroll(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-uims-red hover:bg-uims-red/90"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Nouveau Bulletin
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employé
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Période
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Salaire Net
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {payrolls.map((payroll) => (
              <tr key={payroll.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {payroll.employeeName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(payroll.month).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {payroll.netSalary.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    payroll.status === 'Validé'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {payroll.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => validatePayroll(payroll.id)}
                    className="text-uims-red hover:text-uims-red/80 mr-4"
                    disabled={payroll.status === 'Validé'}
                  >
                    Valider
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">
                    <DocumentArrowDownIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showNewPayroll && (
        <NewPayrollForm onClose={() => setShowNewPayroll(false)} />
      )}
    </div>
  );
}
