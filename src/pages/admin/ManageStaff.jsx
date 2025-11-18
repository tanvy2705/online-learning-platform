import { useEffect, useState } from 'react';
import { UserCog, Plus, Edit, Trash2 } from 'lucide-react';
import userApi from '../../api/userApi';
import { ROLES } from '../../utils/constants';

const ManageStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    setIsLoading(true);
    try {
      const response = await userApi.getAllUsers({ role_id: ROLES.STAFF });
      setStaffList(response.data);
    } catch (error) {
      console.error('Fetch staff error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Bạn có chắc muốn xóa nhân viên này?')) {
      try {
        await userApi.deleteUser(id);
        alert('Xóa thành công!');
        fetchStaff();
      } catch (error) {
        alert('Xóa thất bại: ' + error.message);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Quản lý nhân viên</h1>
          <p className="text-gray-600">Tổng số: {staffList.length} nhân viên</p>
        </div>
        <button className="btn btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Thêm nhân viên
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staffList.map((staff, index) => (
            <div 
              key={staff.id} 
              className="card hover:shadow-xl transition-all fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {staff.full_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{staff.full_name}</h3>
                    <p className="text-sm text-gray-600">{staff.email}</p>
                  </div>
                </div>
                <span className="badge badge-warning">Staff</span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Nhiệm vụ:</span>
                  <span className="font-medium">12 đang xử lý</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Hoàn thành:</span>
                  <span className="font-medium text-success">45 nhiệm vụ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tham gia:</span>
                  <span className="font-medium">
                    {new Date(staff.created_at).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <button className="btn btn-outline flex-1 py-2 text-sm">
                  <Edit className="w-4 h-4" />
                  Sửa
                </button>
                <button 
                  onClick={() => handleDelete(staff.id)}
                  className="btn btn-outline flex-1 py-2 text-sm text-error border-error hover:bg-error hover:text-white"
                >
                  <Trash2 className="w-4 h-4" />
                  Xóa
                </button>
              </div>
            </div>
          ))}

          {staffList.length === 0 && (
            <div className="col-span-full text-center py-12">
              <UserCog className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Chưa có nhân viên nào</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageStaff;