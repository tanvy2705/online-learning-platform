import { create } from 'zustand';
import cartApi from '../api/cartApi';

const useCartStore = create((set, get) => ({
  cart: [],
  cartCount: 0,
  isLoading: false,

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const response = await cartApi.getCart();
      set({ cart: response.data, cartCount: response.data.length, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Fetch cart error:', error);
    }
  },

  addToCart: async (courseId) => {
    try {
      await cartApi.addToCart(courseId);
      await get().fetchCart();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Thêm vào giỏ hàng thất bại' 
      };
    }
  },

  removeFromCart: async (itemId) => {
    try {
      await cartApi.removeFromCart(itemId);
      await get().fetchCart();
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Xóa khỏi giỏ hàng thất bại' 
      };
    }
  },

  clearCart: async () => {
    try {
      await cartApi.clearCart();
      set({ cart: [], cartCount: 0 });
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Xóa giỏ hàng thất bại' };
    }
  },

  getTotalAmount: () => {
    const { cart } = get();
    return cart.reduce((total, item) => {
      const price = item.course.discount_price || item.course.price;
      return total + parseFloat(price);
    }, 0);
  },
}));

export default useCartStore;