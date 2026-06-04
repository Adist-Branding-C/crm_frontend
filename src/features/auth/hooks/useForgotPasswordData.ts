import { useState, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { authService } from '../services/AuthService';
import type { ForgotPasswordFormData } from '../types/auth.types';
import { forgotPasswordValidationSchema } from '../validations/forgotPassword.schema';

const forgotPasswordInitialValues: ForgotPasswordFormData = { phone: '' };

export function useForgotPasswordData() {
  const [submittedPhone, setSubmittedPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = useCallback(async (
    values: ForgotPasswordFormData,
    { setSubmitting }: FormikHelpers<ForgotPasswordFormData>,
  ) => {
    setError('');
    setIsLoading(true);

    try {
      const response = await authService.forgotPassword({ phone: values.phone });

      if (response.status) {
        setSubmittedPhone(values.phone);
        setIsSent(true);
      } else {
        setError(response.message || 'Failed to send reset link');
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to send reset link');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  }, []);

  return {
    submittedPhone,
    isLoading, isSent, setIsSent, error,
    handleSubmit,
    validationSchema: forgotPasswordValidationSchema as any,
    initialValues: forgotPasswordInitialValues,
  };
}
