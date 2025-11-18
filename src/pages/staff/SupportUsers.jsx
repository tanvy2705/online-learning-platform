import { useState } from 'react';
import { MessageSquare, Send, User, Clock } from 'lucide-react';

const SupportUsers = () => {
  const [tickets] = useState([
    { id: 1, user: 'Nguyễn Văn A', subject: 'Không thể truy cập khóa học', priority: 'high', status: 'open', messages: 3, lastUpdate: '5 phút trước' },
    { id: 2, user: 'Trần Thị B', subject: 'Yêu cầu hoàn tiền', priority: 'high', status: 'in_progress', messages: 7, lastUpdate: '15 phút trước' },
    { id: 3, user: 'Lê Văn C', subject: 'Thắc mắc về chứng chỉ', priority: 'medium', status: 'open', messages: 2, lastUpdate: '1 giờ trước' },
    { id: 4, user: 'Phạm Thị D', subject: 'Đổi mật khẩu', priority: 'low', status: 'resolved', messages: 5, lastUpdate: '2 giờ trước' },
  ]);

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [message, setMessage] = useState('');

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'gray';
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'open':
        return <span className="badge badge-primary">Mới</span>;
      case 'in_progress':
        return <span className="badge badge-warning">Đang xử lý</span>;
      case 'resolved':
        return <span className="badge badge-success">Đã giải quyết</span>;
      default:
        return <span className="badge">Không xác định</span>;
    }
  };

  return (
    <div>
      <div className="mb-8 fade-in">
        <h1 className="text-3xl font-bold mb-2">Hỗ trợ người dùng</h1>
        <p className="text-gray-600">Xử lý yêu cầu hỗ trợ từ học viên</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tickets List */}
        <div className="lg:col-span-1">
          <div className="card fade-in">
            <h3 className="font-semibold mb-4">Danh sách yêu cầu</h3>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket)}
                  className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedTicket?.id === ticket.id
                      ? 'border-primary bg-primary/5'
                      : 'border-transparent hover:border-gray-200 hover:bg-light-gray'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-${getPriorityColor(ticket.priority)}`}></div>
                      <span className="font-medium text-sm">{ticket.user}</span>
                    </div>
                    {getStatusBadge(ticket.status)}
                  </div>
                  <p className="text-sm font-medium mb-2">{ticket.subject}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {ticket.messages} tin nhắn
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {ticket.lastUpdate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-2">
          {selectedTicket ? (
            <div className="card fade-in" style={{ animationDelay: '0.2s' }}>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
                    {selectedTicket.user.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedTicket.user}</h3>
                    <p className="text-sm text-gray-600">{selectedTicket.subject}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {getStatusBadge(selectedTicket.status)}
                  <span className={`badge badge-${getPriorityColor(selectedTicket.priority)}`}>
                    {selectedTicket.priority === 'high' ? 'Ưu tiên cao' : 
                     selectedTicket.priority === 'medium' ? 'Trung bình' : 
                     'Thấp'}
                  </span>
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-4 mb-4 max-h-[400px] overflow-y-auto">
                {/* User message */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-light-gray rounded-lg p-3">
                      <p className="text-sm">
                        Xin chào, tôi không thể truy cập vào khóa học đã mua. Có thể hỗ trợ tôi được không?
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block">10:30 AM</span>
                  </div>
                </div>

                {/* Staff reply */}
                <div className="flex gap-3 flex-row-reverse">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-sm font-semibold">S</span>
                  </div>
                  <div className="flex-1 text-right">
                    <div className="bg-primary text-white rounded-lg p-3 inline-block text-left">
                      <p className="text-sm">
                        Chào bạn! Tôi đã kiểm tra và thấy tài khoản của bạn đã được kích hoạt. Vui lòng thử đăng xuất và đăng nhập lại.
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block">10:32 AM</span>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="flex gap-3 pt-4 border-t">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  className="input flex-1"
                />
                <button className="btn btn-primary">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="card flex items-center justify-center h-[600px]">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Chọn một yêu cầu để bắt đầu trò chuyện</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportUsers;