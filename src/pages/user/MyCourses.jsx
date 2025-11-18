import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, CheckCircle, PlayCircle } from 'lucide-react';
import courseApi from '../../api/courseApi';

const MyCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    setIsLoading(true);
    try {
      const response = await courseApi.getEnrolledCourses();
      setEnrolledCourses(response.data);
    } catch (error) {
      console.error('Fetch enrolled courses error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }

  if (enrolledCourses.length === 0) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Chưa có khóa học nào</h2>
          <p className="text-gray-600 mb-6">Hãy khám phá và đăng ký khóa học yêu thích</p>
          <Link to="/courses" className="btn btn-primary">
            Khám phá khóa học
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-gray py-12">
      <div className="container">
        <div className="mb-8 fade-in">
          <h1 className="text-3xl font-bold mb-2">Khóa học của tôi</h1>
          <p className="text-gray-600">Bạn đã đăng ký {enrolledCourses.length} khóa học</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((enrollment, index) => {
            const course = enrollment.course;
            const progress = enrollment.progress || 0;

            return (
              <div 
                key={enrollment.id}
                className="card group fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={course.thumbnail || 'https://via.placeholder.com/400x250'}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link 
                      to={`/learning/${course.id}`}
                      className="btn bg-white text-primary hover:shadow-2xl"
                    >
                      <PlayCircle className="w-5 h-5" />
                      Tiếp tục học
                    </Link>
                  </div>
                </div>

                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {course.title}
                </h3>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-gray-600">Tiến độ</span>
                    <span className="font-semibold text-primary">{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>24 giờ</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>{Math.floor(progress / 100 * 43)}/43 bài</span>
                  </div>
                </div>

                <Link
                  to={`/learning/${course.id}`}
                  className="btn btn-outline w-full mt-4"
                >
                  Tiếp tục học
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyCourses;