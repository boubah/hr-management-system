import api from './api.service';
import { API_ENDPOINTS } from '../config/api.config';

export const authService = {
  login: async (credentials) => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    const { token, refreshToken, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
    return user;
  },

  logout: async () => {
    try {
      await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    }
  },

  refreshToken: async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await api.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, { refreshToken });
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  }
};
