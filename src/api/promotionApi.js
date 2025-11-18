import axiosClient from './axiosClient';

const promotionApi = {
  getAllPromotions: (params) => {
    return axiosClient.get('/promotions', { params });
  },

  getActivePromotions: () => {
    return axiosClient.get('/promotions/active');
  },

  getPromotionById: (id) => {
    return axiosClient.get(`/promotions/${id}`);
  },

  validatePromoCode: (code) => {
    return axiosClient.post('/promotions/validate', { code });
  },

  createPromotion: (promotionData) => {
    return axiosClient.post('/promotions', promotionData);
  },

  updatePromotion: (id, promotionData) => {
    return axiosClient.put(`/promotions/${id}`, promotionData);
  },

  deletePromotion: (id) => {
    return axiosClient.delete(`/promotions/${id}`);
  },

  applyPromotion: (orderId, code) => {
    return axiosClient.post(`/promotions/apply`, { 
      order_id: orderId, 
      code 
    });
  },

  getPromotionStats: (id) => {
    return axiosClient.get(`/promotions/${id}/stats`);
  },
};

export default promotionApi;