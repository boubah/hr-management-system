import React, { useState } from 'react';
import { PlusIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import usePayrollStore from '../../../store/payrollStore';
import NewPayrollForm from './NewPayrollForm';

// Fonction pour formater les montants en GNF
const formatGNF = (amount) => {
  if (typeof amount !== 'number') return '0 GNF';
  return new Intl.NumberFormat('fr-GN', {
    style: 'currency',
    currency: 'GNF',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount).replace('GNF', 'GNF');
};

export default function PayrollList() {
  const { payrolls, validatePayroll } = usePayrollStore();
  const [showNewPayroll, setShowNewPayroll] = useState(false);

  // Calcul des totaux
  const totals = payrolls.reduce((acc, curr) => ({
    grossSalary: (acc.grossSalary || 0) + curr.grossSalary,
    totalDeductions: (acc.totalDeductions || 0) + curr.totalDeductions,
    netSalary: (acc.netSalary || 0) + curr.netSalary
  }), {});

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
                Salaire Brut
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Retenues
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
                  <div className="text-sm text-gray-500">
                    ID: {payroll.employeeId}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(payroll.month).toLocaleDateString('fr-FR', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatGNF(payroll.grossSalary)}
                  </div>
                  <div className="text-xs text-gray-500">
                    Base: {formatGNF(payroll.baseSalary)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-red-600">
                    {formatGNF(payroll.totalDeductions)}
                  </div>
                  <div className="text-xs text-gray-500">
                    CNSS: {formatGNF(payroll.cnss)}<br />
                    ITS: {formatGNF(payroll.its)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {formatGNF(payroll.netSalary)}
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
                  <div className="flex justify-end space-x-3">
                    {payroll.status !== 'Validé' && (
                      <button
                        onClick={() => validatePayroll(payroll.id)}
                        className="text-uims-red hover:text-uims-red/80"
                      >
                        Valider
                      </button>
                    )}
                    <button 
                      className="text-gray-600 hover:text-gray-900"
                      title="Télécharger le bulletin"
                    >
                      <DocumentArrowDownIcon className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <td colSpan="2" className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Total
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {formatGNF(totals.grossSalary)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-600">
                {formatGNF(totals.totalDeductions)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {formatGNF(totals.netSalary)}
              </td>
              <td colSpan="2"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {showNewPayroll && (
        <NewPayrollForm onClose={() => setShowNewPayroll(false)} />
      )}
    </div>
  );
}
