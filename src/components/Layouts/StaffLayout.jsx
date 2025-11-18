import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../utils/constants';

const StaffLayout = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: ROUTES.STAFF_DASHBOARD },
    { icon: Users, label: 'Đăng ký', path: ROUTES.STAFF_ENROLLMENTS },
    { icon: HelpCircle, label: 'Hỗ trợ', path: ROUTES.STAFF_SUPPORT },
  ];

  return (
    <div className="flex min-h-screen bg-light-gray">
      <aside className="w-64 bg-white shadow-lg fixed h-full">
        <div className="p-6 border-b">
          <Link to={ROUTES.HOME} className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">EL</span>
            </div>
            <div>
              <span className="block font-bold gradient-text">E-Learning</span>
              <span className="block text-xs text-gray-500">Staff Panel</span>
            </div>
          </Link>
        </div>

        <nav className="p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md'
                    : 'text-gray-700 hover:bg-light-gray'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}

          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg mb-2 text-error hover:bg-red-50 w-full mt-4 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Đăng xuất</span>
          </button>
        </nav>
      </aside>

      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default StaffLayout;