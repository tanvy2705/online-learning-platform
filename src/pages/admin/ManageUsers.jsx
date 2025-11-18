import { useEffect, useState } from 'react';
import { Users, Edit, Trash2, Lock, Mail } from 'lucide-react';
import userApi from '../../api/userApi';
import { ROLES, USER_STATUS } from '../../utils/constants';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await userApi.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Fetch users error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Bạn có chắc muốn xóa người dùng này?')) {
      try {
        await userApi.deleteUser(id);
        alert('Xóa thành công!');
        fetchUsers();
      } catch (error) {
        alert('Xóa thất bại: ' + error.message);
      }
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role_id === parseInt(filterRole);
    return matchesSearch && matchesRole;
  });

  const getRoleName = (roleId) => {
    switch(roleId) {
      case ROLES.ADMIN: return 'Admin';
      case ROLES.STAFF: return 'Staff';
      case ROLES.USER: return 'User';
      default: return 'Unknown';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Quản lý người dùng</h1>
          <p className="text-gray-600">Tổng số: {users.length} người dùng</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-6 fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input"
          />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="input"
          >
            <option value="all">Tất cả vai trò</option>
            <option value={ROLES.ADMIN}>Admin</option>
            <option value={ROLES.STAFF}>Staff</option>
            <option value={ROLES.USER}>User</option>
          </select>
        </div>
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
                  <th className="text-left py-3 px-4">Người dùng</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Vai trò</th>
                  <th className="text-left py-3 px-4">Trạng thái</th>
                  <th className="text-left py-3 px-4">Ngày tạo</th>
                  <th className="text-left py-3 px-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-light-gray transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
                          {user.full_name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium">{user.full_name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        {user.email}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`badge ${
                        user.role_id === ROLES.ADMIN ? 'badge-error' :
                        user.role_id === ROLES.STAFF ? 'badge-warning' :
                        'badge-primary'
                      }`}>
                        {getRoleName(user.role_id)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`badge ${
                        user.status === USER_STATUS.ACTIVE ? 'badge-success' : 'badge-error'
                      }`}>
                        {user.status === USER_STATUS.ACTIVE ? 'Hoạt động' : 'Vô hiệu'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(user.created_at).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-primary" />
                        </button>
                        <button className="p-2 hover:bg-warning/10 rounded-lg transition-colors">
                          <Lock className="w-4 h-4 text-warning" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-2 hover:bg-error/10 rounded-lg transition-colors"
                          disabled={user.role_id === ROLES.ADMIN}
                        >
                          <Trash2 className={`w-4 h-4 ${user.role_id === ROLES.ADMIN ? 'text-gray-300' : 'text-error'}`} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Không tìm thấy người dùng</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageUsers;