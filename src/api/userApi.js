import axiosClient from './axiosClient';

const userApi = {
  getAllUsers: (params) => {
    return axiosClient.get('/users', { params });
  },

  getUserById: (id) => {
    return axiosClient.get(`/users/${id}`);
  },

  createUser: (userData) => {
    return axiosClient.post('/users', userData);
  },

  updateUser: (id, userData) => {
    return axiosClient.put(`/users/${id}`, userData);
  },

  deleteUser: (id) => {
    return axiosClient.delete(`/users/${id}`);
  },

  updateProfile: (userData) => {
    return axiosClient.put('/users/profile', userData);
  },

  updateAvatar: (formData) => {
    return axiosClient.post('/users/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  changePassword: (passwordData) => {
    return axiosClient.post('/users/change-password', passwordData);
  },

  getUserStats: (userId) => {
    return axiosClient.get(`/users/${userId}/stats`);
  },

  updateUserStatus: (id, status) => {
    return axiosClient.patch(`/users/${id}/status`, { status });
  },

  assignRole: (id, roleId) => {
    return axiosClient.patch(`/users/${id}/role`, { role_id: roleId });
  },
};

export default userApi;