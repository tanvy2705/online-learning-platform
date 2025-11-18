import axiosClient from './axiosClient';

const notificationApi = {
  getNotifications: (params) => {
    return axiosClient.get('/notifications', { params });
  },

  getUnreadCount: () => {
    return axiosClient.get('/notifications/unread-count');
  },

  markAsRead: (id) => {
    return axiosClient.put(`/notifications/${id}/read`);
  },

  markAllAsRead: () => {
    return axiosClient.put('/notifications/read-all');
  },

  deleteNotification: (id) => {
    return axiosClient.delete(`/notifications/${id}`);
  },

  sendNotification: (notificationData) => {
    return axiosClient.post('/notifications/send', notificationData);
  },

  sendBulkNotification: (notificationData) => {
    return axiosClient.post('/notifications/send-bulk', notificationData);
  },

  getNotificationSettings: () => {
    return axiosClient.get('/notifications/settings');
  },

  updateNotificationSettings: (settings) => {
    return axiosClient.put('/notifications/settings', settings);
  },
};

export default notificationApi;