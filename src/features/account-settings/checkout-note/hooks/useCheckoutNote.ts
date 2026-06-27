import { useState, useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { checkoutNoteService } from '../services/checkoutNote.service';
import { addCheckoutNoteValidationSchema, editCheckoutNoteValidationSchema } from '../validations/checkoutNote.validation';
import { ADD_CHECKOUT_NOTE_INITIAL_VALUES } from '../constants/checkoutNote.constants';
import type { CheckoutNoteItem, CheckoutNoteFormData } from '../types/checkoutNote.types';

const FIELD_MAP: Record<string, string> = {
  note: 'note',
  title: 'title',
};

export function useCheckoutNote() {
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = useCallback((message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  }, []);

  const pagination = useTableData<CheckoutNoteItem>({
    fetchFn: async (params) => {
      const response = await checkoutNoteService.getAllCheckoutNotes(params);
      if (response.status) {
        const items = Array.isArray(response.data?.items) ? response.data.items : [];
        return { items, total: response.data?.pagination?.total ?? items.length };
      }
      throw new Error(response.message || 'Failed to fetch checkout notes');
    },
  });

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
      if (lower.includes('title')) { setFieldError('title', message); return 'title'; }
      if (lower.includes('note')) { setFieldError('note', message); return 'note'; }
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

  const handleAddCheckoutNote = useCallback(async (
    values: CheckoutNoteFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<CheckoutNoteFormData>,
  ): Promise<boolean> => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { title, note, status } = values;
      const requestData = { title: title.trim(), note: note.trim(), status };

      const response = await checkoutNoteService.createCheckoutNote(requestData);

      if (response.status) {
        pagination.setPageNumber(1);
        pagination.setSearchQuery('');
        pagination.refresh();
        resetForm();
        showToastMessage('Checkout note added successfully', 'success');
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError(errorField);
      } else {
        pagination.setError(response.message || 'Failed to add checkout note');
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
          else { pagination.setError(serverMessage || 'Failed to add checkout note'); scrollToTop(); }
        } else {
          pagination.setError(serverMessage || 'Failed to add checkout note');
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

  const handleUpdateCheckoutNote = useCallback(async (
    id: number,
    values: CheckoutNoteFormData,
    { setSubmitting, setFieldError }: FormikHelpers<CheckoutNoteFormData>,
  ): Promise<boolean> => {
    const noteId = Number(id);
    if (!noteId || isNaN(noteId)) {
      pagination.setError('Invalid checkout note id');
      setSubmitting(false);
      return false;
    }
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { title, note, status } = values;
      const requestData = { title: title.trim(), note: note.trim(), status };

      const response = await checkoutNoteService.updateCheckoutNote(noteId, requestData);

      if (response.status) {
        pagination.refresh();
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError(errorField);
      } else {
        pagination.setError(response.message || 'Failed to update checkout note');
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
          else { pagination.setError(serverMessage || 'Failed to update checkout note'); scrollToTop(); }
        } else {
          pagination.setError(serverMessage || 'Failed to update checkout note');
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

  const handleDeleteCheckoutNote = useCallback(async (id: number): Promise<boolean> => {
    const noteId = Number(id);
    if (!noteId || isNaN(noteId)) {
      pagination.setError('Invalid checkout note id');
      return false;
    }
    pagination.setError('');

    try {
      const response = await checkoutNoteService.deleteCheckoutNote(noteId);

      if (response.status) {
        pagination.refresh();
        return true;
      } else {
        pagination.setError(response.message || 'Failed to delete checkout note');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to delete checkout note');
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
      } else {
        pagination.setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return {
    checkoutNoteList: pagination.list,
    isLoading: pagination.isLoading,
    error: pagination.error,
    fetchCheckoutNotes: pagination.refresh,
    handleAddCheckoutNote,
    handleUpdateCheckoutNote,
    handleDeleteCheckoutNote,
    validationSchema: addCheckoutNoteValidationSchema,
    editValidationSchema: editCheckoutNoteValidationSchema,
    initialValues: ADD_CHECKOUT_NOTE_INITIAL_VALUES,
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
