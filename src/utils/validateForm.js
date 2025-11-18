export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validateMinLength = (value, minLength) => {
  return value && value.length >= minLength;
};

export const validateMaxLength = (value, maxLength) => {
  return !value || value.length <= maxLength;
};

export const validatePhone = (phone) => {
  const re = /^[0-9]{10,11}$/;
  return re.test(phone);
};

export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateForm = (formData, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach((field) => {
    const rule = rules[field];
    const value = formData[field];
    
    if (rule.required && !validateRequired(value)) {
      errors[field] = rule.message || 'Trường này là bắt buộc';
      return;
    }
    
    if (rule.email && value && !validateEmail(value)) {
      errors[field] = 'Email không hợp lệ';
      return;
    }
    
    if (rule.minLength && value && value.length < rule.minLength) {
      errors[field] = `Tối thiểu ${rule.minLength} ký tự`;
      return;
    }
    
    if (rule.maxLength && value && value.length > rule.maxLength) {
      errors[field] = `Tối đa ${rule.maxLength} ký tự`;
      return;
    }
    
    if (rule.match && value !== formData[rule.match]) {
      errors[field] = rule.matchMessage || 'Không khớp';
      return;
    }

    if (rule.phone && value && !validatePhone(value)) {
      errors[field] = 'Số điện thoại không hợp lệ';
      return;
    }

    if (rule.url && value && !validateUrl(value)) {
      errors[field] = 'URL không hợp lệ';
      return;
    }
  });
  
  return errors;
};