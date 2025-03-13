import api from './api.service';
import { API_ENDPOINTS } from '../config/api.config';

export const payrollService = {
  // Récupérer la liste des bulletins de paie
  getPayrolls: async (params) => {
    const response = await api.get(API_ENDPOINTS.PAYROLL.BASE, { params });
    return response.data;
  },

  // Récupérer un bulletin de paie spécifique
  getPayrollById: async (id) => {
    const response = await api.get(API_ENDPOINTS.PAYROLL.BY_ID(id));
    return response.data;
  },

  // Créer un nouveau bulletin de paie
  createPayroll: async (payrollData) => {
    const response = await api.post(API_ENDPOINTS.PAYROLL.BASE, payrollData);
    return response.data;
  },

  // Mettre à jour un bulletin de paie
  updatePayroll: async (id, payrollData) => {
    const response = await api.put(API_ENDPOINTS.PAYROLL.BY_ID(id), payrollData);
    return response.data;
  },

  // Valider un bulletin de paie
  validatePayroll: async (id) => {
    const response = await api.post(API_ENDPOINTS.PAYROLL.VALIDATE(id));
    return response.data;
  },

  // Générer les bulletins de paie pour une période
  generatePayrolls: async (period) => {
    const response = await api.post(API_ENDPOINTS.PAYROLL.GENERATE, { period });
    return response.data;
  },

  // Exporter un bulletin de paie
  exportPayroll: async (id, format = 'pdf') => {
    const response = await api.get(API_ENDPOINTS.PAYROLL.EXPORT(id), {
      params: { format },
      responseType: 'blob'
    });
    return response.data;
  },

  // Récupérer les paramètres de paie
  getPayrollSettings: async () => {
    const response = await api.get(API_ENDPOINTS.SETTINGS.PAYROLL);
    return response.data;
  },

  // Mettre à jour les paramètres de paie
  updatePayrollSettings: async (settings) => {
    const response = await api.put(API_ENDPOINTS.SETTINGS.PAYROLL, settings);
    return response.data;
  }
};
