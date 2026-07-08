import * as yup from 'yup';
import {
  STRONG_PASSWORD_REGEX,
  STRONG_PASSWORD_MESSAGE,
  PASSWORD_UPPERCASE_REGEX,
  PASSWORD_LOWERCASE_REGEX,
  PASSWORD_DIGIT_REGEX,
  PASSWORD_SPECIAL_CHAR_REGEX,
} from '../constants/regex';

export interface PasswordStrengthResult {
  strength: number;
  text: string;
  color: string;
}

export const strongPasswordYupSchema = yup
  .string()
  .required()
  .matches(STRONG_PASSWORD_REGEX, STRONG_PASSWORD_MESSAGE);

export function getPasswordStrength(password: string): PasswordStrengthResult {
  if (!password) return { strength: 0, text: '', color: '' };

  if (STRONG_PASSWORD_REGEX.test(password)) {
    return { strength: 4, text: 'Strong', color: '#22c55e' };
  }

  const criteriaMet = [
    password.length >= 8,
    PASSWORD_UPPERCASE_REGEX.test(password),
    PASSWORD_LOWERCASE_REGEX.test(password),
    PASSWORD_DIGIT_REGEX.test(password),
    PASSWORD_SPECIAL_CHAR_REGEX.test(password),
  ].filter(Boolean).length;

  if (criteriaMet <= 2) return { strength: 1, text: 'Weak', color: '#ef4444' };
  if (criteriaMet === 3) return { strength: 2, text: 'Fair', color: '#f59e0b' };
  return { strength: 3, text: 'Good', color: '#3b82f6' };
}
