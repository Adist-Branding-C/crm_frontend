import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useCreateWorkMode } from './useCreateWorkMode';
import { useUpdateWorkMode } from './useUpdateWorkMode';
import { useDeleteWorkMode } from './useDeleteWorkMode';
import { useDrawerScroll } from '../../../task-settings/hooks/useDrawerScroll';
import { parseApiError } from '../utils/parseApiError';
import { applyFieldErrors } from '../utils/applyFieldErrors';
import type { WorkModeItem, WorkModeFormData, SubmitHandlerConfig, FetchHandlers, ToastHandlers } from '../types';

export function useWorkModeSubmitHandlers(
  config: SubmitHandlerConfig,
  fetch: FetchHandlers,
  toast: ToastHandlers,
) {
  const create = useCreateWorkMode();
  const update = useUpdateWorkMode();
  const removal = useDeleteWorkMode();
  const { scrollAndFocusError, scrollToTop } = useDrawerScroll();

  const handleAddSubmit = useCallback(async (
    values: WorkModeFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<WorkModeFormData>,
  ) => {
    fetch.setError('');
    fetch.setIsLoading(true);

    try {
      const { workModeName, description, status } = values;
      const response = await create.create({ workModeName: workModeName.trim(), description: description.trim(), status });

      if (!response) {
        fetch.setError('Network error. Please try again.');
        return false;
      }

      if (response.status) {
        fetch.setPageNumber(1);
        fetch.setSearchQuery('');
        fetch.refresh();
        resetForm();
        toast.showToastMessage('Work mode added successfully', 'success');
        config.onAddSuccess();
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError();
      } else {
        fetch.setError(response.message || 'Failed to add work mode');
        scrollToTop();
      }
      return false;
    } catch (err: unknown) {
      const parsed = parseApiError(err);
      if (parsed.errors || (parsed.field && parsed.message)) {
        const errorField = applyFieldErrors(parsed.errors, parsed.message, parsed.field, setFieldError);
        if (errorField) scrollAndFocusError();
        else { fetch.setError(parsed.message || 'Failed to add work mode'); scrollToTop(); }
      } else {
        fetch.setError(parsed.message || 'Failed to add work mode');
        scrollToTop();
      }
      return false;
    } finally {
      fetch.setIsLoading(false);
      setSubmitting(false);
    }
  }, [create, fetch, config, toast, scrollAndFocusError, scrollToTop]);

  const handleEditSubmit = useCallback(async (
    values: WorkModeFormData,
    { setSubmitting, setFieldError }: FormikHelpers<WorkModeFormData>,
  ) => {
    if (!config.editingItem) return;

    const item = config.editingItem;
    const original: WorkModeFormData = {
      workModeName: item.workModeName || item.name || '',
      description: item.description || '',
      status: item.status || '',
    };
    if (JSON.stringify(values) === JSON.stringify(original)) {
      setSubmitting(false);
      return;
    }

    fetch.setError('');
    fetch.setIsLoading(true);

    try {
      const { workModeName, description, status } = values;
      const response = await update.update(config.editingItem.id, { workModeName: workModeName.trim(), description: description.trim(), status });

      if (!response) {
        fetch.setError('Network error. Please try again.');
        return false;
      }

      if (response.status) {
        fetch.refresh();
        toast.showToastMessage('Work mode updated successfully', 'success');
        config.onEditSuccess();
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError();
      } else {
        fetch.setError(response.message || 'Failed to update work mode');
        scrollToTop();
      }
      return false;
    } catch (err: unknown) {
      const parsed = parseApiError(err);
      if (parsed.errors || (parsed.field && parsed.message)) {
        const errorField = applyFieldErrors(parsed.errors, parsed.message, parsed.field, setFieldError);
        if (errorField) scrollAndFocusError();
        else { fetch.setError(parsed.message || 'Failed to update work mode'); scrollToTop(); }
      } else {
        fetch.setError(parsed.message || 'Failed to update work mode');
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
        fetch.setError(response?.message || 'Failed to delete work mode');
      }
    } catch (err: unknown) {
      const parsed = parseApiError(err);
      fetch.setError(parsed.message || 'Failed to delete work mode');
    }
  }, [removal, fetch, config]);

  return { handleAddSubmit, handleEditSubmit, handleConfirmDelete };
}
