import { useState } from 'react';
import { User, Mail, Lock, Camera } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import userApi from '../../api/userApi';
import { validateForm } from '../../utils/validateForm';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);
  
  const [profileData, setProfileData] = useState({
    full_name: user?.full_name || '',
    email: user?.email || '',
  });

  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });

  const [errors, setErrors] = useState({});

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(profileData, {
      full_name: { required: true, message: 'Vui lòng nhập họ tên' },
      email: { required: true, email: true },
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await userApi.updateProfile(profileData);
      updateUser(response.data);
      alert('Cập nhật thông tin thành công!');
    } catch (error) {
      alert('Cập nhật thất bại: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(passwordData, {
      current_password: { required: true, message: 'Vui lòng nhập mật khẩu hiện tại' },
      new_password: { required: true, minLength: 6 },
      confirm_password: { 
        required: true, 
        match: 'new_password', 
        matchMessage: 'Mật khẩu không khớp' 
      },
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await userApi.changePassword({
        current_password: passwordData.current_password,
        new_password: passwordData.new_password,
      });
      alert('Đổi mật khẩu thành công!');
      setPasswordData({
        current_password: '',
        new_password: '',
        confirm_password: '',
      });
    } catch (error) {
      alert('Đổi mật khẩu thất bại: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-gray py-12">
      <div className="container max-w-4xl">
        <div className="mb-8 fade-in">
          <h1 className="text-3xl font-bold mb-2">Tài khoản của tôi</h1>
          <p className="text-gray-600">Quản lý thông tin cá nhân và bảo mật</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card fade-in">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold text-3xl">
                    {user?.full_name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <button className="text-sm text-primary hover:underline flex items-center gap-1 mx-auto">
                  <Camera className="w-4 h-4" />
                  Đổi ảnh
                </button>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'profile' ? 'bg-primary text-white' : 'hover:bg-light-gray'
                  }`}
                >
                  Thông tin cá nhân
                </button>
                <button
                  onClick={() => setActiveTab('password')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'password' ? 'bg-primary text-white' : 'hover:bg-light-gray'
                  }`}
                >
                  Đổi mật khẩu
                </button>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="card fade-in">
                <h2 className="text-xl font-semibold mb-6">Thông tin cá nhân</h2>
                <form onSubmit={handleProfileSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Họ và tên</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="full_name"
                        value={profileData.full_name}
                        onChange={handleProfileChange}
                        className={`input pl-10 ${errors.full_name ? 'input-error' : ''}`}
                      />
                    </div>
                    {errors.full_name && (
                      <p className="text-error text-sm mt-1">{errors.full_name}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        className={`input pl-10 ${errors.email ? 'input-error' : ''}`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-error text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary"
                  >
                    {isLoading ? <div className="spinner w-5 h-5 mx-auto"></div> : 'Cập nhật'}
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'password' && (
              <div className="card fade-in">
                <h2 className="text-xl font-semibold mb-6">Đổi mật khẩu</h2>
                <form onSubmit={handlePasswordSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Mật khẩu hiện tại</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        name="current_password"
                        value={passwordData.current_password}
                        onChange={handlePasswordChange}
                        className={`input pl-10 ${errors.current_password ? 'input-error' : ''}`}
                      />
                    </div>
                    {errors.current_password && (
                      <p className="text-error text-sm mt-1">{errors.current_password}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Mật khẩu mới</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        name="new_password"
                        value={passwordData.new_password}
                        onChange={handlePasswordChange}
                        className={`input pl-10 ${errors.new_password ? 'input-error' : ''}`}
                      />
                    </div>
                    {errors.new_password && (
                      <p className="text-error text-sm mt-1">{errors.new_password}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Xác nhận mật khẩu mới</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="password"
                        name="confirm_password"
                        value={passwordData.confirm_password}
                        onChange={handlePasswordChange}
                        className={`input pl-10 ${errors.confirm_password ? 'input-error' : ''}`}
                      />
                    </div>
                    {errors.confirm_password && (
                      <p className="text-error text-sm mt-1">{errors.confirm_password}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary"
                  >
                    {isLoading ? <div className="spinner w-5 h-5 mx-auto"></div> : 'Đổi mật khẩu'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;