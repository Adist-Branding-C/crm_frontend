import { useState, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { whatsappTemplateApiService } from '../services';
import { addWhatsappTemplateValidationSchema, editWhatsappTemplateValidationSchema } from '../validations';
import { ADD_WHATSAPP_TEMPLATE_INITIAL_VALUES, WHATSAPP_TEMPLATE_FIELD_MAP } from '../constants';
import type { WhatsappTemplateItem, WhatsappTemplateFormData } from '../types';

export function useWhatsappTemplate() {
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = useCallback((message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  }, []);

  const pagination = useTableData<WhatsappTemplateItem>({
    fetchFn: async (params) => {
      const response = await whatsappTemplateApiService.fetchAll(params as unknown as Record<string, string | number | undefined>);
      if (response.status) {
        const rawData = response.data && typeof response.data === 'object' && 'items' in response.data
          ? (response.data as { items: WhatsappTemplateItem[]; pagination?: { total: number } }).items
          : Array.isArray(response.data)
            ? response.data
            : [];
        const items = Array.isArray(rawData) ? rawData : [];
        const total = response.data && typeof response.data === 'object' && 'pagination' in (response.data as object)
          ? ((response.data as { pagination?: { total: number } }).pagination?.total ?? items.length)
          : items.length;
        return { items, total };
      }
      throw new Error(response.message || 'Failed to fetch WhatsApp templates');
    },
  });

  const applyFieldErrors = useCallback((
    errors: Record<string, string[]> | undefined,
    message: string | undefined,
    field: string | undefined,
    setFieldError: (field: string, msg: string) => void,
  ): string | null => {
    if (field && message) {
      const mapped = WHATSAPP_TEMPLATE_FIELD_MAP[field] || field;
      setFieldError(mapped, message);
      return mapped;
    }
    if (errors && typeof errors === 'object') {
      let firstField: string | null = null;
      Object.entries(errors).forEach(([f, msgs]) => {
        const mapped = WHATSAPP_TEMPLATE_FIELD_MAP[f] || f;
        if (msgs?.length && !firstField) firstField = mapped;
        if (msgs?.length) setFieldError(mapped, msgs[0]!);
      });
      return firstField;
    }
    if (message) {
      const lower = message.toLowerCase();
      if (lower.includes('name')) { setFieldError('templateName', message); return 'templateName'; }
      if (lower.includes('message')) { setFieldError('message', message); return 'message'; }
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

  const handleAddWhatsappTemplate = useCallback(async (
    values: WhatsappTemplateFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<WhatsappTemplateFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { templateName, message, status } = values;
      const requestData: WhatsappTemplateFormData = { templateName: templateName.trim(), message: message.trim(), status };
      const response = await whatsappTemplateApiService.create(requestData);
      const resp = response as typeof response & { errors?: Record<string, string[]>; field?: string };

      if (response.status) {
        pagination.setPageNumber(1);
        pagination.setSearchQuery('');
        pagination.refresh();
        resetForm();
        showToastMessage('WhatsApp template added successfully', 'success');
        return true;
      }

      const errorField = applyFieldErrors(resp.errors, response.message, resp.field, setFieldError);
      if (errorField) {
        scrollAndFocusError(errorField);
      } else {
        pagination.setError(response.message || 'Failed to add WhatsApp template');
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
          else { pagination.setError(serverMessage || 'Failed to add WhatsApp template'); scrollToTop(); }
        } else {
          pagination.setError(serverMessage || 'Failed to add WhatsApp template');
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

  const handleUpdateWhatsappTemplate = useCallback(async (
    id: number,
    values: WhatsappTemplateFormData,
    { setSubmitting, setFieldError }: FormikHelpers<WhatsappTemplateFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { templateName, message, status } = values;
      const requestData: WhatsappTemplateFormData = { templateName: templateName.trim(), message: message.trim(), status };
      const response = await whatsappTemplateApiService.update(id, requestData);
      const resp = response as typeof response & { errors?: Record<string, string[]>; field?: string };

      if (response.status) {
        pagination.refresh();
        showToastMessage('WhatsApp template updated successfully', 'success');
        return true;
      }

      const errorField = applyFieldErrors(resp.errors, response.message, resp.field, setFieldError);
      if (errorField) {
        scrollAndFocusError(errorField);
      } else {
        pagination.setError(response.message || 'Failed to update WhatsApp template');
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
          else { pagination.setError(serverMessage || 'Failed to update WhatsApp template'); scrollToTop(); }
        } else {
          pagination.setError(serverMessage || 'Failed to update WhatsApp template');
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

  const handleDeleteWhatsappTemplate = useCallback(async (id: number) => {
    pagination.setError('');

    try {
      const response = await whatsappTemplateApiService.delete(id);

      if (response.status) {
        pagination.refresh();
        showToastMessage('WhatsApp template deleted successfully', 'success');
        return true;
      } else {
        pagination.setError(response.message || 'Failed to delete WhatsApp template');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to delete WhatsApp template');
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
      } else {
        pagination.setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return {
    whatsappTemplateList: pagination.list,
    isLoading: pagination.isLoading,
    error: pagination.error,
    fetchWhatsappTemplates: pagination.refresh,
    handleAddWhatsappTemplate,
    handleUpdateWhatsappTemplate,
    handleDeleteWhatsappTemplate,
    validationSchema: addWhatsappTemplateValidationSchema,
    editValidationSchema: editWhatsappTemplateValidationSchema,
    initialValues: ADD_WHATSAPP_TEMPLATE_INITIAL_VALUES,
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
