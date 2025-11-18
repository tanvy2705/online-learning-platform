import { useEffect } from 'react';
import { Bell, Trash2, CheckCheck } from 'lucide-react';
import { useNotifications } from '../../context/NotificationContext';
import NotificationList from '../../components/NotificationList';

const Notifications = () => {
  const { notifications, unreadCount, markAllAsRead, deleteNotification, fetchNotifications } = useNotifications();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    await markAllAsRead();
  };

  const handleDelete = async (id) => {
    if (confirm('Bạn có chắc muốn xóa thông báo này?')) {
      await deleteNotification(id);
    }
  };

  return (
    <div className="min-h-screen bg-light-gray py-12">
      <div className="container max-w-4xl">
        <div className="flex items-center justify-between mb-8 fade-in">
          <div className="flex items-center gap-3">
            <Bell className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Thông báo</h1>
              <p className="text-gray-600">
                {unreadCount > 0 ? `${unreadCount} thông báo chưa đọc` : 'Không có thông báo mới'}
              </p>
            </div>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="btn btn-outline flex items-center gap-2"
            >
              <CheckCheck className="w-5 h-5" />
              Đánh dấu tất cả đã đọc
            </button>
          )}
        </div>

        <div className="card fade-in" style={{ animationDelay: '0.2s' }}>
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Chưa có thông báo nào</p>
            </div>
          ) : (
            <NotificationList />
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;