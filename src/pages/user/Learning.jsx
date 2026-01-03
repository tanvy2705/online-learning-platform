import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle, Lock, PlayCircle, FileText, Menu } from 'lucide-react';
import courseApi from '../../api/courseApi';

const Learning = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  const fetchCourseData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Fetch course details
      const courseResponse = await courseApi.getCourseById(courseId);
      console.log('📚 Course data:', courseResponse);
      
      if (courseResponse && courseResponse.data) {
        setCourse(courseResponse.data);
      }

      // Fetch lessons
      const lessonsResponse = await courseApi.getLessonsByCourse(courseId);
      console.log('📖 Lessons data:', lessonsResponse);
      
      if (lessonsResponse && lessonsResponse.data) {
        const sortedLessons = lessonsResponse.data.sort((a, b) => a.order_index - b.order_index);
        setLessons(sortedLessons);
        
        // Set first lesson as current if available
        if (sortedLessons.length > 0) {
          setCurrentLesson(sortedLessons[0]);
        }
      }

      // Fetch user progress (if API available)
      // const progressResponse = await courseApi.getUserProgress(courseId);
      // setCompletedLessons(progressResponse.data.completed_lessons || []);

    } catch (error) {
      console.error('❌ Fetch course data error:', error);
      setError(error.message || 'Không thể tải dữ liệu khóa học');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLessonClick = (lesson) => {
    setCurrentLesson(lesson);
    // Mark as completed when user clicks (you can add API call here)
    if (!completedLessons.includes(lesson.id)) {
      setCompletedLessons([...completedLessons, lesson.id]);
      // TODO: Call API to mark lesson as completed
      // courseApi.markLessonComplete(courseId, lesson.id);
    }
  };

  const handlePreviousLesson = () => {
    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
    if (currentIndex > 0) {
      setCurrentLesson(lessons[currentIndex - 1]);
    }
  };

  const handleNextLesson = () => {
    const currentIndex = lessons.findIndex(l => l.id === currentLesson.id);
    if (currentIndex < lessons.length - 1) {
      setCurrentLesson(lessons[currentIndex + 1]);
      // Mark current as completed
      if (!completedLessons.includes(currentLesson.id)) {
        setCompletedLessons([...completedLessons, currentLesson.id]);
      }
    }
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    
    // Handle various YouTube URL formats
    const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/);
    if (videoIdMatch && videoIdMatch[1]) {
      return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
    }
    
    // If already an embed URL, return as is
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    return url;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Đang tải khóa học...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center bg-gray-800 rounded-xl shadow-md p-8 max-w-md">
          <div className="w-16 h-16 bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Có lỗi xảy ra</h3>
          <p className="text-red-400 mb-6">{error || 'Không tìm thấy khóa học'}</p>
          <button 
            onClick={() => navigate('/my-courses')} 
            className="px-6 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Quay lại khóa học của tôi
          </button>
        </div>
      </div>
    );
  }

  const currentLessonIndex = lessons.findIndex(l => l.id === currentLesson?.id);
  const progress = lessons.length > 0 ? Math.round((completedLessons.length / lessons.length) * 100) : 0;

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar - Course Navigation */}
      <div 
        className={`${
          isSidebarOpen ? 'w-80' : 'w-0'
        } bg-gray-800 border-r border-gray-700 overflow-y-auto transition-all duration-300`}
      >
        {isSidebarOpen && (
          <div className="p-6">
            {/* Course Header */}
            <div className="mb-6">
              <button
                onClick={() => navigate('/my-courses')}
                className="flex items-center text-gray-400 hover:text-white mb-4 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Quay lại
              </button>
              <h2 className="text-xl font-bold text-white mb-2 line-clamp-2">
                {course.title}
              </h2>
              <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                <span>{completedLessons.length}/{lessons.length} bài học</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Lessons List */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-400 uppercase mb-3">
                Nội dung khóa học
              </h3>
              {lessons.map((lesson, index) => {
                const isCompleted = completedLessons.includes(lesson.id);
                const isCurrent = currentLesson?.id === lesson.id;

                return (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonClick(lesson)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      isCurrent
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : isCurrent ? (
                          <PlayCircle className="w-5 h-5" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-500 rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold">
                            Bài {index + 1}
                          </span>
                        </div>
                        <p className="font-medium text-sm line-clamp-2">
                          {lesson.title}
                        </p>
                        {lesson.duration && (
                          <p className="text-xs text-gray-400 mt-1">
                            {lesson.duration} phút
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main Content - Video Player */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-white line-clamp-1">
              {currentLesson?.title || 'Chọn một bài học'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePreviousLesson}
              disabled={currentLessonIndex === 0}
              className="p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="text-gray-400 text-sm">
              {currentLessonIndex + 1} / {lessons.length}
            </span>
            <button
              onClick={handleNextLesson}
              disabled={currentLessonIndex === lessons.length - 1}
              className="p-2 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Video Content */}
        <div className="flex-1 overflow-y-auto bg-black">
          {currentLesson ? (
            <div className="h-full flex flex-col">
              {/* Video Player */}
              <div className="flex-shrink-0 bg-black">
                {currentLesson.video_url ? (
                  <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                    <iframe
                      src={getYouTubeEmbedUrl(currentLesson.video_url)}
                      className="absolute top-0 left-0 w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={currentLesson.title}
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-video flex items-center justify-center bg-gray-900">
                    <div className="text-center">
                      <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-gray-400">Không có video cho bài học này</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Lesson Details */}
              <div className="flex-1 bg-gray-900 p-6">
                <div className="max-w-4xl">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {currentLesson.title}
                  </h2>
                  {currentLesson.description && (
                    <div className="text-gray-300 mb-6">
                      <p>{currentLesson.description}</p>
                    </div>
                  )}
                  
                  {currentLesson.content && (
                    <div className="bg-gray-800 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-white mb-3">
                        Nội dung bài học
                      </h3>
                      <div className="text-gray-300 whitespace-pre-wrap">
                        {currentLesson.content}
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-700">
                    <button
                      onClick={handlePreviousLesson}
                      disabled={currentLessonIndex === 0}
                      className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Bài trước
                    </button>
                    <button
                      onClick={handleNextLesson}
                      disabled={currentLessonIndex === lessons.length - 1}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      Bài tiếp theo
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <PlayCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Chọn một bài học để bắt đầu</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Learning;