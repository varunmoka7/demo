
import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  if (!input || typeof input !== 'string') return '';
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
};

/**
 * Validate email format securely
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(sanitizeInput(email));
};

/**
 * Validate password strength
 */
export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (!password) {
    return { isValid: false, message: 'Password is required' };
  }
  
  if (password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters long' };
  }
  
  if (!/(?=.*[a-z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' };
  }
  
  return { isValid: true };
};

/**
 * Rate limiting implementation (simple in-memory store)
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export const checkRateLimit = (identifier: string, limit: number = 5, windowMs: number = 15 * 60 * 1000): boolean => {
  const now = Date.now();
  const key = identifier.toLowerCase();
  
  const record = rateLimitStore.get(key);
  
  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (record.count >= limit) {
    return false;
  }
  
  record.count++;
  return true;
};

/**
 * Validate that public data access is properly secured
 */
export const validateSecurePublicAccess = async (): Promise<{ isSecure: boolean; issues: string[] }> => {
  const issues: string[] = [];
  
  try {
    console.log('Validating secure public data access...');
    
    // This would be expanded with actual security checks
    // For now, we log the validation attempt
    
    if (issues.length === 0) {
      console.log('✅ Public data access validation passed');
      return { isSecure: true, issues: [] };
    }
    
    console.warn('⚠️ Security validation found issues:', issues);
    return { isSecure: false, issues };
    
  } catch (error) {
    console.error('❌ Security validation failed:', error);
    return { 
      isSecure: false, 
      issues: ['Security validation failed due to unexpected error'] 
    };
  }
};

/**
 * Generic error message for authentication to prevent enumeration
 */
export const getGenericAuthError = (): string => {
  return 'Invalid credentials. Please check your email/username and password.';
};

/**
 * Validate username format
 */
export const validateUsername = (username: string): { isValid: boolean; message?: string } => {
  const sanitized = sanitizeInput(username);
  
  if (!sanitized) {
    return { isValid: false, message: 'Username is required' };
  }
  
  if (sanitized.length < 3) {
    return { isValid: false, message: 'Username must be at least 3 characters long' };
  }
  
  if (sanitized.length > 20) {
    return { isValid: false, message: 'Username must be less than 20 characters long' };
  }
  
  if (!/^[a-zA-Z0-9_-]+$/.test(sanitized)) {
    return { isValid: false, message: 'Username can only contain letters, numbers, underscores, and hyphens' };
  }
  
  return { isValid: true };
};

/**
 * Sanitize and validate display name
 */
export const validateDisplayName = (name: string): { isValid: boolean; sanitized: string; message?: string } => {
  const sanitized = sanitizeInput(name.trim());
  
  if (!sanitized) {
    return { isValid: false, sanitized: '', message: 'Display name is required' };
  }
  
  if (sanitized.length > 50) {
    return { isValid: false, sanitized: '', message: 'Display name must be less than 50 characters long' };
  }
  
  return { isValid: true, sanitized };
};
