import api from './api';

export const authService = {
  async register({ username, email, password, password_confirm }) {
    const { data } = await api.post('/api/auth/register/', {
      username,
      email,
      password,
      password_confirm,
    });
    return data;
  },

  async login({ email, password }) {
    const { data } = await api.post('/api/auth/login/', {
      email,
      password,
    });
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    return data;
  },

  async getProfile() {
    const { data } = await api.get('/api/auth/profile/');
    return data;
  },

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  isAuthenticated() {
    return !!localStorage.getItem('access_token');
  },
};
