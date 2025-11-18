import { create } from 'zustand';
import notificationApi from '../api/notificationApi';

const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,

  fetchNotifications: async () => {
    set({ isLoading: true });
    try {
      const response = await notificationApi.getNotifications({ limit: 20 });
      set({ notifications: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Fetch notifications error:', error);
    }
  },

  fetchUnreadCount: async () => {
    try {
      const response = await notificationApi.getUnreadCount();
      set({ unreadCount: response.data.count });
    } catch (error) {
      console.error('Fetch unread count error:', error);
    }
  },

  markAsRead: async (id) => {
    try {
      await notificationApi.markAsRead(id);
      const { notifications, unreadCount } = get();
      set({
        notifications: notifications.map(n => 
          n.id === id ? { ...n, status: 'read' } : n
        ),
        unreadCount: Math.max(0, unreadCount - 1),
      });
    } catch (error) {
      console.error('Mark as read error:', error);
    }
  },

  markAllAsRead: async () => {
    try {
      await notificationApi.markAllAsRead();
      const { notifications } = get();
      set({
        notifications: notifications.map(n => ({ ...n, status: 'read' })),
        unreadCount: 0,
      });
    } catch (error) {
      console.error('Mark all as read error:', error);
    }
  },

  deleteNotification: async (id) => {
    try {
      await notificationApi.deleteNotification(id);
      const { notifications } = get();
      set({
        notifications: notifications.filter(n => n.id !== id),
      });
    } catch (error) {
      console.error('Delete notification error:', error);
    }
  },
}));

export default useNotificationStore;