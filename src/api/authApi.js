import axiosClient from './axiosClient.js';

const authApi = {
  login: (credentials) => {
    return axiosClient.post('/auth/login', credentials);
  },

  register: (userData) => {
    return axiosClient.post('/auth/register', userData);
  },

  logout: () => {
    return axiosClient.post('/auth/logout');
  },

  refreshToken: (refreshToken) => {
    return axiosClient.post('/auth/refresh', { refresh_token: refreshToken });
  },

  verifyEmail: (token) => {
    return axiosClient.post('/auth/verify-email', { token });
  },

  forgotPassword: (email) => {
    return axiosClient.post('/auth/forgot-password', { email });
  },

  resetPassword: (token, newPassword) => {
    return axiosClient.post('/auth/reset-password', { 
      token, 
      new_password: newPassword 
    });
  },

  getCurrentUser: () => {
    return axiosClient.get('/auth/me');
  },

  updateProfile: (data) => {
    return axiosClient.put('/auth/profile', data);
  },
};

export default authApi;
