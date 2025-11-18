import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import authApi from '../../api/authApi';
import { validateForm } from '../../utils/validateForm';
import { ROUTES } from '../../utils/constants';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    const validationErrors = validateForm({ email }, {
      email: { required: true, email: true },
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await authApi.forgotPassword(email);
      setSuccess(true);
    } catch (error) {
      setApiError(error.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 py-12 px-4">
        <div className="max-w-md w-full">
          <div className="card text-center fade-in">
            <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-success" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Kiểm tra email của bạn</h2>
            <p className="text-gray-600 mb-6">
              Chúng tôi đã gửi link đặt lại mật khẩu đến email <strong>{email}</strong>
            </p>
            <Link to={ROUTES.LOGIN} className="btn btn-primary w-full">
              Quay lại đăng nhập
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8 fade-in">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-3xl">EL</span>
          </div>
          <h2 className="text-3xl font-bold gradient-text">Quên mật khẩu?</h2>
          <p className="text-gray-600 mt-2">Nhập email để đặt lại mật khẩu</p>
        </div>

        <div className="card fade-in" style={{ animationDelay: '0.2s' }}>
          <form onSubmit={handleSubmit}>
            {apiError && (
              <div className="bg-red-50 text-error p-3 rounded-lg mb-4 text-sm">
                {apiError}
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({});
                  }}
                  className={`input pl-10 ${errors.email ? 'input-error' : ''}`}
                  placeholder="example@email.com"
                />
              </div>
              {errors.email && (
                <p className="text-error text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full mb-4"
            >
              {isLoading ? <div className="spinner w-5 h-5 mx-auto"></div> : 'Gửi link đặt lại'}
            </button>

            <Link 
              to={ROUTES.LOGIN} 
              className="flex items-center justify-center gap-2 text-primary hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Quay lại đăng nhập
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;