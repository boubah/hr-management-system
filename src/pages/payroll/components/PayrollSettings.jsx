import React, { useState } from 'react';
import { Switch } from '@headlessui/react';

export default function PayrollSettings() {
  const [settings, setSettings] = useState({
    automaticPayment: false,
    emailNotifications: true,
    archivePayslips: true,
  });

  // Paramètres de base
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    address: '',
    nifu: '', // Numéro d'Identification Fiscale Unique
    employerNumber: '', // Numéro employeur CNSS
  });

  // Paramètres CNSS
  const [cnssSettings, setCnssSettings] = useState({
    employerRate: 18, // 18% part patronale
    employeeRate: 5,  // 5% part salariale
    ceiling: 2500000, // Plafond mensuel en GNF
  });

  // Paramètres fiscaux
  const [taxSettings, setTaxSettings] = useState({
    professionalTax: 1.5, // Taxe professionnelle 1.5%
    itsBrackets: [
      { min: 0, max: 1000000, rate: 0 },
      { min: 1000001, max: 5000000, rate: 10 },
      { min: 5000001, max: 10000000, rate: 15 },
      { min: 10000001, max: null, rate: 20 }
    ]
  });

  // Primes et indemnités légales
  const [benefitsSettings, setBenefitsSettings] = useState({
    transportAllowance: 50000, // Indemnité de transport en GNF
    seniorityBonuses: [
      { years: 3, rate: 3 },
      { years: 5, rate: 5 },
      { years: 10, rate: 7 },
      { years: 15, rate: 9 }
    ],
    mealAllowance: 0, // À définir si applicable
    housingAllowance: 0 // À définir si applicable
  });

  return (
    <div className="space-y-8">
      {/* Informations de l'entreprise */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Informations de l'Entreprise</h3>
        <div className="bg-white rounded-lg shadow-sm p-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom de l'entreprise
            </label>
            <input
              type="text"
              value={companyInfo.name}
              onChange={(e) => setCompanyInfo(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              NIFU
            </label>
            <input
              type="text"
              value={companyInfo.nifu}
              onChange={(e) => setCompanyInfo(prev => ({ ...prev, nifu: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Numéro Employeur CNSS
            </label>
            <input
              type="text"
              value={companyInfo.employerNumber}
              onChange={(e) => setCompanyInfo(prev => ({ ...prev, employerNumber: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Adresse
            </label>
            <input
              type="text"
              value={companyInfo.address}
              onChange={(e) => setCompanyInfo(prev => ({ ...prev, address: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Paramètres CNSS */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Paramètres CNSS</h3>
        <div className="bg-white rounded-lg shadow-sm p-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Part Patronale (%)
            </label>
            <input
              type="number"
              value={cnssSettings.employerRate}
              onChange={(e) => setCnssSettings(prev => ({ ...prev, employerRate: Number(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Part Salariale (%)
            </label>
            <input
              type="number"
              value={cnssSettings.employeeRate}
              onChange={(e) => setCnssSettings(prev => ({ ...prev, employeeRate: Number(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Plafond Mensuel (GNF)
            </label>
            <input
              type="number"
              value={cnssSettings.ceiling}
              onChange={(e) => setCnssSettings(prev => ({ ...prev, ceiling: Number(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Barème ITS */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Barème ITS</h3>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            {taxSettings.itsBrackets.map((bracket, index) => (
              <div key={index} className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Minimum (GNF)
                  </label>
                  <input
                    type="number"
                    value={bracket.min}
                    onChange={(e) => {
                      const newBrackets = [...taxSettings.itsBrackets];
                      newBrackets[index].min = Number(e.target.value);
                      setTaxSettings(prev => ({ ...prev, itsBrackets: newBrackets }));
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Maximum (GNF)
                  </label>
                  <input
                    type="number"
                    value={bracket.max || ''}
                    onChange={(e) => {
                      const newBrackets = [...taxSettings.itsBrackets];
                      newBrackets[index].max = e.target.value ? Number(e.target.value) : null;
                      setTaxSettings(prev => ({ ...prev, itsBrackets: newBrackets }));
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Taux (%)
                  </label>
                  <input
                    type="number"
                    value={bracket.rate}
                    onChange={(e) => {
                      const newBrackets = [...taxSettings.itsBrackets];
                      newBrackets[index].rate = Number(e.target.value);
                      setTaxSettings(prev => ({ ...prev, itsBrackets: newBrackets }));
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Primes et Indemnités */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Primes et Indemnités</h3>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Indemnité de Transport (GNF)
              </label>
              <input
                type="number"
                value={benefitsSettings.transportAllowance}
                onChange={(e) => setBenefitsSettings(prev => ({ 
                  ...prev, 
                  transportAllowance: Number(e.target.value)
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
              />
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-4">Prime d'Ancienneté</h4>
              <div className="space-y-4">
                {benefitsSettings.seniorityBonuses.map((bonus, index) => (
                  <div key={index} className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Années de Service
                      </label>
                      <input
                        type="number"
                        value={bonus.years}
                        onChange={(e) => {
                          const newBonuses = [...benefitsSettings.seniorityBonuses];
                          newBonuses[index].years = Number(e.target.value);
                          setBenefitsSettings(prev => ({ ...prev, seniorityBonuses: newBonuses }));
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Taux (%)
                      </label>
                      <input
                        type="number"
                        value={bonus.rate}
                        onChange={(e) => {
                          const newBonuses = [...benefitsSettings.seniorityBonuses];
                          newBonuses[index].rate = Number(e.target.value);
                          setBenefitsSettings(prev => ({ ...prev, seniorityBonuses: newBonuses }));
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton de sauvegarde */}
      <div className="flex justify-end">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-uims-red hover:bg-uims-red/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-uims-red"
        >
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
}
