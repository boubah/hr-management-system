import React from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { Menu } from '@headlessui/react';

const notifications = [
  {
    id: 1,
    type: 'request',
    message: 'Nouvelle demande de congés de Marie Martin',
    date: '2024-02-10T10:00:00',
    read: false
  },
  {
    id: 2,
    type: 'approval',
    message: 'Votre demande de congés a été approuvée',
    date: '2024-02-09T15:30:00',
    read: true
  },
  {
    id: 3,
    type: 'reminder',
    message: 'Rappel: Il vous reste 10 jours de congés à prendre',
    date: '2024-02-08T09:00:00',
    read: true
  }
];

export default function NotificationCenter() {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="relative p-2 text-gray-600 hover:text-gray-900">
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-uims-red text-xs text-white">
            {unreadCount}
          </span>
        )}
      </Menu.Button>

      <Menu.Items className="absolute right-0 z-10 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="px-4 py-2 border-b">
          <h3 className="text-sm font-medium">Notifications</h3>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {notifications.map((notification) => (
            <Menu.Item key={notification.id}>
              {({ active }) => (
                <div
                  className={`${
                    active ? 'bg-gray-50' : ''
                  } px-4 py-2 border-b last:border-0 ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <p className="text-sm text-gray-900">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.date).toLocaleString('fr-FR')}
                  </p>
                </div>
              )}
            </Menu.Item>
          ))}
        </div>
        <div className="px-4 py-2 border-t">
          <button className="text-sm text-uims-red hover:text-uims-red/80">
            Marquer tout comme lu
          </button>
        </div>
      </Menu.Items>
    </Menu>
  );
}
