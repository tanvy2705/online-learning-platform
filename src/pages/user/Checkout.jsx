import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import usePromotionStore from '../../store/usePromotionStore';
import paymentApi from '../../api/paymentApi';
import { formatCurrency } from '../../utils/formatCurrency';
import { PAYMENT_METHODS } from '../../utils/constants';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getTotalAmount, clearCart } = useCart();
  const { validatePromoCode, appliedPromo, clearAppliedPromo } = usePromotionStore();
  
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS.VNPAY);
  const [promoCode, setPromoCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoError, setPromoError] = useState('');

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

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
      const orderResponse = await paymentApi.createOrder({
        course_ids: cart.map(item => item.course_id),
        promo_code: appliedPromo?.code,
        total_amount: finalAmount,
      });

      const paymentResponse = await paymentApi.getPaymentUrl(
        orderResponse.data.id,
        paymentMethod
      );

      if (paymentResponse.data.payment_url) {
        window.location.href = paymentResponse.data.payment_url;
      }
    } catch (error) {
      alert('Có lỗi xảy ra khi xử lý thanh toán');
      setIsProcessing(false);
    }
  };

  const paymentMethods = [
    { id: PAYMENT_METHODS.VNPAY, name: 'VNPAY', logo: '🏦' },
    { id: PAYMENT_METHODS.MOMO, name: 'Momo', logo: '💳' },
    { id: PAYMENT_METHODS.PAYPAL, name: 'PayPal', logo: '💰' },
    { id: PAYMENT_METHODS.VISA, name: 'VISA/Master', logo: '💳' },
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

              <div className="grid grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      paymentMethod === method.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-3xl mb-2">{method.logo}</div>
                    <div className="font-medium">{method.name}</div>
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
                  <div className="spinner w-5 h-5 mx-auto"></div>
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