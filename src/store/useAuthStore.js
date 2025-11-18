import { create } from 'zustand';
import authApi from '../api/authApi.js';
import { setAccessToken, setRefreshToken, removeTokens, getUserFromToken, getAccessToken } from '../utils/tokenUtils';

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  initAuth: async () => {
    const token = getAccessToken();
    if (token) {
      try {
        const user = getUserFromToken(token);
        set({ user, isAuthenticated: true, isLoading: false });
      } catch (error) {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      set({ isLoading: false });
    }
  },

  login: async (credentials) => {
    try {
      const response = await authApi.login(credentials);
      const { access_token, refresh_token, user } = response.data;
      
      setAccessToken(access_token);
      setRefreshToken(refresh_token);
      
      set({ user, isAuthenticated: true });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Đăng nhập thất bại' 
      };
    }
  },

  register: async (userData) => {
    try {
      const response = await authApi.register(userData);
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Đăng ký thất bại' 
      };
    }
  },

  logout: async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      removeTokens();
      set({ user: null, isAuthenticated: false });
    }
  },

  updateUser: (userData) => {
    set({ user: { ...get().user, ...userData } });
  },
}));

export default useAuthStore;