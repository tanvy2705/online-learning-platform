import { Link } from 'react-router-dom';
import { ShoppingCart, Check } from 'lucide-react';
import { formatCurrency, calculateDiscount } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const CourseCard = ({ course, isEnrolled = false }) => {
  const { addToCart, cart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  
  const isInCart = cart.some(item => item.course_id === course.id);
  const discount = calculateDiscount(course.price, course.discount_price);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    if (isAdding || isInCart || isEnrolled) return;

    setIsAdding(true);
    const result = await addToCart(course.id);
    setIsAdding(false);

    if (result.success) {
      alert('Đã thêm vào giỏ hàng!');
    } else {
      alert(result.error);
    }
  };

  return (
    <Link 
      to={`/courses/${course.id}`}
      className="card group overflow-hidden"
    >
      <div className="relative overflow-hidden rounded-lg mb-4">
        <img 
          src={course.thumbnail || 'https://via.placeholder.com/400x250'}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-error text-white px-3 py-1 rounded-full text-sm font-bold">
            -{discount}%
          </div>
        )}
        {isEnrolled && (
          <div className="absolute top-2 left-2 bg-success text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
            <Check className="w-4 h-4" />
            Đã đăng ký
          </div>
        )}
      </div>

      <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
        {course.title}
      </h3>
      
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {course.description}
      </p>

      <div className="flex items-center justify-between">
        <div>
          {course.discount_price ? (
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-primary">
                {formatCurrency(course.discount_price)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                {formatCurrency(course.price)}
              </span>
            </div>
          ) : (
            <span className="text-xl font-bold text-primary">
              {formatCurrency(course.price)}
            </span>
          )}
        </div>

        {!isEnrolled && (
          <button
            onClick={handleAddToCart}
            disabled={isAdding || isInCart}
            className={`btn ${isInCart ? 'btn-outline' : 'btn-primary'} py-2 px-4`}
          >
            {isAdding ? (
              <div className="spinner w-5 h-5"></div>
            ) : isInCart ? (
              'Trong giỏ'
            ) : (
              <ShoppingCart className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </Link>
  );
};

export default CourseCard;