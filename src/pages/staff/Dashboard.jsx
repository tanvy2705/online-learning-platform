import { CheckCircle, Clock, AlertCircle, Users } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { icon: Clock, label: 'Nhiệm vụ đang xử lý', value: 12, color: 'warning' },
    { icon: CheckCircle, label: 'Hoàn thành hôm nay', value: 8, color: 'success' },
    { icon: AlertCircle, label: 'Cần xử lý gấp', value: 3, color: 'error' },
    { icon: Users, label: 'Hỗ trợ người dùng', value: 24, color: 'primary' },
  ];

  const recentTasks = [
    { id: 1, title: 'Xử lý yêu cầu hoàn tiền', user: 'Nguyễn Văn A', priority: 'high', status: 'pending' },
    { id: 2, title: 'Hỗ trợ kích hoạt tài khoản', user: 'Trần Thị B', priority: 'medium', status: 'in_progress' },
    { id: 3, title: 'Giải đáp thắc mắc khóa học', user: 'Lê Văn C', priority: 'low', status: 'pending' },
    { id: 4, title: 'Cập nhật thông tin học viên', user: 'Phạm Thị D', priority: 'medium', status: 'completed' },
  ];

  return (
    <div>
      <div className="mb-8 fade-in">
        <h1 className="text-3xl font-bold mb-2">Staff Dashboard</h1>
        <p className="text-gray-600">Chào mừng quay trở lại! Đây là tổng quan công việc của bạn.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div 
              key={index}
              className="card hover:shadow-xl transition-all fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${stat.color}/10 rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}`} />
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Tasks */}
      <div className="card fade-in" style={{ animationDelay: '0.4s' }}>
        <h3 className="text-xl font-semibold mb-6">Nhiệm vụ gần đây</h3>
        <div className="space-y-4">
          {recentTasks.map((task) => (
            <div 
              key={task.id}
              className="flex items-center justify-between p-4 bg-light-gray rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-2 h-2 rounded-full ${
                  task.priority === 'high' ? 'bg-error' :
                  task.priority === 'medium' ? 'bg-warning' :
                  'bg-success'
                }`}></div>
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{task.title}</h4>
                  <p className="text-sm text-gray-600">Người dùng: {task.user}</p>
                </div>
              </div>
              <span className={`badge ${
                task.status === 'completed' ? 'badge-success' :
                task.status === 'in_progress' ? 'badge-warning' :
                'badge-primary'
              }`}>
                {task.status === 'completed' ? 'Hoàn thành' :
                 task.status === 'in_progress' ? 'Đang xử lý' :
                 'Chờ xử lý'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="card hover:shadow-xl transition-all cursor-pointer fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Quản lý đăng ký</h3>
            <p className="text-sm text-gray-600">Xử lý yêu cầu đăng ký khóa học</p>
          </div>
        </div>

        <div className="card hover:shadow-xl transition-all cursor-pointer fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h3 className="font-semibold mb-2">Hoàn thành nhiệm vụ</h3>
            <p className="text-sm text-gray-600">Đánh dấu nhiệm vụ đã xong</p>
          </div>
        </div>

        <div className="card hover:shadow-xl transition-all cursor-pointer fade-in" style={{ animationDelay: '0.7s' }}>
          <div className="text-center">
            <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-warning" />
            </div>
            <h3 className="font-semibold mb-2">Hỗ trợ khẩn cấp</h3>
            <p className="text-sm text-gray-600">Xử lý các vấn đề ưu tiên cao</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;