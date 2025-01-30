import React from 'react';
import { Switch } from '@headlessui/react';
import useDashboardStore from '../../store/dashboardStore';

export default function DashboardSettings() {
  const { preferences, setPreference } = useDashboardStore();

  const refreshIntervals = [
    { value: 15000, label: '15 seconds' },
    { value: 30000, label: '30 seconds' },
    { value: 60000, label: '1 minute' },
    { value: 300000, label: '5 minutes' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Dashboard Settings
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Customize your dashboard experience
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Auto-refresh Interval
          </label>
          <select
            value={preferences.refreshInterval}
            onChange={(e) => setPreference('refreshInterval', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
          >
            {refreshIntervals.map((interval) => (
              <option key={interval.value} value={interval.value}>
                {interval.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Visible Widgets
          </label>
          <div className="mt-2 space-y-2">
            {['employees', 'leaves', 'recruitment', 'performance'].map((widget) => (
              <div key={widget} className="flex items-center">
                <Switch
                  checked={preferences.widgets.includes(widget)}
                  onChange={(checked) => {
                    const newWidgets = checked
                      ? [...preferences.widgets, widget]
                      : preferences.widgets.filter((w) => w !== widget);
                    setPreference('widgets', newWidgets);
                  }}
                  className={`${
                    preferences.widgets.includes(widget) ? 'bg-uims-red' : 'bg-gray-200'
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-uims-red focus:ring-offset-2`}
                >
                  <span
                    className={`${
                      preferences.widgets.includes(widget) ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
                <span className="ml-3 text-sm text-gray-900">
                  {widget.charAt(0).toUpperCase() + widget.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Theme
          </label>
          <div className="mt-2">
            <select
              value={preferences.theme}
              onChange={(e) => setPreference('theme', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-uims-red focus:ring-uims-red sm:text-sm"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
