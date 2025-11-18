import { useNotifications } from '../context/NotificationContext';
import { Bell, CreditCard, BookOpen, HelpCircle } from 'lucide-react';
import { NOTIFICATION_TYPES } from '../utils/constants';


const NotificationList = ({ limit }) => {
  const { notifications, isLoading, markAsRead } = useNotifications();

  const getIcon = (type) => {
    switch (type) {
      case NOTIFICATION_TYPES.PAYMENT:
        return <CreditCard className="w-5 h-5 text-success" />;
      case NOTIFICATION_TYPES.COURSE:
        return <BookOpen className="w-5 h-5 text-primary" />;
      case NOTIFICATION_TYPES.SUPPORT:
        return <HelpCircle className="w-5 h-5 text-warning" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return 'Vừa xong';
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
    return `${Math.floor(diff / 86400)} ngày trước`;
  };

  const handleNotificationClick = async (notification) => {
    if (notification.status === 'unread') {
      await markAsRead(notification.id);
    }
  };

  const displayedNotifications = limit 
    ? notifications.slice(0, limit) 
    : notifications;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="spinner"></div>
      </div>
    );
  }

  if (displayedNotifications.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <Bell className="w-12 h-12 mx-auto mb-2 opacity-30" />
        <p>Không có thông báo mới</p>
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      {displayedNotifications.map((notification) => (
        <div
          key={notification.id}
          onClick={() => handleNotificationClick(notification)}
          className={`p-4 border-b hover:bg-light-gray cursor-pointer transition-colors ${
            notification.status === 'unread' ? 'bg-blue-50' : ''
          }`}
        >
          <div className="flex gap-3">
            <div className="flex-shrink-0 mt-1">
              {getIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h4 className={`font-medium text-sm ${
                  notification.status === 'unread' ? 'text-dark' : 'text-gray-600'
                }`}>
                  {notification.title}
                </h4>
                {notification.status === 'unread' && (
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1"></div>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {notification.message}
              </p>
              <span className="text-xs text-gray-400 mt-1 block">
                {formatTime(notification.created_at)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;