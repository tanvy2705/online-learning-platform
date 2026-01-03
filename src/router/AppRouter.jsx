import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES, ROLES } from '../utils/constants';
import ProtectedRoute from '../components/ProtectedRoute';
import UserLayout from '../components/Layouts/UserLayout';
import AdminLayout from '../components/Layouts/AdminLayout';
import StaffLayout from '../components/Layouts/StaffLayout';

// Auth pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import VerifyEmail from '../pages/auth/VerifyEmail';

// User pages
import Home from '../pages/user/Home';
import Courses from '../pages/user/Courses';
import CourseDetail from '../pages/user/CourseDetail';
import Learning from '../pages/user/Learning';
import Cart from '../pages/user/Cart';
import Checkout from '../pages/user/Checkout';
import PaymentResult from '../pages/user/PaymentResult';
import Notifications from '../pages/user/Notifications';
import MyCourses from '../pages/user/MyCourses';
import Profile from '../pages/user/Profile';

// Admin pages
import AdminDashboard from '../pages/admin/Dashboard';
import ManageCourses from '../pages/admin/ManageCourses';
import ManageUsers from '../pages/admin/ManageUsers';
import ManageStaff from '../pages/admin/ManageStaff';
import ManagePayments from '../pages/admin/ManagePayments';
import ManagePromotions from '../pages/admin/ManagePromotions';
import ManageNotifications from '../pages/admin/ManageNotifications';

// Staff pages
import StaffDashboard from '../pages/staff/Dashboard';
import ManageEnrollments from '../pages/staff/ManageEnrollments';
import SupportUsers from '../pages/staff/SupportUsers';

// Error pages
import NotFound from '../pages/error/NotFound';
import Unauthorized from '../pages/error/Unauthorized';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Auth routes */}
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={ROUTES.VERIFY_EMAIL} element={<VerifyEmail />} />

        {/* User routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.COURSES} element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          
          <Route path="/learning/:courseId" element={
            <ProtectedRoute>
              <Learning />
            </ProtectedRoute>
          } />
          
          <Route path={ROUTES.CART} element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          
          <Route path={ROUTES.CHECKOUT} element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />

          {/* Payment result routes - Support multiple URLs */}
          <Route path="/payment-success" element={<PaymentResult />} />
          <Route path="/payment-failed" element={<PaymentResult />} />
          <Route path={ROUTES.PAYMENT_RESULT} element={<PaymentResult />} />

          <Route path={ROUTES.NOTIFICATIONS} element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          } />

          <Route path="/my-courses" element={
            <ProtectedRoute>
              <MyCourses />
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path="courses" element={<ManageCourses />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="staff" element={<ManageStaff />} />
          <Route path="payments" element={<ManagePayments />} />
          <Route path="promotions" element={<ManagePromotions />} />
          <Route path="notifications" element={<ManageNotifications />} />
        </Route>

        {/* Staff routes */}
        <Route path="/staff" element={
          <ProtectedRoute allowedRoles={[ROLES.STAFF, ROLES.ADMIN]}>
            <StaffLayout />
          </ProtectedRoute>
        }>
        
          <Route index element={<StaffDashboard />} />
          <Route path="enrollments" element={<ManageEnrollments />} />
          <Route path="support" element={<SupportUsers />} />
        </Route>

        {/* Error routes */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;