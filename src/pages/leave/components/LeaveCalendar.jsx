import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth } from 'date-fns';
import { fr } from 'date-fns/locale';

const events = [
  {
    id: 1,
    name: 'Jean Dupont',
    type: 'Congés Payés',
    startDate: '2024-02-15',
    endDate: '2024-02-20',
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: 2,
    name: 'Marie Martin',
    type: 'Maladie',
    startDate: '2024-02-10',
    endDate: '2024-02-12',
    color: 'bg-red-100 text-red-800'
  }
];

export default function LeaveCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getEventsForDate = (date) => {
    return events.filter(event => {
      const start = new Date(event.startDate);
      const end = new Date(event.endDate);
      return date >= start && date <= end;
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Calendrier des Absences</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <span className="text-lg font-medium">
            {format(currentDate, 'MMMM yyyy', { locale: fr })}
          </span>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((day) => (
          <div
            key={day}
            className="bg-gray-50 py-2 text-center text-sm font-semibold"
          >
            {day}
          </div>
        ))}
        
        {daysInMonth.map((date, dayIdx) => {
          const dateEvents = getEventsForDate(date);
          return (
            <div
              key={date.toISOString()}
              className={`min-h-[100px] bg-white p-2 ${
                !isSameMonth(date, currentDate) ? 'bg-gray-50' : ''
              } ${isToday(date) ? 'border-2 border-uims-red' : ''}`}
            >
              <time
                dateTime={format(date, 'yyyy-MM-dd')}
                className={`flex h-6 w-6 items-center justify-center rounded-full text-sm ${
                  isToday(date) ? 'bg-uims-red text-white' : ''
                }`}
              >
                {format(date, 'd')}
              </time>
              <div className="mt-2 space-y-1">
                {dateEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`px-2 py-1 text-xs rounded-md ${event.color}`}
                  >
                    {event.name}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
