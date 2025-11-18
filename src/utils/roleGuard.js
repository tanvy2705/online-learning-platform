import { ROLES } from './constants.js';

export const isAdmin = (user) => {
  return user && user.role_id === ROLES.ADMIN;
};

export const isStaff = (user) => {
  return user && user.role_id === ROLES.STAFF;
};

export const isUser = (user) => {
  return user && user.role_id === ROLES.USER;
};

export const hasRole = (user, roles) => {
  if (!user) return false;
  return roles.includes(user.role_id);
};

export const canAccessAdminPanel = (user) => {
  return isAdmin(user);
};

export const canAccessStaffPanel = (user) => {
  return isAdmin(user) || isStaff(user);
};

export const getRoleName = (roleId) => {
  switch(roleId) {
    case ROLES.ADMIN:
      return 'Admin';
    case ROLES.STAFF:
      return 'Staff';
    case ROLES.USER:
      return 'User';
    default:
      return 'Unknown';
  }
};
