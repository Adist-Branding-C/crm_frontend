import { useState, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { passwordService } from '../services/password.service';
import type { PasswordFormData, PasswordStrengthResult } from '../types';
import { INITIAL_PASSWORD_FORM, MIN_PASSWORD_LENGTH } from '../constants';
import { PASSWORD_UPPERCASE_REGEX, PASSWORD_DIGIT_REGEX } from '../../../../shared/constants/regex';

export const usePasswordData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showToast, setShowToast] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const showToastMessage = useCallback((message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  }, []);

  const getPasswordStrength = (password: string): PasswordStrengthResult => {
    if (!password) return { strength: 0, text: '', color: '' };
    if (password.length < MIN_PASSWORD_LENGTH) return { strength: 1, text: 'Weak', color: '#ef4444' };
    if (password.length < 8) return { strength: 2, text: 'Fair', color: '#f59e0b' };
    if (password.length >= 8 && PASSWORD_UPPERCASE_REGEX.test(password) && PASSWORD_DIGIT_REGEX.test(password)) {
      return { strength: 4, text: 'Strong', color: '#22c55e' };
    }
    return { strength: 3, text: 'Good', color: '#3b82f6' };
  };

  const handleSubmit = useCallback(async (
    values: PasswordFormData,
    { setSubmitting, resetForm }: FormikHelpers<PasswordFormData>,
  ) => {
    setIsLoading(true);
    try {
      const payload = {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      };

      const response = await passwordService.changePassword(payload);

      if (response.status) {
        resetForm();
        showToastMessage('Password changed successfully!', 'success');
        return true;
      } else {
        showToastMessage(response.message || 'Failed to change password', 'error');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        const message = axiosErr.response?.data?.message || 'Failed to change password';
        showToastMessage(message, 'error');
      } else if (err && typeof err === 'object' && 'message' in err) {
        showToastMessage((err as { message: string }).message, 'error');
      } else {
        showToastMessage('Network error. Please try again.', 'error');
      }
      return false;
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  }, [showToastMessage]);

  return {
    isLoading,
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    toastMessage,
    toastType,
    showToast,
    setShowCurrentPassword,
    setShowNewPassword,
    setShowConfirmPassword,
    setShowToast,
    getPasswordStrength,
    handleSubmit,
  };
};
