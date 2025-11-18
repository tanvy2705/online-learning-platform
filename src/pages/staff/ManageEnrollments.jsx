import { useState } from 'react';
import { BookOpen, Check, X, Clock } from 'lucide-react';

const ManageEnrollments = () => {
  const [enrollments] = useState([
    { id: 1, student: 'Nguyễn Văn A', email: 'nguyenvana@email.com', course: 'React Advanced', status: 'pending', date: '2024-01-15' },
    { id: 2, student: 'Trần Thị B', email: 'tranthib@email.com', course: 'Node.js Master', status: 'approved', date: '2024-01-14' },
    { id: 3, student: 'Lê Văn C', email: 'levanc@email.com', course: 'Python Pro', status: 'pending', date: '2024-01-14' },
    { id: 4, student: 'Phạm Thị D', email: 'phamthid@email.com', course: 'Java Fullstack', status: 'rejected', date: '2024-01-13' },
  ]);

  const [filter, setFilter] = useState('all');

  const filteredEnrollments = enrollments.filter(e => 
    filter === 'all' || e.status === filter
  );

  const getStatusBadge = (status) => {
    switch(status) {
      case 'approved':
        return <span className="badge badge-success">Đã duyệt</span>;
      case 'pending':
        return <span className="badge badge-warning">Chờ duyệt</span>;
      case 'rejected':
        return <span className="badge badge-error">Từ chối</span>;
      default:
        return <span className="badge">Không xác định</span>;
    }
  };

  const stats = [
    { label: 'Tổng đăng ký', value: enrollments.length, color: 'primary' },
    { label: 'Chờ duyệt', value: enrollments.filter(e => e.status === 'pending').length, color: 'warning' },
    { label: 'Đã duyệt', value: enrollments.filter(e => e.status === 'approved').length, color: 'success' },
  ];

  return (
    <div>
      <div className="mb-8 fade-in">
        <h1 className="text-3xl font-bold mb-2">Quản lý đăng ký khóa học</h1>
        <p className="text-gray-600">Xét duyệt yêu cầu đăng ký của học viên</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="card fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold text-${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="card mb-6 fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="flex gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline'}`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`btn ${filter === 'pending' ? 'btn-primary' : 'btn-outline'}`}
          >
            Chờ duyệt
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`btn ${filter === 'approved' ? 'btn-primary' : 'btn-outline'}`}
          >
            Đã duyệt
          </button>
          <button
            onClick={() => setFilter('rejected')}
            className={`btn ${filter === 'rejected' ? 'btn-primary' : 'btn-outline'}`}
          >
            Từ chối
          </button>
        </div>
      </div>

      {/* Enrollments Table */}
      <div className="card fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Học viên</th>
                <th className="text-left py-3 px-4">Khóa học</th>
                <th className="text-left py-3 px-4">Ngày đăng ký</th>
                <th className="text-left py-3 px-4">Trạng thái</th>
                <th className="text-left py-3 px-4">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredEnrollments.map((enrollment) => (
                <tr key={enrollment.id} className="border-b hover:bg-light-gray transition-colors">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium">{enrollment.student}</p>
                      <p className="text-sm text-gray-500">{enrollment.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <span className="font-medium">{enrollment.course}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(enrollment.date).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(enrollment.status)}
                  </td>
                  <td className="py-3 px-4">
                    {enrollment.status === 'pending' ? (
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-success/10 rounded-lg transition-colors">
                          <Check className="w-4 h-4 text-success" />
                        </button>
                        <button className="p-2 hover:bg-error/10 rounded-lg transition-colors">
                          <X className="w-4 h-4 text-error" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Đã xử lý</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEnrollments.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Không có đăng ký nào</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageEnrollments;