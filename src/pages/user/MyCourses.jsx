import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, PlayCircle, Award } from 'lucide-react';
import courseApi from '../../api/courseApi';

const MyCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  const fetchEnrolledCourses = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await courseApi.getEnrolledCourses();
      console.log('✅ Enrolled courses response:', response);
      
      if (response && response.data) {
        setEnrolledCourses(response.data);
      } else {
        setEnrolledCourses([]);
      }
    } catch (error) {
      console.error('❌ Fetch enrolled courses error:', error);
      setError(error.message);
      setEnrolledCourses([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate statistics
  const totalCourses = enrolledCourses.length;
  const averageProgress = totalCourses > 0 
    ? Math.round(enrolledCourses.reduce((sum, e) => sum + (e.progress || 0), 0) / totalCourses)
    : 0;
  const completedCourses = enrolledCourses.filter(e => e.progress >= 100).length;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải khóa học của bạn...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-xl shadow-md p-8 max-w-md">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Có lỗi xảy ra</h3>
          <p className="text-red-500 mb-6">{error}</p>
          <button onClick={fetchEnrolledCourses} className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!enrolledCourses || enrolledCourses.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-lg">
          <div className="w-64 h-64 bg-gray-100 rounded-2xl mx-auto mb-8 overflow-hidden">
            <img 
              src="http://localhost:8000/uploads/thumbnails/toeic-course.jpg" 
              alt="Empty state"
              className="w-full h-full object-cover opacity-50"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/256x256/f3f4f6/6b7280?text=📚+No+Courses';
              }}
            />
          </div>
          
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Chưa có khóa học nào
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Bắt đầu hành trình học tập của bạn ngay hôm nay
          </p>
          
          <Link to="/courses" className="inline-flex items-center px-8 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors">
            Khám phá khóa học
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Stats */}
      <div className="bg-white border-b border-gray-200">
        <div className="container py-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-semibold text-gray-800 mb-3">
              Khóa học của tôi
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Tiếp tục hành trình học tập của bạn
            </p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg overflow-hidden border border-gray-200">
                    <img 
                      src="http://localhost:8000/uploads/thumbnails/business-course.jpg" 
                      alt="Courses"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/48x48/f3f4f6/6b7280?text=📚';
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-3xl font-semibold text-gray-800">{totalCourses}</p>
                    <p className="text-gray-600 text-sm">Khóa học</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg overflow-hidden border border-gray-200">
                    <img 
                      src="http://localhost:8000/uploads/thumbnails/javascript-course.jpg" 
                      alt="Progress"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/48x48/f3f4f6/6b7280?text=📊';
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-3xl font-semibold text-gray-800">{averageProgress}%</p>
                    <p className="text-gray-600 text-sm">Tiến độ TB</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg overflow-hidden border border-gray-200">
                    <img 
                      src="http://localhost:8000/uploads/thumbnails/marketing-course.jpg" 
                      alt="Completed"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/48x48/f3f4f6/6b7280?text=🏆';
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-3xl font-semibold text-gray-800">{completedCourses}</p>
                    <p className="text-gray-600 text-sm">Hoàn thành</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((enrollment, index) => {
            const courseId = enrollment.course_id;
            const courseTitle = enrollment.course_title;
            const thumbnail = enrollment.thumbnail;
            const progress = enrollment.progress || 0;
            const categoryName = enrollment.category_name;

            if (!courseId || !courseTitle) {
              return null;
            }

            return (
              <div 
                key={enrollment.id}
                className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.5s ease-out forwards',
                  opacity: 0
                }}
              >
                {/* Course Image */}
                <div className="relative overflow-hidden h-48 bg-gray-100">
                  <img
                    src={thumbnail || 'https://via.placeholder.com/400x250/f3f4f6/6b7280?text=Course'}
                    alt={courseTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x250/f3f4f6/6b7280?text=Course';
                    }}
                  />
                  
                  {/* Category Badge */}
                  {categoryName && (
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-3 py-1 rounded-full border border-gray-200">
                        {categoryName}
                      </span>
                    </div>
                  )}

                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link 
                      to={`/learning/${courseId}`}
                      className="bg-white text-gray-800 px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-50 transition-colors"
                    >
                      <PlayCircle className="w-5 h-5" />
                      Tiếp tục học
                    </Link>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-gray-800 mb-3 line-clamp-2 group-hover:text-gray-600 transition-colors">
                    {courseTitle}
                  </h3>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Tiến độ</span>
                      <span className="font-semibold text-gray-800">{Number(progress).toFixed(1)}%</span>
                    </div>
                    <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="absolute inset-y-0 left-0 bg-gray-600 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Course Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{enrollment.total_lessons || 0} bài</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>
                        {enrollment.total_lessons 
                          ? Math.floor(progress / 100 * enrollment.total_lessons)
                          : 0
                        }/{enrollment.total_lessons || 0}
                      </span>
                    </div>
                  </div>

                  {/* Achievement Badge */}
                  {progress >= 100 && (
                    <div className="mb-4 bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center gap-3">
                      <Award className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Đã hoàn thành
                      </span>
                    </div>
                  )}

                  {/* Action Button */}
                  <Link
                    to={`/learning/${courseId}`}
                    className="block w-full text-center py-2.5 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    {progress >= 100 ? 'Ôn tập lại' : 'Tiếp tục học'}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MyCourses;