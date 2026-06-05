import { useState, useCallback, useEffect } from 'react';
import type { FormikHelpers } from 'formik';
import { checkoutNoteService } from '../services/checkoutNote.service';
import { addCheckoutNoteValidationSchema } from '../validations/checkoutNote.validation';
import type { CheckoutNoteItem, CheckoutNoteFormData, GetAllCheckoutNotesParams } from '../types/checkoutNote.types';

const addCheckoutNoteInitialValues: CheckoutNoteFormData = {
  title: '',
  note: '',
  status: '',
};

export function useCheckoutNote() {
  const [checkoutNoteList, setCheckoutNoteList] = useState<CheckoutNoteItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCheckoutNotes = useCallback(async (params: GetAllCheckoutNotesParams = {}) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await checkoutNoteService.getAllCheckoutNotes(params);

      if (response.status) {
        setCheckoutNoteList(Array.isArray(response.data?.items) ? response.data.items : []);
      } else {
        setError(response.message || 'Failed to fetch checkout notes');
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to fetch checkout notes');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCheckoutNotes();
  }, [fetchCheckoutNotes]);

  const handleAddCheckoutNote = useCallback(async (
    values: CheckoutNoteFormData,
    { setSubmitting, resetForm }: FormikHelpers<CheckoutNoteFormData>,
  ): Promise<boolean> => {
    setError('');
    setIsLoading(true);

    try {
      const { title, note, status } = values;
      const requestData = { title, note, status };

      const response = await checkoutNoteService.createCheckoutNote(requestData);

      if (response.status) {
        const newItemId = response.data?.id ?? null;
        if (newItemId) {
          setCheckoutNoteList(prev => [...prev, { id: newItemId, title, note, status }]);
        } else {
          fetchCheckoutNotes();
        }
        resetForm();
        return true;
      } else {
        setError(response.message || 'Failed to add checkout note');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to add checkout note');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  }, [fetchCheckoutNotes]);

  const handleUpdateCheckoutNote = useCallback(async (
    id: number,
    values: CheckoutNoteFormData,
    { setSubmitting }: FormikHelpers<CheckoutNoteFormData>,
  ): Promise<boolean> => {
    const noteId = Number(id);
    if (!noteId || isNaN(noteId)) {
      setError('Invalid checkout note id');
      setSubmitting(false);
      return false;
    }
    setError('');
    setIsLoading(true);

    try {
      const { title, note, status } = values;
      const requestData = { title, note, status };

      const response = await checkoutNoteService.updateCheckoutNote(noteId, requestData);

      if (response.status) {
        setCheckoutNoteList(prev => prev.map(item =>
          Number(item.id) === noteId ? { ...item, title, note, status } : item
        ));
        return true;
      } else {
        setError(response.message || 'Failed to update checkout note');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to update checkout note');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  }, []);

  const handleDeleteCheckoutNote = useCallback(async (id: number): Promise<boolean> => {
    const noteId = Number(id);
    if (!noteId || isNaN(noteId)) {
      setError('Invalid checkout note id');
      return false;
    }
    setError('');

    try {
      const response = await checkoutNoteService.deleteCheckoutNote(noteId);

      if (response.status) {
        setCheckoutNoteList(prev => prev.filter(item => Number(item.id) !== noteId));
        return true;
      } else {
        setError(response.message || 'Failed to delete checkout note');
        return false;
      }
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        setError(axiosErr.response?.data?.message || 'Failed to delete checkout note');
      } else if (err && typeof err === 'object' && 'message' in err) {
        setError((err as { message: string }).message);
      } else {
        setError('Network error. Please try again.');
      }
      return false;
    }
  }, []);

  return {
    checkoutNoteList,
    isLoading,
    error,
    fetchCheckoutNotes,
    handleAddCheckoutNote,
    handleUpdateCheckoutNote,
    handleDeleteCheckoutNote,
    validationSchema: addCheckoutNoteValidationSchema,
    initialValues: addCheckoutNoteInitialValues,
  };
}
