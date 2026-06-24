import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useTableData } from '../../../../shared/hooks/useTableData';
import { checkoutNoteService } from '../services/checkoutNote.service';
import { addCheckoutNoteValidationSchema, editCheckoutNoteValidationSchema } from '../validations/checkoutNote.validation';
import { ADD_CHECKOUT_NOTE_INITIAL_VALUES } from '../constants/checkoutNote.constants';
import type { CheckoutNoteItem, CheckoutNoteFormData } from '../types/checkoutNote.types';

export function useCheckoutNote() {
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

  const handleAddCheckoutNote = useCallback(async (
    values: CheckoutNoteFormData,
    { setSubmitting, resetForm }: FormikHelpers<CheckoutNoteFormData>,
  ): Promise<boolean> => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { title, note, status } = values;
      const requestData = { title, note, status };

      const response = await checkoutNoteService.createCheckoutNote(requestData);

      if (response.status) {
        pagination.setPageNumber(1);
        pagination.setSearchQuery('');
        pagination.refresh();
        resetForm();
        return true;
      } else {
        pagination.setError(response.message || 'Failed to add checkout note');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to add checkout note');
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
      } else {
        pagination.setError('Network error. Please try again.');
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
    { setSubmitting }: FormikHelpers<CheckoutNoteFormData>,
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
      const requestData = { title, note, status };

      const response = await checkoutNoteService.updateCheckoutNote(noteId, requestData);

      if (response.status) {
        pagination.refresh();
        return true;
      } else {
        pagination.setError(response.message || 'Failed to update checkout note');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to update checkout note');
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
      } else {
        pagination.setError('Network error. Please try again.');
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
    pageNumber: pagination.pageNumber,
    setPageNumber: pagination.setPageNumber,
    limit: pagination.limit,
    totalCount: pagination.totalCount,
    searchQuery: pagination.searchQuery,
    handleSearchChange: pagination.handleSearchChange,
    handleRowsPerPageChange: pagination.handleRowsPerPageChange,
  };
}
