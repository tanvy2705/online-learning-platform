import { useNotifications as useNotificationsContext } from '../context/NotificationContext';

// Re-export for convenience
const useNotifications = () => {
  return useNotificationsContext();
};

export default useNotifications;