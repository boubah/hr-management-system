import React from 'react';

const balances = [
  {
    type: 'Congés Payés',
    acquired: 25,
    taken: 12,
    pending: 2,
    remaining: 11
  },
  {
    type: 'RTT',
    acquired: 12,
    taken: 5,
    pending: 1,
    remaining: 6
  },
  {
    type: 'Maladie',
    acquired: 3,
    taken: 1,
    pending: 0,
    remaining: 2
  }
];

export default function LeaveBalance() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Solde des Congés</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {balances.map((balance) => (
          <div
            key={balance.type}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <p className="truncate text-sm font-medium text-gray-500">{balance.type}</p>
            </dt>
            <dd className="flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-uims-black">
                {balance.remaining} jours
              </p>
              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Acquis</span>
                    <span>{balance.acquired} jours</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Pris</span>
                    <span>{balance.taken} jours</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>En attente</span>
                    <span>{balance.pending} jours</span>
                  </div>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </div>
    </div>
  );
}
