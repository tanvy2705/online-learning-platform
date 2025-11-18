export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const ROLES = {
  ADMIN: 1,
  STAFF: 2,
  USER: 3,
};

export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

export const COURSE_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  CANCELLED: 'cancelled',
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
};

export const PAYMENT_METHODS = {
  VNPAY: 'vnpay',
  MOMO: 'momo',
  PAYPAL: 'paypal',
  VISA: 'visa',
};

export const NOTIFICATION_TYPES = {
  SYSTEM: 'system',
  PAYMENT: 'payment',
  COURSE: 'course',
  SUPPORT: 'support',
};

export const NOTIFICATION_STATUS = {
  UNREAD: 'unread',
  READ: 'read',
};

export const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
};



export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  VERIFY_EMAIL: '/verify-email',
  COURSES: '/courses',
  COURSE_DETAIL: '/courses/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  PAYMENT_RESULT: '/payment-result',
  NOTIFICATIONS: '/notifications',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_COURSES: '/admin/courses',
  ADMIN_USERS: '/admin/users',
  ADMIN_STAFF: '/admin/staff',
  ADMIN_PAYMENTS: '/admin/payments',
  ADMIN_PROMOTIONS: '/admin/promotions',
  ADMIN_NOTIFICATIONS: '/admin/notifications',
  STAFF_DASHBOARD: '/staff',
  STAFF_ENROLLMENTS: '/staff/enrollments',
  STAFF_SUPPORT: '/staff/support',
};