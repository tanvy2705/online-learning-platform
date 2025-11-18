import { createContext, useContext, useEffect } from 'react';
import useNotificationStore from '../store/useNotificationStore';
import { useAuth } from './AuthContext';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const notificationStore = useNotificationStore();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      notificationStore.fetchNotifications();
      notificationStore.fetchUnreadCount();

      // Polling every 30 seconds for real-time notifications
      const interval = setInterval(() => {
        notificationStore.fetchUnreadCount();
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  return (
    <NotificationContext.Provider value={notificationStore}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

export default NotificationContext;