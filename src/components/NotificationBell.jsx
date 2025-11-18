import { useState } from 'react';
import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNotifications } from '../context/NotificationContext';
import NotificationList from './NotificationList.jsx';
import { ROUTES } from '../utils/constants.js';

const NotificationBell = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { unreadCount } = useNotifications();

  return (
    <div className="relative">
      <button 
        className="relative"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <Bell className="w-6 h-6 text-gray-700 hover:text-primary transition-colors" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-error text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setShowDropdown(false)}
          />
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-20 slide-down">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold">Thông báo</h3>
              <Link 
                to={ROUTES.NOTIFICATIONS}
                className="text-sm text-primary hover:underline"
                onClick={() => setShowDropdown(false)}
              >
                Xem tất cả
              </Link>
            </div>
            <NotificationList limit={5} />
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;