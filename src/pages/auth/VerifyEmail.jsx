import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';
import authApi from '../../api/authApi';
import { ROUTES } from '../../utils/constants';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setStatus('error');
      setMessage('Token xác thực không hợp lệ');
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await authApi.verifyEmail(token);
        setStatus('success');
        setMessage(response.message || 'Xác thực email thành công!');
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Xác thực thất bại');
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="card text-center fade-in">
          {status === 'loading' && (
            <>
              <div className="spinner mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold mb-2">Đang xác thực...</h2>
              <p className="text-gray-600">Vui lòng đợi trong giây lát</p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-success mb-4">Xác thực thành công!</h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <Link to={ROUTES.LOGIN} className="btn btn-primary w-full">
                Đăng nhập ngay
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-10 h-10 text-error" />
              </div>
              <h2 className="text-2xl font-bold text-error mb-4">Xác thực thất bại</h2>
              <p className="text-gray-600 mb-6">{message}</p>
              <Link to={ROUTES.REGISTER} className="btn btn-primary w-full">
                Đăng ký lại
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;