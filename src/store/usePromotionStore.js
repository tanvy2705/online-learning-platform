import { create } from 'zustand';
import promotionApi from '../api/promotionApi';

const usePromotionStore = create((set, get) => ({
  promotions: [],
  activePromotions: [],
  appliedPromo: null,
  isLoading: false,

  fetchPromotions: async () => {
    set({ isLoading: true });
    try {
      const response = await promotionApi.getAllPromotions();
      set({ promotions: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Fetch promotions error:', error);
    }
  },

  fetchActivePromotions: async () => {
    try {
      const response = await promotionApi.getActivePromotions();
      set({ activePromotions: response.data });
    } catch (error) {
      console.error('Fetch active promotions error:', error);
    }
  },

  validatePromoCode: async (code) => {
    try {
      const response = await promotionApi.validatePromoCode(code);
      set({ appliedPromo: response.data });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Mã giảm giá không hợp lệ' 
      };
    }
  },

  clearAppliedPromo: () => {
    set({ appliedPromo: null });
  },

  createPromotion: async (promotionData) => {
    try {
      await promotionApi.createPromotion(promotionData);
      await get().fetchPromotions();
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Tạo mã giảm giá thất bại' };
    }
  },

  updatePromotion: async (id, promotionData) => {
    try {
      await promotionApi.updatePromotion(id, promotionData);
      await get().fetchPromotions();
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Cập nhật mã giảm giá thất bại' };
    }
  },

  deletePromotion: async (id) => {
    try {
      await promotionApi.deletePromotion(id);
      await get().fetchPromotions();
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Xóa mã giảm giá thất bại' };
    }
  },
}));

export default usePromotionStore;