import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, Tag } from 'lucide-react';
import usePromotionStore from '../../store/usePromotionStore';
import { validateForm } from '../../utils/validateForm';

const ManagePromotions = () => {
  const { promotions, fetchPromotions, createPromotion, updatePromotion, deletePromotion, isLoading } = usePromotionStore();
  const [showModal, setShowModal] = useState(false);
  const [editingPromo, setEditingPromo] = useState(null);
  const [formData, setFormData] = useState({
    code: '',
    discount_percent: '',
    start_date: '',
    end_date: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleOpenModal = (promo = null) => {
    if (promo) {
      setEditingPromo(promo);
      setFormData({
        code: promo.code,
        discount_percent: promo.discount_percent,
        start_date: promo.start_date.split('T')[0],
        end_date: promo.end_date.split('T')[0],
      });
    } else {
      setEditingPromo(null);
      setFormData({
        code: '',
        discount_percent: '',
        start_date: '',
        end_date: '',
      });
    }
    setErrors({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPromo(null);
    setFormData({
      code: '',
      discount_percent: '',
      start_date: '',
      end_date: '',
    });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData, {
      code: { required: true, message: 'Vui lòng nhập mã giảm giá' },
      discount_percent: { required: true, message: 'Vui lòng nhập % giảm giá' },
      start_date: { required: true, message: 'Vui lòng chọn ngày bắt đầu' },
      end_date: { required: true, message: 'Vui lòng chọn ngày kết thúc' },
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const result = editingPromo
      ? await updatePromotion(editingPromo.id, formData)
      : await createPromotion(formData);

    if (result.success) {
      alert(editingPromo ? 'Cập nhật thành công!' : 'Tạo mã giảm giá thành công!');
      handleCloseModal();
    } else {
      alert(result.error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Bạn có chắc muốn xóa mã giảm giá này?')) {
      const result = await deletePromotion(id);
      if (result.success) {
        alert('Xóa thành công!');
      } else {
        alert(result.error);
      }
    }
  };

  const isActive = (promo) => {
    const now = new Date();
    const start = new Date(promo.start_date);
    const end = new Date(promo.end_date);
    return now >= start && now <= end;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 fade-in">
        <div>
          <h1 className="text-3xl font-bold mb-2">Quản lý mã giảm giá</h1>
          <p className="text-gray-600">Tạo và quản lý mã khuyến mãi</p>
        </div>
        <button onClick={() => handleOpenModal()} className="btn btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Tạo mã mới
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
                  <th className="text-left py-3 px-4">Mã</th>
                  <th className="text-left py-3 px-4">Giảm giá</th>
                  <th className="text-left py-3 px-4">Ngày bắt đầu</th>
                  <th className="text-left py-3 px-4">Ngày kết thúc</th>
                  <th className="text-left py-3 px-4">Trạng thái</th>
                  <th className="text-left py-3 px-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {promotions.map((promo) => (
                  <tr key={promo.id} className="border-b hover:bg-light-gray transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-primary" />
                        <span className="font-mono font-semibold">{promo.code}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-error">{promo.discount_percent}%</span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {new Date(promo.start_date).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {new Date(promo.end_date).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`badge ${isActive(promo) ? 'badge-success' : 'badge-error'}`}>
                        {isActive(promo) ? 'Đang hoạt động' : 'Hết hạn'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenModal(promo)}
                          className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4 text-primary" />
                        </button>
                        <button
                          onClick={() => handleDelete(promo.id)}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 slide-down">
            <h2 className="text-2xl font-bold mb-6">
              {editingPromo ? 'Chỉnh sửa mã giảm giá' : 'Tạo mã giảm giá mới'}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Mã giảm giá</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className={`input ${errors.code ? 'input-error' : ''}`}
                  placeholder="SUMMER2024"
                  disabled={!!editingPromo}
                />
                {errors.code && <p className="text-error text-sm mt-1">{errors.code}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Phần trăm giảm giá (%)</label>
                <input
                  type="number"
                  name="discount_percent"
                  value={formData.discount_percent}
                  onChange={handleChange}
                  className={`input ${errors.discount_percent ? 'input-error' : ''}`}
                  placeholder="10"
                  min="1"
                  max="100"
                />
                {errors.discount_percent && <p className="text-error text-sm mt-1">{errors.discount_percent}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Ngày bắt đầu</label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleChange}
                  className={`input ${errors.start_date ? 'input-error' : ''}`}
                />
                {errors.start_date && <p className="text-error text-sm mt-1">{errors.start_date}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Ngày kết thúc</label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleChange}
                  className={`input ${errors.end_date ? 'input-error' : ''}`}
                />
                {errors.end_date && <p className="text-error text-sm mt-1">{errors.end_date}</p>}
              </div>

              <div className="flex gap-3">
                <button type="submit" className="btn btn-primary flex-1">
                  {editingPromo ? 'Cập nhật' : 'Tạo mã'}
                </button>
                <button type="button" onClick={handleCloseModal} className="btn btn-outline flex-1">
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePromotions;