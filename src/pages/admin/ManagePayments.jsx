import { useEffect, useState } from 'react';
import { CreditCard, Download, Eye, Filter } from 'lucide-react';
import paymentApi from '../../api/paymentApi';
import { formatCurrency } from '../../utils/formatCurrency';
import { PAYMENT_STATUS, PAYMENT_METHODS } from '../../utils/constants';

const ManagePayments = () => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMethod, setFilterMethod] = useState('all');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setIsLoading(true);
    try {
      const response = await paymentApi.getAllPayments();
      setPayments(response.data);
    } catch (error) {
      console.error('Fetch payments error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    const matchesMethod = filterMethod === 'all' || payment.payment_method === filterMethod;
    return matchesStatus && matchesMethod;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case PAYMENT_STATUS.SUCCESS:
        return <span className="badge badge-success">Thành công</span>;
      case PAYMENT_STATUS.PENDING:
        return <span className="badge badge-warning">Đang xử lý</span>;
      case PAYMENT_STATUS.FAILED:
        return <span className="badge badge-error">Thất bại</span>;
      default:
        return <span className="badge">Không xác định</span>;
    }
  };

  const totalRevenue = filteredPayments
    .filter(p => p.status === PAYMENT_STATUS.SUCCESS)
    .reduce((sum, p) => sum + parseFloat(p.amount), 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-8 fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Quản lý thanh toán</h1>
          <p className="text-gray-600">Theo dõi tất cả giao dịch</p>
        </div>
        <button className="btn btn-primary flex items-center gap-2">
          <Download className="w-5 h-5" />
          Xuất báo cáo
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card fade-in">
          <p className="text-gray-600 text-sm mb-1">Tổng doanh thu</p>
          <p className="text-2xl font-bold text-success">{formatCurrency(totalRevenue)}</p>
        </div>
        <div className="card fade-in" style={{ animationDelay: '0.1s' }}>
          <p className="text-gray-600 text-sm mb-1">Giao dịch thành công</p>
          <p className="text-2xl font-bold text-success">
            {payments.filter(p => p.status === PAYMENT_STATUS.SUCCESS).length}
          </p>
        </div>
        <div className="card fade-in" style={{ animationDelay: '0.2s' }}>
          <p className="text-gray-600 text-sm mb-1">Đang xử lý</p>
          <p className="text-2xl font-bold text-warning">
            {payments.filter(p => p.status === PAYMENT_STATUS.PENDING).length}
          </p>
        </div>
        <div className="card fade-in" style={{ animationDelay: '0.3s' }}>
          <p className="text-gray-600 text-sm mb-1">Thất bại</p>
          <p className="text-2xl font-bold text-error">
            {payments.filter(p => p.status === PAYMENT_STATUS.FAILED).length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-6 fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value={PAYMENT_STATUS.SUCCESS}>Thành công</option>
            <option value={PAYMENT_STATUS.PENDING}>Đang xử lý</option>
            <option value={PAYMENT_STATUS.FAILED}>Thất bại</option>
          </select>
          <select
            value={filterMethod}
            onChange={(e) => setFilterMethod(e.target.value)}
            className="input"
          >
            <option value="all">Tất cả phương thức</option>
            <option value={PAYMENT_METHODS.VNPAY}>VNPay</option>
            <option value={PAYMENT_METHODS.MOMO}>Momo</option>
            <option value={PAYMENT_METHODS.PAYPAL}>PayPal</option>
            <option value={PAYMENT_METHODS.VISA}>VISA</option>
          </select>
        </div>
      </div>

      {/* Payments Table */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="card fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Mã GD</th>
                  <th className="text-left py-3 px-4">Khách hàng</th>
                  <th className="text-left py-3 px-4">Số tiền</th>
                  <th className="text-left py-3 px-4">Phương thức</th>
                  <th className="text-left py-3 px-4">Trạng thái</th>
                  <th className="text-left py-3 px-4">Thời gian</th>
                  <th className="text-left py-3 px-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-light-gray transition-colors">
                    <td className="py-3 px-4 font-mono text-sm font-medium">
                      {payment.transaction_code}
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{payment.user?.full_name || 'N/A'}</p>
                        <p className="text-sm text-gray-500">{payment.user?.email || 'N/A'}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-bold">
                      {formatCurrency(payment.amount)}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium uppercase">
                        {payment.payment_method}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(payment.status)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(payment.created_at).toLocaleString('vi-VN')}
                    </td>
                    <td className="py-3 px-4">
                      <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors">
                        <Eye className="w-4 h-4 text-primary" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPayments.length === 0 && (
            <div className="text-center py-12">
              <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Không có giao dịch nào</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManagePayments;