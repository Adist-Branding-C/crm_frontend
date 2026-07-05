import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useCreateCheckoutNote } from './useCreateCheckoutNote';
import { useUpdateCheckoutNote } from './useUpdateCheckoutNote';
import { useDeleteCheckoutNote } from './useDeleteCheckoutNote';
import { useDrawerScroll } from '../../../task-settings/hooks/useDrawerScroll';
import { parseApiError } from '../utils/parseApiError';
import { applyFieldErrors } from '../utils/applyFieldErrors';
import type { CheckoutNoteItem, CheckoutNoteFormData, SubmitHandlerConfig, FetchHandlers, ToastHandlers } from '../types';

export function useCheckoutNoteSubmitHandlers(
  config: SubmitHandlerConfig,
  fetch: FetchHandlers,
  toast: ToastHandlers,
) {
  const create = useCreateCheckoutNote();
  const update = useUpdateCheckoutNote();
  const removal = useDeleteCheckoutNote();
  const { scrollAndFocusError, scrollToTop } = useDrawerScroll();

  const handleAddSubmit = useCallback(async (
    values: CheckoutNoteFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<CheckoutNoteFormData>,
  ) => {
    fetch.setError('');
    fetch.setIsLoading(true);

    try {
      const { title, note, status } = values;
      const response = await create.create({ title: title.trim(), note: note.trim(), status });

      if (!response) {
        fetch.setError('Network error. Please try again.');
        return false;
      }

      if (response.status) {
        fetch.setPageNumber(1);
        fetch.setSearchQuery('');
        fetch.refresh();
        resetForm();
        toast.showToastMessage('Checkout note added successfully', 'success');
        config.onAddSuccess();
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError();
      } else {
        fetch.setError(response.message || 'Failed to add checkout note');
        scrollToTop();
      }
      return false;
    } catch (err: unknown) {
      const parsed = parseApiError(err);
      if (parsed.errors || (parsed.field && parsed.message)) {
        const errorField = applyFieldErrors(parsed.errors, parsed.message, parsed.field, setFieldError);
        if (errorField) scrollAndFocusError();
        else { fetch.setError(parsed.message || 'Failed to add checkout note'); scrollToTop(); }
      } else {
        fetch.setError(parsed.message || 'Failed to add checkout note');
        scrollToTop();
      }
      return false;
    } finally {
      fetch.setIsLoading(false);
      setSubmitting(false);
    }
  }, [create, fetch, config, toast, scrollAndFocusError, scrollToTop]);

  const handleEditSubmit = useCallback(async (
    values: CheckoutNoteFormData,
    { setSubmitting, setFieldError }: FormikHelpers<CheckoutNoteFormData>,
  ) => {
    if (!config.editingItem) return;

    const item = config.editingItem;
    const original: CheckoutNoteFormData = {
      title: item.title || '',
      note: item.note || '',
      status: item.status || '',
    };
    if (JSON.stringify(values) === JSON.stringify(original)) {
      setSubmitting(false);
      return;
    }

    fetch.setError('');
    fetch.setIsLoading(true);

    try {
      const { title, note, status } = values;
      const response = await update.update(config.editingItem.id, { title: title.trim(), note: note.trim(), status });

      if (!response) {
        fetch.setError('Network error. Please try again.');
        return false;
      }

      if (response.status) {
        fetch.refresh();
        toast.showToastMessage('Checkout note updated successfully', 'success');
        config.onEditSuccess();
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError();
      } else {
        fetch.setError(response.message || 'Failed to update checkout note');
        scrollToTop();
      }
      return false;
    } catch (err: unknown) {
      const parsed = parseApiError(err);
      if (parsed.errors || (parsed.field && parsed.message)) {
        const errorField = applyFieldErrors(parsed.errors, parsed.message, parsed.field, setFieldError);
        if (errorField) scrollAndFocusError();
        else { fetch.setError(parsed.message || 'Failed to update checkout note'); scrollToTop(); }
      } else {
        fetch.setError(parsed.message || 'Failed to update checkout note');
        scrollToTop();
      }
      return false;
    } finally {
      fetch.setIsLoading(false);
      setSubmitting(false);
    }
  }, [update, fetch, config, toast, scrollAndFocusError, scrollToTop]);

  const handleConfirmDelete = useCallback(async () => {
    if (!config.deletingItem) return;

    fetch.setError('');

    try {
      const response = await removal.remove(config.deletingItem.id);

      if (response?.status) {
        fetch.refresh();
        config.onDeleteSuccess();
      } else {
        fetch.setError(response?.message || 'Failed to delete checkout note');
      }
    } catch (err: unknown) {
      const parsed = parseApiError(err);
      fetch.setError(parsed.message || 'Failed to delete checkout note');
    }
  }, [removal, fetch, config]);

  return { handleAddSubmit, handleEditSubmit, handleConfirmDelete };
}
