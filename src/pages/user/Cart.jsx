import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
import { ROUTES } from '../../utils/constants';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, fetchCart, removeFromCart, getTotalAmount, isLoading } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (itemId) => {
    if (confirm('Bạn có chắc muốn xóa khóa học này?')) {
      await removeFromCart(itemId);
    }
  };

  const handleCheckout = () => {
    navigate(ROUTES.CHECKOUT);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-gray">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Giỏ hàng trống</h2>
          <p className="text-gray-600 mb-6">Hãy thêm khóa học vào giỏ hàng để bắt đầu học</p>
          <Link to={ROUTES.COURSES} className="btn btn-primary">
            Khám phá khóa học
          </Link>
        </div>
      </div>
    );
  }

  const totalAmount = getTotalAmount();

  return (
    <div className="py-12 bg-light-gray min-h-screen">
      <div className="container">
        <h1 className="text-3xl font-bold mb-8 fade-in">Giỏ hàng của bạn</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div 
                  key={item.id}
                  className="card flex gap-4 fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <img
                    src={item.course.thumbnail ? `http://localhost:8000${item.course.thumbnail}` : 'https://via.placeholder.com/200x120'}
                    alt={item.course.title}
                    className="w-32 h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                      {item.course.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.course.description}
                    </p>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <div className="text-right">
                      {item.course.discount_price ? (
                        <>
                          <p className="text-xl font-bold text-primary">
                            {formatCurrency(item.course.discount_price)}
                          </p>
                          <p className="text-sm text-gray-400 line-through">
                            {formatCurrency(item.course.price)}
                          </p>
                        </>
                      ) : (
                        <p className="text-xl font-bold text-primary">
                          {formatCurrency(item.course.price)}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-error hover:bg-red-50 p-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card sticky top-24 fade-in" style={{ animationDelay: '0.3s' }}>
              <h3 className="font-semibold text-lg mb-4">Tổng quan đơn hàng</h3>
              
              <div className="space-y-3 mb-4 pb-4 border-b">
                <div className="flex justify-between text-gray-600">
                  <span>Số lượng:</span>
                  <span>{cart.length} khóa học</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-semibold text-lg">Tổng cộng:</span>
                <span className="text-2xl font-bold text-primary">
                  {formatCurrency(totalAmount)}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="btn btn-primary w-full"
              >
                Thanh toán
              </button>

              <Link
                to={ROUTES.COURSES}
                className="btn btn-outline w-full mt-3"
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;