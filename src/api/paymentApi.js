import axiosClient from './axiosClient';

const paymentApi = {
  createOrder: (orderData) => {
    return axiosClient.post('/orders', orderData);
  },

  getOrders: (params) => {
    return axiosClient.get('/orders', { params });
  },

  getOrderById: (id) => {
    return axiosClient.get(`/orders/${id}`);
  },

  createPayment: (paymentData) => {
    return axiosClient.post('/payments', paymentData);
  },

  getPaymentUrl: (orderId, paymentMethod) => {
    return axiosClient.post(`/payments/create-url`, { 
      order_id: orderId, 
      payment_method: paymentMethod 
    });
  },

  handlePaymentCallback: (params) => {
    return axiosClient.get('/payments/callback', { params });
  },

  verifyPayment: (transactionCode) => {
    return axiosClient.post('/payments/verify', { transaction_code: transactionCode });
  },

  getPaymentHistory: () => {
    return axiosClient.get('/payments/history');
  },

  getAllPayments: (params) => {
    return axiosClient.get('/payments', { params });
  },
};

export default paymentApi;