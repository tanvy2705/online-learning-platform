import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, Award, TrendingUp } from 'lucide-react';
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

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center fade-in">
            <h1 className="text-5xl font-bold mb-6">
              Khám phá và Phát triển Kỹ năng
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Nền tảng học trực tuyến với hàng ngàn khóa học chất lượng cao,
              giúp bạn phát triển sự nghiệp và đam mê
            </p>
            <div className="flex gap-4 justify-center">
              <Link to={ROUTES.COURSES} className="btn bg-white text-primary hover:shadow-2xl">
                Khám phá khóa học
              </Link>
              <Link to={ROUTES.REGISTER} className="btn btn-outline border-white text-white hover:bg-white hover:text-primary">
                Đăng ký ngay
              </Link>
            </div>
          </div>
        </div>
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