import { jwtDecode } from 'jwt-decode';

export const getAccessToken = () => {
  return localStorage.getItem('accessToken') || 
         localStorage.getItem('access_token') ||
         localStorage.getItem('token');
};

export const setAccessToken = (token) => {
  // Lưu vào CẢ 3 keys để đảm bảo tương thích
  localStorage.setItem('accessToken', token);
  localStorage.setItem('access_token', token);
  localStorage.setItem('token', token);
  console.log('✅ Token saved:', token.substring(0, 20) + '...');
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken') ||
         localStorage.getItem('refresh_token');
};

export const setRefreshToken = (token) => {
  localStorage.setItem('refreshToken', token);
  localStorage.setItem('refresh_token', token);
  console.log('✅ Refresh token saved');
};

export const removeTokens = () => {
  // Xóa tất cả các keys có thể có
  localStorage.removeItem('accessToken');
  localStorage.removeItem('access_token');
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('refresh_token');
  console.log('✅ All tokens removed');
};

export const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

export const decodeToken = (token) => {
  if (!token) return null;
  
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};

export const getUserFromToken = (token) => {
  const decoded = decodeToken(token);
  if (!decoded) return null;
  
  return {
    id: decoded.user_id || decoded.id,
    email: decoded.email,
    role_id: decoded.role_id,
    full_name: decoded.full_name,
  };
};

export const getTokenExpiration = (token) => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return null;
  return new Date(decoded.exp * 1000);
};

export const isTokenValid = (token) => {
  return token && !isTokenExpired(token);
};