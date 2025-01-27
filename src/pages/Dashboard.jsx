import { UserGroupIcon, BriefcaseIcon, CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const stats = [
  { name: 'Total Employés', stat: '71', icon: UserGroupIcon },
  { name: 'Postes Ouverts', stat: '12', icon: BriefcaseIcon },
  { name: 'Demandes de Congés en Attente', stat: '5', icon: CalendarIcon },
  { name: 'Masse Salariale Mensuelle', stat: '124 000 €', icon: CurrencyDollarIcon },
];

export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-bold leading-7 text-uims-black sm:truncate sm:text-3xl sm:tracking-tight">
        Tableau de Bord
      </h2>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-uims-red p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-uims-black">{item.stat}</p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
