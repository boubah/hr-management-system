import React from 'react';

export default function StatCard({ stat }) {
  return (
    <div className="bg-uims-red rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white/80">{stat.name}</p>
          <p className="mt-1 text-2xl font-semibold">
            {stat.value}
          </p>
          <p className={`mt-1 text-sm flex items-center ${
            stat.change.startsWith('+') ? 'text-green-300' : 'text-red-300'
          }`}>
            {stat.change}
          </p>
        </div>
        <div className="bg-white/10 p-3 rounded-lg">
          <stat.icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
}
