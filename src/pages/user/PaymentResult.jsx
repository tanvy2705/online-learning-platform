import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { ROUTES } from '../../utils/constants';

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const [status, setStatus] = useState('loading');
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    const processPaymentResult = () => {
      // VNPay và MoMo redirect về backend trước
      // Backend xử lý và redirect về đây với URL params
      const params = Object.fromEntries(searchParams);
      
      console.log('📊 Payment result params:', params);

      // Check if it's a success or failed result based on URL params
      // Backend sẽ redirect về:
      // - Success: /payment-result?orderId=XXX&amount=XXX&transactionNo=XXX
      // - Failed: /payment-result?orderId=XXX&code=XX&message=XXX

      const orderId = params.orderId;
      const amount = params.amount;
      const transactionNo = params.transactionNo;
      const errorCode = params.code;
      const errorMessage = params.message;

      if (transactionNo || amount) {
        // Success case
        setStatus('success');
        setPaymentData({
          transaction_code: orderId,
          transaction_no: transactionNo,
          amount: parseFloat(amount),
          payment_method: 'vnpay',
          created_at: new Date().toISOString()
        });
        
        // Clear cart on success
        clearCart();
        
        console.log('✅ Payment successful');
      } else if (errorCode || errorMessage) {
        // Failed case
        setStatus('failed');
        setPaymentData({
          error_message: decodeURIComponent(errorMessage || 'Thanh toán thất bại'),
          error_code: errorCode
        });
        
        console.log('❌ Payment failed:', errorCode, errorMessage);
      } else {
        // Pending or unknown
        setStatus('pending');
        console.log('⏳ Payment pending');
      }
    };

    // Small delay to show loading state
    const timer = setTimeout(() => {
      processPaymentResult();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchParams, clearCart]);

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <div className="text-center">
            <div className="spinner mx-auto mb-4 w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
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
                  {paymentData.transaction_code && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mã đơn hàng:</span>
                      <span className="font-medium">{paymentData.transaction_code}</span>
                    </div>
                  )}
                  {paymentData.transaction_no && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mã giao dịch:</span>
                      <span className="font-medium">{paymentData.transaction_no}</span>
                    </div>
                  )}
                  {paymentData.amount && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Số tiền:</span>
                      <span className="font-medium text-success">
                        {formatCurrency(paymentData.amount)}
                      </span>
                    </div>
                  )}
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
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 max-w-md mx-auto">
                <p className="text-sm text-error">{paymentData.error_message}</p>
                {paymentData.error_code && (
                  <p className="text-xs text-gray-500 mt-2">Mã lỗi: {paymentData.error_code}</p>
                )}
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <Link to={ROUTES.CHECKOUT} className="btn btn-primary">
                Thử lại
              </Link>
              <Link to={ROUTES.CART} className="btn btn-outline">
                Quay lại giỏ hàng
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
              <Link to="/notifications" className="btn btn-outline">
                Xem thông báo
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