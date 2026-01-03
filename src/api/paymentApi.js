import { API_BASE_URL } from '../utils/constants';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('access_token') || 
         localStorage.getItem('token') || 
         sessionStorage.getItem('access_token') ||
         sessionStorage.getItem('token');
};

// Helper function to handle API calls
const fetchAPI = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No token provided');
  }
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'API request failed' }));
    throw new Error(error.message || `Request failed with status ${response.status}`);
  }

  return response.json();
};

const paymentApi = {
  // Create order from cart
  createOrder: async (data) => {
    console.log('🔵 Creating order with promo:', data.promo_code);
    
    const response = await fetchAPI('/orders', {
      method: 'POST',
      body: JSON.stringify({
        promotion_code: data.promo_code || undefined
      })
    });
    
    console.log('✅ Order created:', response);
    return response;
  },

  // Get payment URL (Support MoMo, VNPay, Manual Transfer)
  getPaymentUrl: async (orderId, paymentMethod) => {
    console.log('🔵 Getting payment URL:', { orderId, paymentMethod });
    
    const response = await fetchAPI('/payments/create-url', {
      method: 'POST',
      body: JSON.stringify({
        order_id: orderId,
        payment_method: paymentMethod // 'momo', 'vnpay', 'manual_transfer'
      })
    });
    
    console.log('✅ Payment URL received:', response);
    return response;
  },

  // Handle payment callback - NOT NEEDED (Backend handles via GET request)
  // VNPay và MoMo redirect về backend trước, backend sẽ redirect sang frontend
  // Frontend chỉ cần đọc URL params để hiển thị kết quả

  // Get payment history
  getPaymentHistory: async (page = 1, limit = 10) => {
    return fetchAPI(`/payments/history?page=${page}&limit=${limit}`);
  },

  // Upload manual transfer bill
  uploadTransferBill: async (orderId, transferPhone, transferName, billFile) => {
    const token = getAuthToken();
    
    if (!token) {
      throw new Error('No token provided');
    }
    
    const formData = new FormData();
    formData.append('order_id', orderId);
    formData.append('transfer_phone', transferPhone);
    formData.append('transfer_name', transferName);
    formData.append('bill_image', billFile);
    
    const response = await fetch(`${API_BASE_URL}/payments/manual-transfer`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
        // Don't set Content-Type for FormData
      },
      body: formData
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Upload failed' }));
      throw new Error(error.message || 'Upload failed');
    }
    
    return response.json();
  },

  // Get order details
  getOrderDetails: async (orderId) => {
    return fetchAPI(`/orders/${orderId}`);
  },
};

export default paymentApi;