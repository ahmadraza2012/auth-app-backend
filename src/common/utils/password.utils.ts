import * as bcrypt from 'bcrypt'; // Import bcrypt
import { PASSWORD_POLICY } from '../config/password-policy.config';

export function validatePassword(password: string): { isValid: boolean; errors: string[] } {

  const { minLength, requireLetter, requireNumber, requireSpecialChar } = PASSWORD_POLICY;
  const errors = [];

  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long.`);
  }
  if (requireLetter && !/[A-Za-z]/.test(password)) {
    errors.push('Password must contain at least one letter.');
  }
  if (requireNumber && !/\d/.test(password)) {
    errors.push('Password must contain at least one number.');
  }
  if (requireSpecialChar && !/[@$!%*?&]/.test(password)) {
    errors.push('Password must contain at least one special character.');
  }

  return { isValid: errors.length === 0, errors };
}

export async function hashedPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}