export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH_TOKEN: '/auth/refresh-token',
    LOGOUT: '/auth/logout'
  },
  EMPLOYEES: {
    BASE: '/employees',
    BY_ID: (id) => `/employees/${id}`,
    DOCUMENTS: (id) => `/employees/${id}/documents`,
    CONTRACTS: (id) => `/employees/${id}/contracts`
  },
  PAYROLL: {
    BASE: '/payroll',
    SLIPS: '/payroll/slips',
    BY_ID: (id) => `/payroll/${id}`,
    GENERATE: '/payroll/generate',
    VALIDATE: (id) => `/payroll/${id}/validate`,
    EXPORT: (id) => `/payroll/${id}/export`
  },
  SETTINGS: {
    BASE: '/settings',
    PAYROLL: '/settings/payroll',
    COMPANY: '/settings/company'
  }
};
