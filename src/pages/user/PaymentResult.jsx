import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import paymentApi from '../../api/paymentApi';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { ROUTES } from '../../utils/constants';

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const [status, setStatus] = useState('loading');
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const handlePaymentCallback = async () => {
      const params = Object.fromEntries(searchParams);
      
      try {
        const response = await paymentApi.handlePaymentCallback(params);
        setPaymentData(response.data);
        
        if (response.data.status === 'success') {
          setStatus('success');
          clearCart();
        } else if (response.data.status === 'failed') {
          setStatus('failed');
        } else {
          setStatus('pending');
        }
      } catch (error) {
        setStatus('failed');
        console.error('Payment callback error:', error);
      }
    };

    handlePaymentCallback();
  }, [searchParams]);

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="text-center">
            <div className="spinner mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold mb-2">Đang xử lý thanh toán...</h2>
            <p className="text-gray-600">Vui lòng đợi trong giây lát</p>
          </div>
        );

      case 'success':
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-12 h-12 text-success" />
            </div>
            <h2 className="text-3xl font-bold text-success mb-4">Thanh toán thành công!</h2>
            <p className="text-gray-600 text-lg mb-8">
              Cảm ơn bạn đã tin tưởng và đăng ký khóa học
            </p>

            {paymentData && (
              <div className="bg-light-gray rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
                <h3 className="font-semibold text-lg mb-4">Thông tin thanh toán</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mã giao dịch:</span>
                    <span className="font-medium">{paymentData.transaction_code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số tiền:</span>
                    <span className="font-medium text-success">
                      {formatCurrency(paymentData.amount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phương thức:</span>
                    <span className="font-medium uppercase">{paymentData.payment_method}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Thời gian:</span>
                    <span className="font-medium">
                      {new Date(paymentData.created_at).toLocaleString('vi-VN')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <Link to="/my-courses" className="btn btn-primary">
                Xem khóa học của tôi
              </Link>
              <Link to={ROUTES.COURSES} className="btn btn-outline">
                Tiếp tục khám phá
              </Link>
            </div>
          </div>
        );

      case 'failed':
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-error/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-12 h-12 text-error" />
            </div>
            <h2 className="text-3xl font-bold text-error mb-4">Thanh toán thất bại!</h2>
            <p className="text-gray-600 text-lg mb-8">
              Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.
            </p>

            {paymentData?.error_message && (
              <div className="bg-red-50 text-error rounded-lg p-4 mb-8 max-w-md mx-auto">
                <p className="text-sm">{paymentData.error_message}</p>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <Link to={ROUTES.CART} className="btn btn-primary">
                Quay lại giỏ hàng
              </Link>
              <Link to={ROUTES.COURSES} className="btn btn-outline">
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        );

      case 'pending':
        return (
          <div className="text-center">
            <div className="w-20 h-20 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-12 h-12 text-warning" />
            </div>
            <h2 className="text-3xl font-bold text-warning mb-4">Đang xử lý...</h2>
            <p className="text-gray-600 text-lg mb-8">
              Thanh toán của bạn đang được xử lý. Chúng tôi sẽ thông báo khi hoàn tất.
            </p>

            <div className="flex gap-4 justify-center">
              <Link to={ROUTES.HOME} className="btn btn-primary">
                Về trang chủ
              </Link>
              <Link to="/payment-history" className="btn btn-outline">
                Lịch sử giao dịch
              </Link>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-light-gray flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <div className="card fade-in">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default PaymentResult;