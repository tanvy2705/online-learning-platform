import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Eye, Image } from 'lucide-react';
import useCourseStore from '../../store/useCourseStore';
import { formatCurrency } from '../../utils/formatCurrency';
import { COURSE_STATUS } from '../../utils/constants';

const ManageCourses = () => {
  const { courses, categories, fetchCourses, fetchCategories, deleteCourse, isLoading } = useCourseStore();
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    discount_price: '',
    category_id: '',
    status: COURSE_STATUS.ACTIVE,
  });

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  const handleOpenModal = (course = null) => {
    if (course) {
      setEditingCourse(course);
      setFormData({
        title: course.title,
        description: course.description,
        price: course.price,
        discount_price: course.discount_price || '',
        category_id: course.category_id,
        status: course.status,
      });
    } else {
      setEditingCourse(null);
      setFormData({
        title: '',
        description: '',
        price: '',
        discount_price: '',
        category_id: '',
        status: COURSE_STATUS.ACTIVE,
      });
    }
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Bạn có chắc muốn xóa khóa học này?')) {
      const result = await deleteCourse(id);
      if (result.success) {
        alert('Xóa thành công!');
      } else {
        alert(result.error);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Quản lý khóa học</h1>
          <p className="text-gray-600">Tổng số: {courses.length} khóa học</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Tạo khóa học mới
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="card fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Khóa học</th>
                  <th className="text-left py-3 px-4">Danh mục</th>
                  <th className="text-left py-3 px-4">Giá gốc</th>
                  <th className="text-left py-3 px-4">Giá giảm</th>
                  <th className="text-left py-3 px-4">Trạng thái</th>
                  <th className="text-left py-3 px-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} className="border-b hover:bg-light-gray transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={course.thumbnail || 'https://via.placeholder.com/60x40'}
                          alt={course.title}
                          className="w-16 h-10 object-cover rounded"
                        />
                        <div>
                          <p className="font-medium line-clamp-1">{course.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">{course.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="badge badge-primary">{course.category?.name || 'N/A'}</span>
                    </td>
                    <td className="py-3 px-4 font-semibold">
                      {formatCurrency(course.price)}
                    </td>
                    <td className="py-3 px-4">
                      {course.discount_price ? (
                        <span className="font-semibold text-success">
                          {formatCurrency(course.discount_price)}
                        </span>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`badge ${
                        course.status === 'active' ? 'badge-success' : 
                        course.status === 'inactive' ? 'badge-error' : 
                        'badge-warning'
                      }`}>
                        {course.status === 'active' ? 'Hoạt động' : 
                         course.status === 'inactive' ? 'Vô hiệu' : 
                         'Nháp'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleOpenModal(course)}
                          className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4 text-primary" />
                        </button>
                        <button
                          onClick={() => handleDelete(course.id)}
                          className="p-2 hover:bg-error/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-error" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Placeholder */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 slide-down max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">
              {editingCourse ? 'Chỉnh sửa khóa học' : 'Tạo khóa học mới'}
            </h2>
            <p className="text-gray-600 mb-4">Form chi tiết sẽ được triển khai tại đây...</p>
            <button onClick={() => setShowModal(false)} className="btn btn-outline w-full">
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;