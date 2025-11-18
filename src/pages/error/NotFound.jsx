import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { ROUTES } from '../../utils/constants';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 px-4">
      <div className="text-center fade-in">
        <div className="mb-8">
          <h1 className="text-9xl font-bold gradient-text">404</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
        </div>
        
        <h2 className="text-3xl font-bold mb-4">Trang không tồn tại</h2>
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
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
          <p className="text-sm">Mã lỗi: 404 - Page Not Found</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;