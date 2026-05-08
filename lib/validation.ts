// Validation utilities for forms and data

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateEmail(email: string): ValidationResult {
  const errors: string[] = [];
  if (!email) {
    errors.push("البريد الإلكتروني مطلوب");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("البريد الإلكتروني غير صحيح");
  }
  return { isValid: errors.length === 0, errors };
}

export function validatePassword(password: string): ValidationResult {
  const errors: string[] = [];
  if (!password) {
    errors.push("كلمة المرور مطلوبة");
  } else {
    if (password.length < 8) errors.push("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
    if (!/[A-Z]/.test(password)) errors.push("يجب أن تحتوي على حرف كبير");
    if (!/[a-z]/.test(password)) errors.push("يجب أن تحتوي على حرف صغير");
    if (!/[0-9]/.test(password)) errors.push("يجب أن تحتوي على رقم");
  }
  return { isValid: errors.length === 0, errors };
}

export function validatePhone(phone: string): ValidationResult {
  const errors: string[] = [];
  if (phone && !/^[\+]?[0-9\s\-\(\)]{8,15}$/.test(phone)) {
    errors.push("رقم الهاتف غير صحيح");
  }
  return { isValid: errors.length === 0, errors };
}

export function validateName(name: string): ValidationResult {
  const errors: string[] = [];
  if (!name || name.trim().length < 2) {
    errors.push("الاسم يجب أن يكون حرفين على الأقل");
  }
  if (name.length > 100) {
    errors.push("الاسم طويل جداً");
  }
  return { isValid: errors.length === 0, errors };
}

export function validateRequired(value: string, fieldName: string): ValidationResult {
  const errors: string[] = [];
  if (!value || value.trim().length === 0) {
    errors.push(`${fieldName} مطلوب`);
  }
  return { isValid: errors.length === 0, errors };
}

export function validateNumber(value: string, fieldName: string, min?: number, max?: number): ValidationResult {
  const errors: string[] = [];
  const num = Number(value);
  if (isNaN(num)) {
    errors.push(`${fieldName} يجب أن يكون رقماً`);
  } else {
    if (min !== undefined && num < min) errors.push(`${fieldName} يجب أن يكون ${min} على الأقل`);
    if (max !== undefined && num > max) errors.push(`${fieldName} يجب أن يكون ${max} على الأكثر`);
  }
  return { isValid: errors.length === 0, errors };
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
}

export function validateForm(validations: ValidationResult[]): ValidationResult {
  const allErrors = validations.flatMap(v => v.errors);
  return { isValid: allErrors.length === 0, errors: allErrors };
}
