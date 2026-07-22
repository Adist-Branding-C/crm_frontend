import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { FormikHelpers } from 'formik';
import { passwordService } from '../services/password.service';
import type { PasswordFormData } from '../types';
import { INITIAL_PASSWORD_FORM } from '../constants';
import { getPasswordStrength } from '../../../../shared/validations/password.validation';
import { AUTH_ROUTES } from '../../../auth/constants/auth.constants';
import { clearAuthTokens } from '../../../auth/utils/tokenStorage';

const POST_PASSWORD_CHANGE_LOGOUT_DELAY_MS = 2000;

export const usePasswordData = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showToast, setShowToast] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const logoutTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (logoutTimeoutRef.current) clearTimeout(logoutTimeoutRef.current);
    };
  }, []);

  const showToastMessage = useCallback((message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  }, []);

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
        showToastMessage('Password changed successfully! Please sign in again.', 'success');
        logoutTimeoutRef.current = setTimeout(() => {
          clearAuthTokens();
          navigate(AUTH_ROUTES.LOGIN);
        }, POST_PASSWORD_CHANGE_LOGOUT_DELAY_MS);
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
  }, [showToastMessage, navigate]);

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
