import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useCreateDepartment } from './useCreateDepartment';
import { useUpdateDepartment } from './useUpdateDepartment';
import { useDeleteDepartment } from './useDeleteDepartment';
import { useDrawerScroll } from '../../../task-settings/hooks/useDrawerScroll';
import { parseApiError } from '../utils/parseApiError';
import { applyFieldErrors } from '../utils/applyFieldErrors';
import type { DepartmentItem, DepartmentFormData, SubmitHandlerConfig, FetchHandlers, ToastHandlers } from '../types';

export function useDepartmentSubmitHandlers(
  config: SubmitHandlerConfig,
  fetch: FetchHandlers,
  toast: ToastHandlers,
) {
  const create = useCreateDepartment();
  const update = useUpdateDepartment();
  const removal = useDeleteDepartment();
  const { scrollAndFocusError, scrollToTop } = useDrawerScroll();

  const handleAddSubmit = useCallback(async (
    values: DepartmentFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<DepartmentFormData>,
  ) => {
    fetch.setError('');
    fetch.setIsLoading(true);

    try {
      const { departmentName, description, status } = values;
      const response = await create.create({ departmentName: departmentName.trim(), description: description.trim(), status });

      if (!response) {
        fetch.setError('Network error. Please try again.');
        return false;
      }

      if (response.status) {
        fetch.setPageNumber(1);
        fetch.setSearchQuery('');
        fetch.refresh();
        resetForm();
        toast.showToastMessage('Department added successfully', 'success');
        config.onAddSuccess();
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError();
      } else {
        fetch.setError(response.message || 'Failed to add department');
        scrollToTop();
      }
      return false;
    } catch (err: unknown) {
      const parsed = parseApiError(err);
      if (parsed.errors || (parsed.field && parsed.message)) {
        const errorField = applyFieldErrors(parsed.errors, parsed.message, parsed.field, setFieldError);
        if (errorField) scrollAndFocusError();
        else { fetch.setError(parsed.message || 'Failed to add department'); scrollToTop(); }
      } else {
        fetch.setError(parsed.message || 'Failed to add department');
        scrollToTop();
      }
      return false;
    } finally {
      fetch.setIsLoading(false);
      setSubmitting(false);
    }
  }, [create, fetch, config, toast, scrollAndFocusError, scrollToTop]);

  const handleEditSubmit = useCallback(async (
    values: DepartmentFormData,
    { setSubmitting, setFieldError }: FormikHelpers<DepartmentFormData>,
  ) => {
    if (!config.editingItem) return;

    const item = config.editingItem;
    const original: DepartmentFormData = {
      departmentName: item.departmentName || item.name || '',
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
      const { departmentName, description, status } = values;
      const response = await update.update(config.editingItem.id, { departmentName: departmentName.trim(), description: description.trim(), status });

      if (!response) {
        fetch.setError('Network error. Please try again.');
        return false;
      }

      if (response.status) {
        fetch.refresh();
        toast.showToastMessage('Department updated successfully', 'success');
        config.onEditSuccess();
        return true;
      }

      const errorField = applyFieldErrors(response.errors, response.message, response.field, setFieldError);
      if (errorField) {
        scrollAndFocusError();
      } else {
        fetch.setError(response.message || 'Failed to update department');
        scrollToTop();
      }
      return false;
    } catch (err: unknown) {
      const parsed = parseApiError(err);
      if (parsed.errors || (parsed.field && parsed.message)) {
        const errorField = applyFieldErrors(parsed.errors, parsed.message, parsed.field, setFieldError);
        if (errorField) scrollAndFocusError();
        else { fetch.setError(parsed.message || 'Failed to update department'); scrollToTop(); }
      } else {
        fetch.setError(parsed.message || 'Failed to update department');
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
        toast.showToastMessage(response?.message || 'Failed to delete department', 'error');
      }
    } catch (err: unknown) {
      const parsed = parseApiError(err);
      if (parsed.statusCode === 409) {
        config.onDependencyError?.();
        return;
      }
      toast.showToastMessage(parsed.message || 'Failed to delete department', 'error');
    }
  }, [removal, fetch, config, toast]);

  return { handleAddSubmit, handleEditSubmit, handleConfirmDelete };
}
