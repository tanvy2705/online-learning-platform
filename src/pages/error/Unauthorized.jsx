import { Link } from 'react-router-dom';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';
import { ROUTES } from '../../utils/constants';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-error/10 to-warning/10 px-4">
      <div className="text-center fade-in">
        <div className="w-24 h-24 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-12 h-12 text-error" />
        </div>
        
        <h1 className="text-6xl font-bold text-error mb-4">403</h1>
        <h2 className="text-3xl font-bold mb-4">Truy cập bị từ chối</h2>
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên nếu bạn cho rằng đây là lỗi.
        </p>

        <div className="flex gap-4 justify-center">
          <Link to={ROUTES.HOME} className="btn btn-primary flex items-center gap-2">
            <Home className="w-5 h-5" />
            Về trang chủ
          </Link>
          <button onClick={() => window.history.back()} className="btn btn-outline flex items-center gap-2">
            <ArrowLeft className="w-5 h-5" />
            Quay lại
          </button>
        </div>

        <div className="mt-12 text-gray-400">
          <p className="text-sm">Mã lỗi: 403 - Forbidden</p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;