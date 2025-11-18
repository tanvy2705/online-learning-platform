import axiosClient from './axiosClient';

const cartApi = {
  getCart: () => {
    return axiosClient.get('/cart');
  },

  addToCart: (courseId) => {
    return axiosClient.post('/cart/add', { course_id: courseId });
  },

  removeFromCart: (itemId) => {
    return axiosClient.delete(`/cart/remove/${itemId}`);
  },

  clearCart: () => {
    return axiosClient.delete('/cart/clear');
  },

  getCartCount: () => {
    return axiosClient.get('/cart/count');
  },

  updateQuantity: (itemId, quantity) => {
    return axiosClient.put(`/cart/item/${itemId}`, { quantity });
  },
};

export default cartApi;