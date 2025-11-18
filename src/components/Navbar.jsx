import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';
import NotificationBell from './NotificationBell';
import { ROUTES, ROLES } from '../utils/constants';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link to={ROUTES.HOME} className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">EL</span>
            </div>
            <span className="text-xl font-bold gradient-text">E-Learning</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link to={ROUTES.COURSES} className="nav-link">
              Khóa học
            </Link>

            {isAuthenticated ? (
              <>
                <Link to={ROUTES.CART} className="relative">
                  <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-primary transition-colors" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-error text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>

                <NotificationBell />

                <div className="relative group">
                  <button className="flex items-center gap-2 hover:text-primary transition-colors">
                    <User className="w-6 h-6" />
                    <span className="font-medium">{user?.full_name}</span>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all slide-down">
                    {user?.role_id === ROLES.ADMIN && (
                      <Link to={ROUTES.ADMIN_DASHBOARD} className="block px-4 py-2 hover:bg-light-gray">
                        Quản trị
                      </Link>
                    )}
                    {user?.role_id === ROLES.STAFF && (
                      <Link to={ROUTES.STAFF_DASHBOARD} className="block px-4 py-2 hover:bg-light-gray">
                        Nhân viên
                      </Link>
                    )}
                    <Link to="/profile" className="block px-4 py-2 hover:bg-light-gray">
                      Tài khoản
                    </Link>
                    <Link to="/my-courses" className="block px-4 py-2 hover:bg-light-gray">
                      Khóa học của tôi
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-light-gray flex items-center gap-2 text-error"
                    >
                      <LogOut className="w-4 h-4" />
                      Đăng xuất
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN} className="btn btn-outline">
                  Đăng nhập
                </Link>
                <Link to={ROUTES.REGISTER} className="btn btn-primary">
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .nav-link {
          color: var(--dark);
          font-weight: 500;
          transition: color 0.3s ease;
        }
        .nav-link:hover {
          color: var(--primary);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;