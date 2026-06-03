import { useState } from 'react';
import type { PasswordFormData, PasswordStrengthResult } from '../types';
import { INITIAL_PASSWORD_FORM, MIN_PASSWORD_LENGTH } from '../constants';
import { PASSWORD_UPPERCASE_REGEX, PASSWORD_DIGIT_REGEX } from '../../../shared/constants/regex';

export const usePasswordData = () => {
  const [formData, setFormData] = useState<PasswordFormData>(INITIAL_PASSWORD_FORM);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorMessage('');
    setSuccessMessage('');
  };

  const getPasswordStrength = (password: string): PasswordStrengthResult => {
    if (!password) return { strength: 0, text: '', color: '' };
    if (password.length < MIN_PASSWORD_LENGTH) return { strength: 1, text: 'Weak', color: '#ef4444' };
    if (password.length < 8) return { strength: 2, text: 'Fair', color: '#f59e0b' };
    if (password.length >= 8 && PASSWORD_UPPERCASE_REGEX.test(password) && PASSWORD_DIGIT_REGEX.test(password)) {
      return { strength: 4, text: 'Strong', color: '#22c55e' };
    }
    return { strength: 3, text: 'Good', color: '#3b82f6' };
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.currentPassword) {
      setErrorMessage('Please enter your current password');
      return;
    }
    if (formData.newPassword.length < MIN_PASSWORD_LENGTH) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage('New password and confirm password do not match');
      return;
    }
    setSuccessMessage('Password changed successfully!');
    setFormData(INITIAL_PASSWORD_FORM);
  };

  return {
    formData,
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    successMessage,
    errorMessage,
    passwordStrength,
    setShowCurrentPassword,
    setShowNewPassword,
    setShowConfirmPassword,
    handleInputChange,
    handleSubmit,
  };
};
