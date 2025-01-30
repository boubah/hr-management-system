import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useDashboardStore = create(
  persist(
    (set) => ({
      preferences: {
        layout: 'grid',
        theme: 'light',
        widgets: ['employees', 'leaves', 'recruitment', 'performance'],
        refreshInterval: 30000, // 30 seconds
      },
      filters: {
        dateRange: 'month',
        department: 'all',
        status: 'all',
      },
      setPreference: (key, value) =>
        set((state) => ({
          preferences: { ...state.preferences, [key]: value },
        })),
      setFilter: (key, value) =>
        set((state) => ({
          filters: { ...state.filters, [key]: value },
        })),
      resetFilters: () =>
        set((state) => ({
          filters: {
            dateRange: 'month',
            department: 'all',
            status: 'all',
          },
        })),
    }),
    {
      name: 'dashboard-preferences',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useDashboardStore;
