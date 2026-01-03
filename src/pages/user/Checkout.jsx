import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import useAuth from '../../hooks/useAuth';
import usePromotionStore from '../../store/usePromotionStore';
import paymentApi from '../../api/paymentApi';
import { formatCurrency } from '../../utils/formatCurrency';
import { PAYMENT_METHODS } from '../../utils/constants';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, getTotalAmount, clearCart } = useCart();
  const { validatePromoCode, appliedPromo, clearAppliedPromo } = usePromotionStore();
  
  // Default to VNPay
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.VNPAY);
  const [promoCode, setPromoCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoError, setPromoError] = useState('');

  useEffect(() => {
    // Kiểm tra đăng nhập
    if (!user) {
      alert('Vui lòng đăng nhập để thanh toán!');
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }

    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate, user]);

  const baseAmount = getTotalAmount();
  const discountAmount = appliedPromo 
    ? (baseAmount * appliedPromo.discount_percent) / 100 
    : 0;
  const finalAmount = baseAmount - discountAmount;

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    
    setIsValidating(true);
    setPromoError('');
    const result = await validatePromoCode(promoCode);
    setIsValidating(false);

    if (result.success) {
      alert('Áp dụng mã giảm giá thành công!');
    } else {
      setPromoError(result.error);
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // Kiểm tra giỏ hàng trước
      if (cart.length === 0) {
        alert('Giỏ hàng trống!');
        navigate('/cart');
        return;
      }

      console.log('🛒 Starting payment process...');
      console.log('💳 Payment method:', paymentMethod);
      
      // Bước 1: Tạo order từ cart
      const orderResponse = await paymentApi.createOrder({
        promo_code: appliedPromo?.code
      });

      console.log('✅ Order response:', orderResponse);

      if (!orderResponse.data || !orderResponse.data.order_id) {
        throw new Error('Không nhận được thông tin đơn hàng');
      }

      const orderId = orderResponse.data.order_id;

      // Bước 2: Lấy payment URL
      const paymentResponse = await paymentApi.getPaymentUrl(
        orderId,
        paymentMethod
      );

      console.log('✅ Payment response:', paymentResponse);

      // Bước 3: Xử lý theo từng payment method
      if (paymentMethod === PAYMENT_METHODS.VNPAY || paymentMethod === PAYMENT_METHODS.MOMO) {
        // Redirect đến cổng thanh toán VNPay/MoMo
        if (paymentResponse.data && paymentResponse.data.payment_url) {
          console.log('🔄 Redirecting to payment gateway...');
          window.location.href = paymentResponse.data.payment_url;
        } else {
          throw new Error('Không nhận được payment URL');
        }
      } else if (paymentMethod === PAYMENT_METHODS.MANUAL_TRANSFER) {
        // Chuyển sang trang upload bill
        navigate('/upload-transfer-bill', { 
          state: { 
            orderId,
            transferInfo: paymentResponse.data.transfer_info 
          } 
        });
      } else {
        throw new Error('Phương thức thanh toán không được hỗ trợ');
      }
    } catch (error) {
      console.error('❌ Payment error:', error);
      
      // Xử lý lỗi 401 - chưa đăng nhập
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        alert('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!');
        navigate('/login', { state: { from: '/checkout' } });
        return;
      }
      
      // Xử lý lỗi giỏ hàng trống
      if (error.message.includes('Cart is empty')) {
        alert('Giỏ hàng trống. Vui lòng thêm khóa học vào giỏ hàng!');
        navigate('/cart');
        return;
      }
      
      // Xử lý lỗi khác
      alert(error.message || 'Có lỗi xảy ra khi xử lý thanh toán. Vui lòng thử lại!');
      setIsProcessing(false);
    }
  };

  // Payment methods - chỉ hiển thị những cái được backend hỗ trợ
  const paymentMethods = [
    { 
      id: PAYMENT_METHODS.VNPAY, 
      name: 'VNPay', 
      logo: '🏦',
      description: 'Thanh toán qua VNPay (ATM, Visa, MasterCard)'
    },
    { 
      id: PAYMENT_METHODS.MOMO, 
      name: 'MoMo', 
      logo: '💳',
      description: 'Ví điện tử MoMo'
    },
    { 
      id: PAYMENT_METHODS.MANUAL_TRANSFER, 
      name: 'Chuyển khoản', 
      logo: '🏧',
      description: 'Chuyển khoản ngân hàng thủ công'
    },
  ];

  return (
    <div className="py-12 bg-light-gray min-h-screen">
      <div className="container max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 fade-in">Thanh toán</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="card fade-in">
              <h2 className="font-semibold text-xl mb-4 flex items-center gap-2">
                <CreditCard className="w-6 h-6" />
                Phương thức thanh toán
              </h2>

              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full p-4 border-2 rounded-lg transition-all text-left ${
                      paymentMethod === method.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    aria-label={`Chọn phương thức ${method.name}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{method.logo}</div>
                      <div className="flex-1">
                        <div className="font-medium text-lg">{method.name}</div>
                        <div className="text-sm text-gray-600">{method.description}</div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 ${
                        paymentMethod === method.id 
                          ? 'border-primary bg-primary' 
                          : 'border-gray-300'
                      }`}>
                        {paymentMethod === method.id && (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="card fade-in" style={{ animationDelay: '0.1s' }}>
              <h2 className="font-semibold text-xl mb-4 flex items-center gap-2">
                <Tag className="w-6 h-6" />
                Mã giảm giá
              </h2>

              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Nhập mã giảm giá"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="input flex-1"
                  disabled={!!appliedPromo}
                />
                {appliedPromo ? (
                  <button
                    onClick={() => {
                      clearAppliedPromo();
                      setPromoCode('');
                      setPromoError('');
                    }}
                    className="btn btn-outline"
                  >
                    Xóa
                  </button>
                ) : (
                  <button
                    onClick={handleApplyPromo}
                    disabled={isValidating || !promoCode.trim()}
                    className="btn btn-primary"
                  >
                    {isValidating ? <div className="spinner w-5 h-5"></div> : 'Áp dụng'}
                  </button>
                )}
              </div>

              {promoError && (
                <p className="text-error text-sm mt-2">{promoError}</p>
              )}

              {appliedPromo && (
                <div className="mt-3 p-3 bg-green-50 text-success rounded-lg text-sm">
                  Đã áp dụng mã giảm giá {appliedPromo.discount_percent}%
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card sticky top-24 fade-in" style={{ animationDelay: '0.2s' }}>
              <h3 className="font-semibold text-lg mb-4">Chi tiết đơn hàng</h3>

              <div className="space-y-2 mb-4 pb-4 border-b">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="line-clamp-1">{item.course.title}</span>
                    <span className="font-medium">
                      {formatCurrency(item.course.discount_price || item.course.price)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 mb-4 pb-4 border-b">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính:</span>
                  <span>{formatCurrency(baseAmount)}</span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-success">
                    <span>Giảm giá ({appliedPromo.discount_percent}%):</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-semibold text-lg">Tổng cộng:</span>
                <span className="text-2xl font-bold text-primary">
                  {formatCurrency(finalAmount)}
                </span>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="btn btn-primary w-full"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="spinner w-5 h-5"></div>
                    <span>Đang xử lý...</span>
                  </div>
                ) : (
                  'Thanh toán ngay'
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                Bằng việc thanh toán, bạn đồng ý với điều khoản sử dụng của chúng tôi
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;