import { create } from 'zustand';
import cartApi from '../api/cartApi';

const useCartStore = create((set, get) => ({
  cart: [],
  cartCount: 0,
  isLoading: false,

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      console.log('🔄 Fetching cart...');
      const response = await cartApi.getCart();
      console.log('✅ Cart API Response:', response);
      console.log('📦 Cart Data:', response.data);
      
      // ✅ Backend trả về { items: [...], total: ... }
      const cartData = Array.isArray(response.data?.items) 
        ? response.data.items 
        : Array.isArray(response.data) 
        ? response.data 
        : [];
      
      console.log('🛒 Final Cart Array:', cartData);
      
      set({ 
        cart: cartData, 
        cartCount: cartData.length, 
        isLoading: false 
      });
    } catch (error) {
      console.error('❌ Fetch cart error:', error);
      console.error('📄 Error details:', error.response?.data);
      console.error('🔢 Error status:', error.response?.status);
      set({ isLoading: false, cart: [], cartCount: 0 });
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
    // ✅ FIX: Kiểm tra cart là array trước khi dùng reduce
    if (!Array.isArray(cart) || cart.length === 0) {
      return 0;
    }
    
    return cart.reduce((total, item) => {
      // ✅ Kiểm tra item.course tồn tại
      if (!item.course) return total;
      
      const price = item.course.discount_price || item.course.price;
      return total + parseFloat(price || 0);
    }, 0);
  },
}));

export default useCartStore;