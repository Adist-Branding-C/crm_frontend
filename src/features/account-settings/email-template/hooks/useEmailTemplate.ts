import { useState, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { emailTemplateService } from '../services/emailTemplate.service';
import { addEmailTemplateValidationSchema, editEmailTemplateValidationSchema } from '../validations/emailTemplate.validation';
import { ADD_EMAIL_TEMPLATE_INITIAL_VALUES } from '../constants/emailTemplate.constants';
import type { EmailTemplateItem, EmailTemplateFormData } from '../types/emailTemplate.types';

const FIELD_MAP: Record<string, string> = {
  template_name: 'templateName',
};

export function useEmailTemplate() {
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = useCallback((message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  }, []);

  const fetchFn = useCallback(async (params: { pageNumber: number; limit: number; search?: string }) => {
    const response = await emailTemplateService.getAllEmailTemplates(params);
    if (response.status) {
      const rawData = response.data && typeof response.data === 'object' && 'items' in response.data
        ? (response.data as { items: EmailTemplateItem[]; pagination?: { total: number } }).items
        : Array.isArray(response.data)
          ? response.data
          : [];
      const items = Array.isArray(rawData) ? rawData : [];
      const total = response.data && typeof response.data === 'object' && 'pagination' in (response.data as object)
        ? ((response.data as { pagination?: { total: number } }).pagination?.total ?? items.length)
        : items.length;
      return { items, total };
    }
    throw new Error(response.message || 'Failed to fetch email templates');
  }, []);

  const pagination = useTableData<EmailTemplateItem>({ fetchFn });

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
      if (lower.includes('name')) { setFieldError('templateName', message); return 'templateName'; }
      if (lower.includes('subject')) { setFieldError('subject', message); return 'subject'; }
      if (lower.includes('content')) { setFieldError('content', message); return 'content'; }
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

  const handleAddEmailTemplate = useCallback(async (
    values: EmailTemplateFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<EmailTemplateFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { templateName, subject, content, status } = values;
      const requestData = { templateName: templateName.trim(), subject: subject.trim(), content: content.trim(), status };
      const response = await emailTemplateService.createEmailTemplate(requestData);

      if (response.status) {
        pagination.setPageNumber(1);
        pagination.setSearchQuery('');
        pagination.refresh();
        resetForm();
        showToastMessage('Email template added successfully', 'success');
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError(errorField);
      } else {
        pagination.setError(response.message || 'Failed to add email template');
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
          else { pagination.setError(serverMessage || 'Failed to add email template'); scrollToTop(); }
        } else {
          pagination.setError(serverMessage || 'Failed to add email template');
          scrollToTop();
        }
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
        scrollToTop();
      } else {
        pagination.setError('Network error. Please try again.');
        scrollToTop();
      }
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, []);

  const handleUpdateEmailTemplate = useCallback(async (
    id: number,
    values: EmailTemplateFormData,
    { setSubmitting, setFieldError }: FormikHelpers<EmailTemplateFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { templateName, subject, content, status } = values;
      const requestData = { templateName: templateName.trim(), subject: subject.trim(), content: content.trim(), status };
      const response = await emailTemplateService.updateEmailTemplate(id, requestData);

      if (response.status) {
        pagination.refresh();
        showToastMessage('Email template updated successfully', 'success');
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError(errorField);
      } else {
        pagination.setError(response.message || 'Failed to update email template');
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
          else { pagination.setError(serverMessage || 'Failed to update email template'); scrollToTop(); }
        } else {
          pagination.setError(serverMessage || 'Failed to update email template');
          scrollToTop();
        }
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
        scrollToTop();
      } else {
        pagination.setError('Network error. Please try again.');
        scrollToTop();
      }
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, []);

  const handleDeleteEmailTemplate = useCallback(async (id: number) => {
    pagination.setError('');

    try {
      const response = await emailTemplateService.deleteEmailTemplate(id);

      if (response.status) {
        pagination.refresh();
        showToastMessage('Email template deleted successfully', 'success');
        return true;
      } else {
        pagination.setError(response.message || 'Failed to delete email template');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to delete email template');
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
      } else {
        pagination.setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return {
    emailTemplateList: pagination.list,
    isLoading: pagination.isLoading,
    error: pagination.error,
    fetchEmailTemplates: pagination.refresh,
    handleAddEmailTemplate,
    handleUpdateEmailTemplate,
    handleDeleteEmailTemplate,
    validationSchema: addEmailTemplateValidationSchema,
    editValidationSchema: editEmailTemplateValidationSchema,
    initialValues: ADD_EMAIL_TEMPLATE_INITIAL_VALUES,
    toastMessage,
    toastType,
    showToast,
    setShowToast,
    pageNumber: pagination.pageNumber,
    setPageNumber: pagination.setPageNumber,
    limit: pagination.limit,
    totalCount: pagination.totalCount,
    searchQuery: pagination.searchQuery,
    handleSearchChange: pagination.handleSearchChange,
    handleRowsPerPageChange: pagination.handleRowsPerPageChange,
  };
}
