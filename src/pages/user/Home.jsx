import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, TrendingUp, Brain, Mic, CheckCircle, Target, Headphones, MessageCircle, BarChart3 } from 'lucide-react';
import CourseCard from '../../components/CourseCard';
import useCourseStore from '../../store/useCourseStore';
import { ROUTES } from '../../utils/constants';

const Home = () => {
  const { courses, fetchCourses, isLoading } = useCourseStore();

  useEffect(() => {
    fetchCourses({ limit: 8, status: 'active' });
  }, []);

  const features = [
    {
      icon: BookOpen,
      title: 'Hàng ngàn khóa học',
      description: 'Đa dạng chủ đề từ công nghệ đến kinh doanh',
    },
    {
      icon: Users,
      title: 'Giảng viên chuyên gia',
      description: 'Được đào tạo bởi những người giỏi nhất',
    },
    {
      icon: Award,
      title: 'Chứng chỉ uy tín',
      description: 'Được công nhận bởi các doanh nghiệp',
    },
    {
      icon: TrendingUp,
      title: 'Học linh hoạt',
      description: 'Học mọi lúc mọi nơi theo tiến độ của bạn',
    },
  ];

  const learningMethods = [
    {
      icon: TrendingUp,
      title: 'Khóa học Marketing',
      description: 'Nắm vững các chiến lược Marketing hiện đại từ Digital Marketing, Social Media, SEO/SEM đến Content Marketing. Học từ những chuyên gia hàng đầu và áp dụng ngay vào thực tế.',
      image: '/images/features/method-1.jpg',
      gradient: 'from-orange-400 to-red-600'
    },
    {
      icon: Award,
      title: 'Khóa học Tiếng Anh TOEIC',
      description: 'Chinh phục chứng chỉ TOEIC với lộ trình học được thiết kế khoa học. Rèn luyện cả 4 kỹ năng Listening, Speaking, Reading, Writing với đề thi thực tế và giáo viên bản xứ.',
      image: '/images/features/method-2.jpg',
      gradient: 'from-blue-400 to-indigo-600'
    },
    {
      icon: BookOpen,
      title: 'Khóa học Lập trình',
      description: 'Từ cơ bản đến nâng cao với các ngôn ngữ phổ biến: JavaScript, Python, Java, React. Xây dựng các dự án thực tế và chuẩn bị sẵn sàng cho thị trường công nghệ.',
      image: '/images/features/method-3.jpg',
      gradient: 'from-green-400 to-cyan-600'
    },
    {
      icon: BarChart3,
      title: 'Khóa học Kinh tế',
      description: 'Hiểu rõ các nguyên lý kinh tế vĩ mô và vi mô, phân tích thị trường tài chính, đầu tư chứng khoán. Nâng cao tư duy kinh doanh và quản lý tài chính cá nhân hiệu quả.',
      image: '/images/features/method-4.jpg',
      gradient: 'from-purple-400 to-pink-600'
    },
  ];

  const smartFeatures = [
    {
      icon: Brain,
      title: 'Luyện Nghe Sâu Như Người Bản Xứ',
      description: 'Phương pháp Dictation (Nghe chép) độc quyền của chúng tôi sẽ rèn luyện đôi tai của bạn để nghe rõ từng từ, 92% người học đã cải thiện khả năng nghe hiểu chỉ sau một tháng.',
      badge: 'Phương pháp Dictation (Nghe chép) Độc quyền',
      color: 'purple',
      image: '/images/learning/dictation.jpg' // Thêm ảnh của bạn
    },
    {
      icon: MessageCircle,
      title: 'Nói Tiếng Anh Tự Nhiên và Trôi Chảy',
      description: 'Nói tiếng Anh với ngữ điệu và sự tự tin như người bản xứ! Kỹ thuật Shadowing giúp bạn làm chủ phát âm, nhịp điệu và sự lưu loát. 95% người học cho biết họ đã tự tin hơn khi nói chỉ sau 3 tháng.',
      badge: 'Kỹ thuật Shadowing (Nói nhại theo) Đột phá',
      color: 'blue',
      image: '/images/learning/shadowing.jpg' // Thêm ảnh của bạn
    },
    {
      icon: CheckCircle,
      title: 'Học Từ Lỗi Sai Của Chính Bạn',
      description: 'Sai lầm là cơ hội để tiến bộ. Sau mỗi bài tập, bạn sẽ nhận được điểm số tức thì và phản hồi chi tiết để hiểu rõ lỗi sai của mình. Tập trung vào các điểm yếu và cải thiện từng bước một.',
      badge: 'Phân Tích Lỗi Sai Thông Minh',
      color: 'pink',
      image: '/images/learning/progress.jpg' // Thêm ảnh của bạn
    },
  ];

  const whyChooseUs = [
    {
      icon: Headphones,
      title: 'Nâng Cao Kỹ Năng Nghe',
      description: 'Rèn luyện đôi tai với giọng đọc của người bản xứ và cải thiện khả năng nghe hiểu tiếng Anh',
      image: '/images/features/listening.jpg' // Thêm ảnh của bạn
    },
    {
      icon: Mic,
      title: 'Luyện Nói Tự Nhiên',
      description: 'Thực hành nói một cách tự nhiên bằng cách shadowing theo phát âm chuẩn bản xứ',
      image: '/images/features/speaking.jpg' // Thêm ảnh của bạn
    },
    {
      icon: Brain,
      title: 'Tăng Cường Ghi Nhớ',
      description: 'Ghi nhớ từ vựng và cấu trúc câu lâu hơn thông qua học tập chủ động và tập trung vào các lỗi sai thường gặp',
      image: '/images/features/memory.jpg' // Thêm ảnh của bạn
    },
    {
      icon: BarChart3,
      title: 'Theo Dõi Lộ Trình Tiến Bộ',
      description: 'Giám sát sự cải thiện của bạn với hệ thống theo dõi tiến trình học tập chi tiết',
      image: '/images/features/progress.jpg' // Thêm ảnh của bạn
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Image - Replace with your image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero/hero-background.jpg" 
            alt="Hero Background"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.classList.add('bg-gradient-to-r', 'from-primary', 'to-secondary');
            }}
          />
          {/* No overlay - Pure image */}
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text Content */}
            <div className="text-white fade-in">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Khám phá và Phát triển Kỹ năng
              </h1>
              <p className="text-lg lg:text-xl mb-8 opacity-90 leading-relaxed">
                Nền tảng học trực tuyến với hàng ngàn khóa học chất lượng cao,
                giúp bạn phát triển sự nghiệp và đam mê
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link to={ROUTES.COURSES} className="btn bg-white text-primary hover:shadow-2xl text-lg px-8 py-4">
                  Khám phá khóa học
                </Link>
                <Link to={ROUTES.REGISTER} className="btn btn-outline border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
                  Đăng ký ngay
                </Link>
              </div>
            </div>

            {/* Right - Hero Images */}
            <div className="relative fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative w-full h-[500px] lg:h-[600px]">
                {/* Main Image - Top Right */}
                <div className="absolute top-0 right-0 w-72 lg:w-80 z-20 hero-image-float">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl transform rotate-6"></div>
                    <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden p-2 transform hover:scale-105 transition-transform duration-300">
                      <img 
                        src="/images/hero/student-1.jpg" 
                        alt="Học viên đang học"
                        className="w-full h-64 lg:h-80 object-cover rounded-2xl"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%234F46E5" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="60" fill="white"%3EStudent%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </div>
                    {/* Decorative Icon */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg hero-icon-pulse">
                      <Award className="w-10 h-10 text-white" />
                    </div>
                  </div>
                </div>

                {/* Second Image - Bottom Left */}
                <div className="absolute bottom-0 left-0 w-64 lg:w-72 z-10 hero-image-float" style={{ animationDelay: '0.5s' }}>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl transform -rotate-6"></div>
                    <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden p-2 transform hover:scale-105 transition-transform duration-300">
                      <img 
                        src="/images/hero/student-2.jpg" 
                        alt="Học viên online"
                        className="w-full h-56 lg:h-64 object-cover rounded-2xl"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"%3E%3Crect fill="%237C3AED" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="60" fill="white"%3ELearning%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </div>
                    {/* Decorative Icon */}
                    <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-pink-400 rounded-full flex items-center justify-center shadow-lg hero-icon-pulse" style={{ animationDelay: '0.3s' }}>
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 right-1/4 w-16 h-16 border-4 border-white/30 rounded-full hero-rotate"></div>
                <div className="absolute bottom-1/3 left-1/3 w-12 h-12 border-4 border-white/30 rounded-lg hero-rotate" style={{ animationDelay: '1s' }}></div>
                
                {/* Small floating circles */}
                <div className="absolute top-20 left-10 w-8 h-8 bg-white/20 rounded-full hero-float-slow"></div>
                <div className="absolute bottom-32 right-20 w-6 h-6 bg-white/20 rounded-full hero-float-slow" style={{ animationDelay: '2s' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* CSS Animations */}
        <style>{`
          @keyframes heroFloat {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          @keyframes heroFloatSlow {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-30px);
            }
          }

          @keyframes heroPulse {
            0%, 100% {
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
            }
            50% {
              transform: scale(1.05);
              box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
            }
          }

          @keyframes heroRotate {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          .hero-image-float {
            animation: heroFloat 3s ease-in-out infinite;
          }

          .hero-float-slow {
            animation: heroFloatSlow 4s ease-in-out infinite;
          }

          .hero-icon-pulse {
            animation: heroPulse 2s ease-in-out infinite;
          }

          .hero-rotate {
            animation: heroRotate 10s linear infinite;
          }
        `}</style>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="text-center p-6 rounded-lg hover:shadow-lg transition-all fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Methods Section */}
      <section className="py-20 bg-light-gray">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Khóa Học Phổ Biến</h2>
            <p className="text-gray-600 text-lg">
              Khám phá các khóa học đa dạng giúp bạn phát triển kỹ năng và sự nghiệp
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {learningMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all group">
                  {/* Hiển thị ảnh nếu có, nếu không thì dùng gradient + icon */}
                  {method.image ? (
                    <div className="h-64 relative overflow-hidden">
                      <img 
                        src={method.image} 
                        alt={method.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          // Fallback nếu ảnh không load được
                          e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br ${method.gradient}"><svg class="w-32 h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg></div>`;
                        }}
                      />
                      {/* Gradient overlay để text dễ đọc */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      
                      {/* Icon góc trái trên */}
                      <div className="absolute top-4 left-4">
                        <div className={`w-16 h-16 bg-gradient-to-br ${method.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className={`h-64 bg-gradient-to-r ${method.gradient} flex items-center justify-center relative`}>
                      <Icon className="w-32 h-32 text-white opacity-90" />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-gray-800">{method.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{method.description}</p>
                    
                    {/* View Details Button */}
                    <button className="mt-4 text-primary font-semibold hover:text-secondary transition-colors flex items-center gap-2 group-hover:gap-3 transition-all">
                      Xem chi tiết
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to={ROUTES.COURSES} className="btn btn-primary text-lg px-8 py-4">
              Xem tất cả khóa học
            </Link>
          </div>
        </div>
      </section>

      {/* Smart Features Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trải Nghiệm Học Thông Minh</h2>
            <p className="text-gray-600 text-lg">
              Khám phá phương pháp học hiệu quả nhất được hỗ trợ bởi công nghệ AI tiên tiến
            </p>
          </div>

          <div className="space-y-12">
            {smartFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>
                  <div className="flex-1">
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4 ${
                      feature.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                      feature.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                      'bg-pink-100 text-pink-700'
                    }`}>
                      {feature.badge}
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-gray-600 text-lg mb-6">{feature.description}</p>
                    <button className="btn btn-primary">
                      Thử ngay
                    </button>
                  </div>
                  <div className="flex-1">
                    {feature.image ? (
                      <div className="w-full h-80 rounded-2xl shadow-lg overflow-hidden">
                        <img 
                          src={feature.image} 
                          alt={feature.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className={`w-full h-80 bg-gradient-to-br ${
                        feature.color === 'purple' ? 'from-purple-100 to-purple-200' :
                        feature.color === 'blue' ? 'from-blue-100 to-blue-200' :
                        'from-pink-100 to-pink-200'
                      } rounded-2xl shadow-lg flex items-center justify-center`}>
                        <Icon className="w-32 h-32 text-gray-400" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-16 bg-light-gray">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Khóa học phổ biến</h2>
            <p className="text-gray-600">Những khóa học được yêu thích nhất</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {courses.slice(0, 8).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to={ROUTES.COURSES} className="btn btn-primary">
              Xem tất cả khóa học
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Tại Sao Chọn Nền Tảng Của Chúng Tôi?</h2>
            <p className="text-gray-600 text-lg">
              Khám phá các tính năng mạnh mẽ giúp việc học trở nên dễ dàng và hiệu quả
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-primary hover:shadow-lg transition-all group">
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                        <Icon className="w-24 h-24 text-primary" />
                      </div>
                    )}
                    {/* Icon Overlay */}
                    <div className="absolute bottom-4 left-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <button className="btn btn-primary text-lg px-8 py-4">
              Thử Ngay
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">
            Sẵn sàng bắt đầu học tập?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Tham gia cùng hàng ngàn học viên đã thay đổi cuộc đời họ
          </p>
          <Link to={ROUTES.REGISTER} className="btn bg-white text-primary hover:shadow-2xl">
            Đăng ký miễn phí
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;