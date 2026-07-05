import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useCreateDesignation } from './useCreateDesignation';
import { useUpdateDesignation } from './useUpdateDesignation';
import { useDeleteDesignation } from './useDeleteDesignation';
import { useDrawerScroll } from '../../../task-settings/hooks/useDrawerScroll';
import { parseApiError } from '../utils/parseApiError';
import { applyFieldErrors } from '../utils/applyFieldErrors';
import type { DesignationItem, DesignationFormData, SubmitHandlerConfig, FetchHandlers, ToastHandlers } from '../types';

export function useDesignationSubmitHandlers(
  config: SubmitHandlerConfig,
  fetch: FetchHandlers,
  toast: ToastHandlers,
) {

  const create = useCreateDesignation();
  const update = useUpdateDesignation();
  const removal = useDeleteDesignation();
  const { scrollAndFocusError, scrollToTop } = useDrawerScroll();

  const handleAddSubmit = useCallback(async (
    values: DesignationFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<DesignationFormData>,
  ) => {
    fetch.setError('');
    fetch.setIsLoading(true);

    try {
      const { designationName, description, status } = values;
      const response = await create.create({ designationName: designationName.trim(), description: description.trim(), status });

      if (!response) {
        fetch.setError('Network error. Please try again.');
        return false;
      }

      if (response.status) {
        fetch.setPageNumber(1);
        fetch.setSearchQuery('');
        fetch.refresh();
        resetForm();
        toast.showToastMessage('Designation added successfully', 'success');
        config.onAddSuccess();
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError();
      } else {
        fetch.setError(response.message || 'Failed to add designation');
        scrollToTop();
      }
      return false;
    } catch (err: unknown) {
      const parsed = parseApiError(err);
      if (parsed.errors || (parsed.field && parsed.message)) {
        const errorField = applyFieldErrors(parsed.errors, parsed.message, parsed.field, setFieldError);
        if (errorField) scrollAndFocusError();
        else { fetch.setError(parsed.message || 'Failed to add designation'); scrollToTop(); }
      } else {
        fetch.setError(parsed.message || 'Failed to add designation');
        scrollToTop();
      }
      return false;
    } finally {
      fetch.setIsLoading(false);
      setSubmitting(false);
    }
  }, [create, fetch, config, toast, scrollAndFocusError, scrollToTop]);

  const handleEditSubmit = useCallback(async (
    values: DesignationFormData,
    { setSubmitting, setFieldError }: FormikHelpers<DesignationFormData>,
  ) => {
    if (!config.editingItem) return;

    const item = config.editingItem;
    const original: DesignationFormData = {
      designationName: item.designationName || item.name || '',
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
      const { designationName, description, status } = values;
      const response = await update.update(config.editingItem.id, { designationName: designationName.trim(), description: description.trim(), status });

      if (!response) {
        fetch.setError('Network error. Please try again.');
        return false;
      }

      if (response.status) {
        fetch.refresh();
        toast.showToastMessage('Designation updated successfully', 'success');
        config.onEditSuccess();
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError();
      } else {
        fetch.setError(response.message || 'Failed to update designation');
        scrollToTop();
      }
      return false;
    } catch (err: unknown) {
      const parsed = parseApiError(err);
      if (parsed.errors || (parsed.field && parsed.message)) {
        const errorField = applyFieldErrors(parsed.errors, parsed.message, parsed.field, setFieldError);
        if (errorField) scrollAndFocusError();
        else { fetch.setError(parsed.message || 'Failed to update designation'); scrollToTop(); }
      } else {
        fetch.setError(parsed.message || 'Failed to update designation');
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
        toast.showToastMessage(response?.message || 'Failed to delete designation', 'error');
      }
    } catch (err: unknown) {
      const parsed = parseApiError(err);
      if (parsed.statusCode === 409) {
        config.onDependencyError?.();
        config.onDeleteSuccess();
      } else {
        toast.showToastMessage(parsed.message || 'Failed to delete designation', 'error');
      }
    }
  }, [removal, fetch, config, toast]);

  return { handleAddSubmit, handleEditSubmit, handleConfirmDelete };
}
