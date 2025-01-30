import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import usePayrollStore from '../../../store/payrollStore';
import { calculateNetSalary, PAYROLL_CONSTANTS } from '../../../utils/payrollCalculations';

export default function NewPayrollForm({ onClose }) {
  const { addPayroll } = usePayrollStore();
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    month: new Date().toISOString().slice(0, 7),
    baseSalary: '',
    yearsOfService: 0,
    bonuses: [],
    deductions: []
  });

  const [newBonus, setNewBonus] = useState({ type: '', amount: '' });
  const [newDeduction, setNewDeduction] = useState({ type: '', amount: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const salary = calculateNetSalary(
      Number(formData.baseSalary),
      Number(formData.yearsOfService),
      formData.bonuses,
      formData.deductions
    );
    
    addPayroll({
      ...formData,
      ...salary,
      status: 'En attente'
    });
    onClose();
  };

  const addBonus = () => {
    if (newBonus.type && newBonus.amount) {
      setFormData(prev => ({
        ...prev,
        bonuses: [...prev.bonuses, { ...newBonus, amount: Number(newBonus.amount) }]
      }));
      setNewBonus({ type: '', amount: '' });
    }
  };

  const addDeduction = () => {
    if (newDeduction.type && newDeduction.amount) {
      setFormData(prev => ({
        ...prev,
        deductions: [...prev.deductions, { ...newDeduction, amount: Number(newDeduction.amount) }]
      }));
      setNewDeduction({ type: '', amount: '' });
    }
  };

  const salary = calculateNetSalary(
    Number(formData.baseSalary) || 0,
    Number(formData.yearsOfService) || 0,
    formData.bonuses,
    formData.deductions
  );

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Nouveau Bulletin de Paie
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Informations de base */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employé
                </label>
                <input
                  type="text"
                  value={formData.employeeName}
                  onChange={(e) => setFormData(prev => ({ ...prev, employeeName: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Période
                </label>
                <input
                  type="month"
                  value={formData.month}
                  onChange={(e) => setFormData(prev => ({ ...prev, month: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Salaire de Base (GNF)
                </label>
                <input
                  type="number"
                  value={formData.baseSalary}
                  onChange={(e) => setFormData(prev => ({ ...prev, baseSalary: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Années de Service
                </label>
                <input
                  type="number"
                  value={formData.yearsOfService}
                  onChange={(e) => setFormData(prev => ({ ...prev, yearsOfService: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                  required
                />
              </div>
            </div>

            {/* Primes légales */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Primes Légales</h4>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Prime d'ancienneté</span>
                  <span className="text-sm font-medium">{salary.details.bonuses.seniority.toLocaleString('fr-GN')} GNF</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Indemnité de transport</span>
                  <span className="text-sm font-medium">{PAYROLL_CONSTANTS.TRANSPORT_ALLOWANCE.toLocaleString('fr-GN')} GNF</span>
                </div>
              </div>
            </div>

            {/* Primes additionnelles */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Primes Additionnelles</h4>
              <div className="space-y-2">
                {formData.bonuses.map((bonus, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm">{bonus.type}</span>
                    <span className="text-sm font-medium">{bonus.amount.toLocaleString('fr-GN')} GNF</span>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type de prime"
                    value={newBonus.type}
                    onChange={(e) => setNewBonus(prev => ({ ...prev, type: e.target.value }))}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Montant"
                    value={newBonus.amount}
                    onChange={(e) => setNewBonus(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-32 rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={addBonus}
                    className="px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-uims-red hover:bg-uims-red/90"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>

            {/* Retenues légales */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Retenues Légales</h4>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">CNSS (5%)</span>
                  <span className="text-sm font-medium">{salary.details.deductions.cnss.toLocaleString('fr-GN')} GNF</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">ITS</span>
                  <span className="text-sm font-medium">{salary.details.deductions.its.toLocaleString('fr-GN')} GNF</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Taxe professionnelle (1.5%)</span>
                  <span className="text-sm font-medium">{salary.details.deductions.professionalTax.toLocaleString('fr-GN')} GNF</span>
                </div>
              </div>
            </div>

            {/* Retenues additionnelles */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Retenues Additionnelles</h4>
              <div className="space-y-2">
                {formData.deductions.map((deduction, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm">{deduction.type}</span>
                    <span className="text-sm font-medium">{deduction.amount.toLocaleString('fr-GN')} GNF</span>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type de retenue"
                    value={newDeduction.type}
                    onChange={(e) => setNewDeduction(prev => ({ ...prev, type: e.target.value }))}
                    className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Montant"
                    value={newDeduction.amount}
                    onChange={(e) => setNewDeduction(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-32 rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={addDeduction}
                    className="px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-uims-red hover:bg-uims-red/90"
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </div>

            {/* Récapitulatif */}
            <div className="border-t pt-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Salaire Brut</span>
                  <span className="text-sm font-medium">{salary.grossSalary.toLocaleString('fr-GN')} GNF</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Retenues</span>
                  <span className="text-sm font-medium text-red-600">
                    {(salary.grossSalary - salary.netSalary).toLocaleString('fr-GN')} GNF
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg font-medium">
                  <span>Salaire Net</span>
                  <span className="text-uims-red">{salary.netSalary.toLocaleString('fr-GN')} GNF</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
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
              Créer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
