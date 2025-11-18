import { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import CourseCard from '../../components/CourseCard';
import useCourseStore from '../../store/useCourseStore';

const Courses = () => {
  const { courses, categories, fetchCourses, fetchCategories, isLoading } = useCourseStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('all');

  useEffect(() => {
    fetchCourses({ status: 'active' });
    fetchCategories();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || course.category_id === parseInt(selectedCategory);
    
    let matchesPrice = true;
    if (priceRange === 'free') matchesPrice = course.price === 0;
    else if (priceRange === 'under500k') matchesPrice = course.price < 500000;
    else if (priceRange === 'under1m') matchesPrice = course.price < 1000000;
    else if (priceRange === 'over1m') matchesPrice = course.price >= 1000000;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="py-12 bg-light-gray min-h-screen">
      <div className="container">
        <div className="text-center mb-12 fade-in">
          <h1 className="text-4xl font-bold mb-4">Khám phá khóa học</h1>
          <p className="text-gray-600 text-lg">
            Tìm kiếm khóa học phù hợp với mục tiêu của bạn
          </p>
        </div>

        <div className="mb-8 fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm khóa học..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-10 w-full"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input"
              >
                <option value="">Tất cả danh mục</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="input"
              >
                <option value="all">Tất cả mức giá</option>
                <option value="free">Miễn phí</option>
                <option value="under500k">Dưới 500k</option>
                <option value="under1m">Dưới 1 triệu</option>
                <option value="over1m">Trên 1 triệu</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Tìm thấy <span className="font-semibold">{filteredCourses.length}</span> khóa học
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="spinner"></div>
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <Filter className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Không tìm thấy khóa học phù hợp</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course, index) => (
              <div 
                key={course.id}
                className="fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;