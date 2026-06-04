import { useState, useCallback, useEffect } from 'react';
import { checkoutNoteService } from '../services/checkoutNote.service';
import { addCheckoutNoteValidationSchema } from '../validations/checkoutNote.validation';
import type { CheckoutNoteItem } from '../types/checkoutNote.types';

const addCheckoutNoteInitialValues = { note: '' };

export function useCheckoutNote() {
  const [checkoutNoteList, setCheckoutNoteList] = useState<CheckoutNoteItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCheckoutNotes = useCallback(async (params: Record<string, unknown> = {}) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await checkoutNoteService.getAllCheckoutNotes(params);

      if (response.status) {
        const rawData = response.data && typeof response.data === 'object' && 'items' in (response.data as Record<string, unknown>)
          ? (response.data as { items: CheckoutNoteItem[] }).items
          : Array.isArray(response.data)
            ? response.data
            : [];
        setCheckoutNoteList(Array.isArray(rawData) ? rawData : []);
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
    values: { note: string },
    { setSubmitting, resetForm }: { setSubmitting: (v: boolean) => void; resetForm: () => void },
  ) => {
    setError('');
    setIsLoading(true);

    try {
      const { note } = values;
      const requestData = { note };

      const response = await checkoutNoteService.createCheckoutNote(requestData);

      if (response.status) {
        const newItemId = response.data && typeof response.data === 'object' && 'id' in response.data
          ? (response.data as CheckoutNoteItem).id
          : null;
        if (newItemId) {
          setCheckoutNoteList(prev => [...prev, { id: newItemId, note }]);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdateCheckoutNote = useCallback(async (
    id: number,
    values: { note: string },
    { setSubmitting }: { setSubmitting: (v: boolean) => void },
  ) => {
    const noteId = Number(id);
    if (!noteId || isNaN(noteId)) {
      setError('Invalid checkout note id');
      setSubmitting(false);
      return false;
    }
    setError('');
    setIsLoading(true);

    try {
      const { note } = values;
      const requestData = { note };

      const response = await checkoutNoteService.updateCheckoutNote(noteId, requestData);

      if (response.status) {
        setCheckoutNoteList(prev => prev.map(item =>
          Number(item.id) === noteId ? { ...item, note } : item
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

  const handleDeleteCheckoutNote = useCallback(async (id: number) => {
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
