import { useEffect, useState } from 'react';
import { Users, BookOpen, DollarSign, TrendingUp, ShoppingCart } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 1234,
    totalCourses: 89,
    totalRevenue: 125000000,
    totalOrders: 456,
    recentOrders: [],
  });

  const statCards = [
    {
      icon: Users,
      label: 'Tổng người dùng',
      value: stats.totalUsers.toLocaleString(),
      change: '+12%',
      color: 'primary',
    },
    {
      icon: BookOpen,
      label: 'Khóa học',
      value: stats.totalCourses.toLocaleString(),
      change: '+5%',
      color: 'secondary',
    },
    {
      icon: DollarSign,
      label: 'Doanh thu',
      value: formatCurrency(stats.totalRevenue),
      change: '+18%',
      color: 'success',
    },
    {
      icon: ShoppingCart,
      label: 'Đơn hàng',
      value: stats.totalOrders.toLocaleString(),
      change: '+8%',
      color: 'warning',
    },
  ];

  return (
    <div>
      <div className="mb-8 fade-in">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600">Tổng quan hệ thống</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
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
                <span className="text-success text-sm font-medium">{stat.change}</span>
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="card fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold">Doanh thu theo tháng</h3>
            <select className="input py-2">
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {[65, 45, 75, 55, 85, 70, 90, 80, 95, 85, 100, 90].map((height, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-t-lg relative group"
                style={{ height: `${height}%` }}>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {height}M
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-500">
            {['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'].map((m, i) => (
              <span key={i}>{m}</span>
            ))}
          </div>
        </div>

        {/* Popular Courses */}
        <div className="card fade-in" style={{ animationDelay: '0.5s' }}>
          <h3 className="text-xl font-semibold mb-6">Khóa học phổ biến</h3>
          <div className="space-y-4">
            {[
              { name: 'React Advanced', students: 1234, revenue: 45000000 },
              { name: 'Node.js Master', students: 987, revenue: 38000000 },
              { name: 'Python Pro', students: 856, revenue: 32000000 },
              { name: 'Java Fullstack', students: 745, revenue: 28000000 },
            ].map((course, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-light-gray rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <p className="font-medium">{course.name}</p>
                  <p className="text-sm text-gray-600">{course.students} học viên</p>
                </div>
                <p className="font-semibold text-success">{formatCurrency(course.revenue)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card fade-in" style={{ animationDelay: '0.6s' }}>
        <h3 className="text-xl font-semibold mb-6">Đơn hàng gần đây</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Mã đơn</th>
                <th className="text-left py-3 px-4">Khách hàng</th>
                <th className="text-left py-3 px-4">Khóa học</th>
                <th className="text-left py-3 px-4">Số tiền</th>
                <th className="text-left py-3 px-4">Trạng thái</th>
                <th className="text-left py-3 px-4">Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '#ORD-001', customer: 'Nguyễn Văn A', course: 'React Advanced', amount: 1500000, status: 'paid', time: '5 phút trước' },
                { id: '#ORD-002', customer: 'Trần Thị B', course: 'Node.js Master', amount: 1200000, status: 'paid', time: '15 phút trước' },
                { id: '#ORD-003', customer: 'Lê Văn C', course: 'Python Pro', amount: 980000, status: 'pending', time: '30 phút trước' },
                { id: '#ORD-004', customer: 'Phạm Thị D', course: 'Java Fullstack', amount: 1800000, status: 'paid', time: '1 giờ trước' },
                { id: '#ORD-005', customer: 'Hoàng Văn E', course: 'React Advanced', amount: 1500000, status: 'cancelled', time: '2 giờ trước' },
              ].map((order, i) => (
                <tr key={i} className="border-b hover:bg-light-gray transition-colors">
                  <td className="py-3 px-4 font-medium">{order.id}</td>
                  <td className="py-3 px-4">{order.customer}</td>
                  <td className="py-3 px-4">{order.course}</td>
                  <td className="py-3 px-4 font-semibold">{formatCurrency(order.amount)}</td>
                  <td className="py-3 px-4">
                    <span className={`badge ${
                      order.status === 'paid' ? 'badge-success' : 
                      order.status === 'pending' ? 'badge-warning' : 
                      'badge-error'
                    }`}>
                      {order.status === 'paid' ? 'Đã thanh toán' : 
                       order.status === 'pending' ? 'Chờ xử lý' : 
                       'Đã hủy'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;