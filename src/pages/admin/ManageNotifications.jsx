import { useState } from 'react';
import { Send, Users, User } from 'lucide-react';
import notificationApi from '../../api/notificationApi';
import { NOTIFICATION_TYPES } from '../../utils/constants';

const ManageNotifications = () => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: NOTIFICATION_TYPES.SYSTEM,
    target: 'all', // all, users, staff, specific
    user_ids: '',
  });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.message) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    setIsSending(true);

    try {
      if (formData.target === 'specific' && formData.user_ids) {
        const userIds = formData.user_ids.split(',').map(id => parseInt(id.trim()));
        await notificationApi.sendBulkNotification({
          title: formData.title,
          message: formData.message,
          type: formData.type,
          user_ids: userIds,
        });
      } else {
        await notificationApi.sendBulkNotification({
          title: formData.title,
          message: formData.message,
          type: formData.type,
          target: formData.target,
        });
      }

      alert('Gửi thông báo thành công!');
      setFormData({
        title: '',
        message: '',
        type: NOTIFICATION_TYPES.SYSTEM,
        target: 'all',
        user_ids: '',
      });
    } catch (error) {
      alert('Có lỗi xảy ra: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <div className="mb-8 fade-in">
        <h1 className="text-3xl font-bold mb-2">Gửi thông báo</h1>
        <p className="text-gray-600">Gửi thông báo đến người dùng hoặc nhân viên</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <div className="card fade-in" style={{ animationDelay: '0.2s' }}>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Tiêu đề thông báo</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input"
                  placeholder="Tiêu đề thông báo..."
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Nội dung</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="input min-h-32"
                  placeholder="Nội dung thông báo..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Loại thông báo</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value={NOTIFICATION_TYPES.SYSTEM}>Hệ thống</option>
                    <option value={NOTIFICATION_TYPES.PAYMENT}>Thanh toán</option>
                    <option value={NOTIFICATION_TYPES.COURSE}>Khóa học</option>
                    <option value={NOTIFICATION_TYPES.SUPPORT}>Hỗ trợ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Đối tượng</label>
                  <select
                    name="target"
                    value={formData.target}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="all">Tất cả</option>
                    <option value="users">Chỉ người dùng</option>
                    <option value="staff">Chỉ nhân viên</option>
                    <option value="specific">Cụ thể</option>
                  </select>
                </div>
              </div>

              {formData.target === 'specific' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    User IDs (cách nhau bởi dấu phẩy)
                  </label>
                  <input
                    type="text"
                    name="user_ids"
                    value={formData.user_ids}
                    onChange={handleChange}
                    className="input"
                    placeholder="1, 2, 3, 4..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Ví dụ: 1, 5, 10 (gửi cho user có ID 1, 5 và 10)
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSending}
                className="btn btn-primary w-full flex items-center justify-center gap-2"
              >
                {isSending ? (
                  <div className="spinner w-5 h-5"></div>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Gửi thông báo
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Preview & Info */}
        <div className="lg:col-span-1">
          <div className="card fade-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="font-semibold text-lg mb-4">Xem trước</h3>
            
            <div className="bg-light-gray rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Send className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">
                    {formData.title || 'Tiêu đề thông báo'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {formData.message || 'Nội dung thông báo sẽ hiển thị ở đây...'}
                  </p>
                  <span className="text-xs text-gray-400 mt-2 block">Vừa xong</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-light-gray rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Tất cả người dùng</span>
                </div>
                <span className="text-sm text-gray-600">1,234</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-light-gray rounded-lg">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-secondary" />
                  <span className="text-sm font-medium">Nhân viên</span>
                </div>
                <span className="text-sm text-gray-600">45</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h4 className="font-semibold mb-3">Lưu ý</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5"></span>
                  <span>Thông báo sẽ được gửi ngay lập tức</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5"></span>
                  <span>Người dùng sẽ nhận được thông báo realtime</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5"></span>
                  <span>Không thể thu hồi sau khi gửi</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageNotifications;