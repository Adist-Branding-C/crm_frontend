import { useState, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { addMailConfigurationValidationSchema, editMailConfigurationValidationSchema } from '../validations/mailConfiguration.validation';
import { ADD_MAIL_CONFIG_INITIAL_VALUES } from '../constants/mailConfiguration.constants';
import { mailConfigurationService } from '../services/mailConfiguration.service';
import type { MailConfigFormData } from '../types/mailConfiguration.types';

const FIELD_MAP: Record<string, string> = {
  host: 'host',
  port: 'port',
  username: 'username',
  from_email: 'fromEmail',
};

export function useMailConfiguration() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = useCallback((message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  }, []);

  const applyFieldErrors = useCallback((
    errors: Record<string, string[]> | undefined,
    message: string | undefined,
    field: string | undefined,
    setFieldError: (field: string, msg: string) => void,
  ): string | null => {
    if (field && message) {
      const mapped = FIELD_MAP[field] || field;
      setFieldError(mapped, message);
      return mapped;
    }
    if (errors && typeof errors === 'object') {
      let firstField: string | null = null;
      Object.entries(errors).forEach(([f, msgs]) => {
        const mapped = FIELD_MAP[f] || f;
        if (msgs?.length && !firstField) firstField = mapped;
        if (msgs?.length) setFieldError(mapped, msgs[0]);
      });
      return firstField;
    }
    if (message) {
      const lower = message.toLowerCase();
      if (lower.includes('host')) { setFieldError('host', message); return 'host'; }
      if (lower.includes('port')) { setFieldError('port', message); return 'port'; }
      if (lower.includes('username') || lower.includes('email')) { setFieldError('username', message); return 'username'; }
      if (lower.includes('password')) { setFieldError('password', message); return 'password'; }
    }
    return null;
  }, []);

  const scrollAndFocusError = useCallback((fieldName: string) => {
    setTimeout(() => {
      const drawerBody = document.querySelector('.drawer-body');
      if (!drawerBody) return;
      const errorEl = drawerBody.querySelector('.input-error');
      if (errorEl) {
        errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        (errorEl as HTMLElement).focus();
      }
    }, 0);
  }, []);

  const scrollToTop = useCallback(() => {
    setTimeout(() => {
      const drawerBody = document.querySelector('.drawer-body');
      if (drawerBody) {
        drawerBody.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 0);
  }, []);

  const handleAddMailConfig = useCallback(async (
    values: MailConfigFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<MailConfigFormData>,
  ): Promise<boolean> => {
    setError('');
    setIsLoading(true);

    try {
      const response = await mailConfigurationService.createMailConfig(values);

      if (response.status) {
        resetForm();
        showToastMessage('Mail configuration added successfully', 'success');
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError(errorField);
      } else {
        setError(response.message || 'Failed to add mail configuration');
        scrollToTop();
      }
      return false;
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { errors?: Record<string, string[]>; message?: string; field?: string } } };
        const serverErrors = axiosErr.response?.data?.errors;
        const serverField = axiosErr.response?.data?.field;
        const serverMessage = axiosErr.response?.data?.message;
        if (serverErrors || (serverField && serverMessage)) {
          const errorField = applyFieldErrors(serverErrors, serverMessage, serverField, setFieldError);
          if (errorField) scrollAndFocusError(errorField);
          else { setError(serverMessage || 'Failed to add mail configuration'); scrollToTop(); }
        } else {
          setError(serverMessage || 'Failed to add mail configuration');
          scrollToTop();
        }
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
        scrollToTop();
      } else {
        setError('Network error. Please try again.');
        scrollToTop();
      }
      return false;
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  }, []);

  const handleUpdateMailConfig = useCallback(async (
    id: number,
    values: MailConfigFormData,
    { setSubmitting, setFieldError }: FormikHelpers<MailConfigFormData>,
  ): Promise<boolean> => {
    setError('');
    setIsLoading(true);

    try {
      const response = await mailConfigurationService.updateMailConfig(id, values);

      if (response.status) {
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError(errorField);
      } else {
        setError(response.message || 'Failed to update mail configuration');
        scrollToTop();
      }
      return false;
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { errors?: Record<string, string[]>; message?: string; field?: string } } };
        const serverErrors = axiosErr.response?.data?.errors;
        const serverField = axiosErr.response?.data?.field;
        const serverMessage = axiosErr.response?.data?.message;
        if (serverErrors || (serverField && serverMessage)) {
          const errorField = applyFieldErrors(serverErrors, serverMessage, serverField, setFieldError);
          if (errorField) scrollAndFocusError(errorField);
          else { setError(serverMessage || 'Failed to update mail configuration'); scrollToTop(); }
        } else {
          setError(serverMessage || 'Failed to update mail configuration');
          scrollToTop();
        }
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
        scrollToTop();
      } else {
        setError('Network error. Please try again.');
        scrollToTop();
      }
      return false;
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  }, []);

  const handleDeleteMailConfig = useCallback(async (id: number): Promise<boolean> => {
    setError('');

    try {
      const response = await mailConfigurationService.deleteMailConfig(id);

      if (response.status) {
        return true;
      } else {
        setError(response.message || 'Failed to delete mail configuration');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to delete mail configuration');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return {
    isLoading,
    error,
    handleAddMailConfig,
    handleUpdateMailConfig,
    handleDeleteMailConfig,
    validationSchema: addMailConfigurationValidationSchema,
    editValidationSchema: editMailConfigurationValidationSchema,
    initialValues: ADD_MAIL_CONFIG_INITIAL_VALUES,
    toastMessage,
    toastType,
    showToast,
    setShowToast,
  };
}
