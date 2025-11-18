import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Clock, Users, BookOpen, Award, Star } from 'lucide-react';
import useCourseStore from '../../store/useCourseStore';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency, calculateDiscount } from '../../utils/formatCurrency';
import { ROUTES } from '../../utils/constants';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { fetchCourseById, currentCourse, isLoading } = useCourseStore();
  const { addToCart, cart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchCourseById(id);
  }, [id]);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
      return;
    }

    setIsAdding(true);
    const result = await addToCart(parseInt(id));
    setIsAdding(false);

    if (result.success) {
      alert('Đã thêm vào giỏ hàng!');
    } else {
      alert(result.error);
    }
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN);
      return;
    }

    const isInCart = cart.some(item => item.course_id === parseInt(id));
    
    if (!isInCart) {
      await addToCart(parseInt(id));
    }
    
    navigate(ROUTES.CHECKOUT);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!currentCourse) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Không tìm thấy khóa học</h2>
          <button onClick={() => navigate(ROUTES.COURSES)} className="btn btn-primary">
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  const course = currentCourse;
  const discount = calculateDiscount(course.price, course.discount_price);
  const isInCart = cart.some(item => item.course_id === course.id);

  return (
    <div className="bg-light-gray min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm mb-4">
                {course.category?.name || 'Khóa học'}
              </div>
              <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl opacity-90 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span>4.8 (1,234 đánh giá)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>5,678 học viên</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>24 giờ học</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {course.discount_price ? (
                  <>
                    <span className="text-4xl font-bold">
                      {formatCurrency(course.discount_price)}
                    </span>
                    <span className="text-xl line-through opacity-70">
                      {formatCurrency(course.price)}
                    </span>
                    <span className="bg-error text-white px-3 py-1 rounded-full font-bold">
                      -{discount}%
                    </span>
                  </>
                ) : (
                  <span className="text-4xl font-bold">
                    {formatCurrency(course.price)}
                  </span>
                )}
              </div>
            </div>

            <div className="fade-in" style={{ animationDelay: '0.2s' }}>
              <img
                src={course.thumbnail || 'https://via.placeholder.com/600x400'}
                alt={course.title}
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What you'll learn */}
            <div className="card fade-in">
              <h2 className="text-2xl font-bold mb-6">Bạn sẽ học được gì</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Nắm vững kiến thức cơ bản và nâng cao',
                  'Thực hành với các dự án thực tế',
                  'Xây dựng portfolio ấn tượng',
                  'Kỹ năng làm việc nhóm hiệu quả',
                  'Cập nhật xu hướng mới nhất',
                  'Nhận chứng chỉ hoàn thành khóa học',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <BookOpen className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content */}
            <div className="card fade-in" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-2xl font-bold mb-6">Nội dung khóa học</h2>
              <div className="space-y-3">
                {[
                  { title: 'Giới thiệu khóa học', lessons: 5, duration: '45 phút' },
                  { title: 'Kiến thức cơ bản', lessons: 12, duration: '2 giờ 30 phút' },
                  { title: 'Kiến thức nâng cao', lessons: 15, duration: '3 giờ 15 phút' },
                  { title: 'Dự án thực tế', lessons: 8, duration: '4 giờ' },
                  { title: 'Tổng kết và thi cuối khóa', lessons: 3, duration: '1 giờ 30 phút' },
                ].map((section, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-light-gray transition-colors">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{section.title}</h3>
                      <span className="text-sm text-gray-600">
                        {section.lessons} bài • {section.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="card fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-2xl font-bold mb-6">Yêu cầu</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">Máy tính kết nối internet</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">Kiến thức cơ bản về máy tính</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">Tinh thần học hỏi và kiên trì</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24 fade-in" style={{ animationDelay: '0.3s' }}>
              <img
                src={course.thumbnail || 'https://via.placeholder.com/400x250'}
                alt={course.title}
                className="w-full rounded-lg mb-6"
              />

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>24 giờ video</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span>43 bài học</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Award className="w-5 h-5 text-primary" />
                  <span>Chứng chỉ hoàn thành</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Trọn đời</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleBuyNow}
                  className="btn btn-primary w-full text-lg py-4"
                >
                  Mua ngay
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding || isInCart}
                  className="btn btn-outline w-full"
                >
                  {isAdding ? (
                    <div className="spinner w-5 h-5 mx-auto"></div>
                  ) : isInCart ? (
                    'Đã có trong giỏ'
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Thêm vào giỏ
                    </>
                  )}
                </button>
              </div>

              <div className="mt-6 pt-6 border-t text-center">
                <p className="text-sm text-gray-600">Đảm bảo hoàn tiền trong 30 ngày</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;