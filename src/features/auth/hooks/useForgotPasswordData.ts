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
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = useCallback(async (
    values: ForgotPasswordFormData,
    { setSubmitting }: FormikHelpers<ForgotPasswordFormData>,
  ) => {
    setError('');
    setIsLoading(true);

    try {
      const response = await authService.forgotPassword({ phone: values.phone });

      const found =
        response.data?.found ??
        /reset link|sent|successful|registered email/i.test(response.message || '');

      if (response.status && found) {
        setSubmittedPhone(values.phone);
        setSuccessMessage(response.message);
        setIsSent(true);
      } else if (response.status && !found) {
        setError(response.message || 'No account found with this phone number. Please check and try again.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } catch {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  }, []);

  return {
    submittedPhone,
    isLoading, isSent, setIsSent, error, successMessage,
    handleSubmit,
    validationSchema: forgotPasswordValidationSchema as any,
    initialValues: forgotPasswordInitialValues,
  };
}
