import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useSubmitErrorHandler } from '../../../../shared/hooks/useSubmitErrorHandler';
import { taskCategoryApiService } from '../services';
import { TASK_CATEGORY_FIELD_MAP, TASK_CATEGORY_FIELD_ERROR_FALLBACKS } from '../constants/index';
import type { TaskCategoryFormData, UseTaskCategoryCrudParams } from '../types/index';

/**
 * Task-category create/update/delete API orchestration.
 *
 * Notes:
 * - Takes the list/pagination setters it needs to drive and a toast trigger as narrow
 *   dependencies, rather than owning or re-exporting the pagination or toast hooks themselves.
 */
export function useTaskCategoryCrud({ pagination, showToastMessage }: UseTaskCategoryCrudParams) {
  const submitError = useSubmitErrorHandler({
    fieldMap: TASK_CATEGORY_FIELD_MAP,
    fieldFallbacks: TASK_CATEGORY_FIELD_ERROR_FALLBACKS,
    setError: pagination.setError,
  });

  const handleAddTaskCategory = useCallback(async (
    values: TaskCategoryFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<TaskCategoryFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { category, action } = values;
      const response = await taskCategoryApiService.create({ category: category.trim(), action: action.trim() });

      if (response.status) {
        pagination.setPageNumber(1);
        pagination.setSearchQuery('');
        pagination.refresh();
        resetForm();
        showToastMessage('Task category added successfully', 'success');
        return true;
      }

      submitError.handleErrorResponse(response, setFieldError, 'Failed to add task category');
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, 'Failed to add task category');
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [submitError, showToastMessage, pagination]);

  const handleUpdateTaskCategory = useCallback(async (
    id: number,
    values: TaskCategoryFormData,
    { setSubmitting, setFieldError }: FormikHelpers<TaskCategoryFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { category, action } = values;
      const response = await taskCategoryApiService.update(id, { category: category.trim(), action: action.trim() });

      if (response.status) {
        pagination.refresh();
        return true;
      }

      submitError.handleErrorResponse(response, setFieldError, 'Failed to update task category');
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, 'Failed to update task category');
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [submitError, pagination]);

  const handleDeleteTaskCategory = useCallback(async (id: number) => {
    pagination.setError('');

    try {
      const response = await taskCategoryApiService.delete(id);

      if (response.status) {
        pagination.refresh();
        return true;
      }
      pagination.setError(response.message || 'Failed to delete task category');
      return false;
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to delete task category');
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
      } else {
        pagination.setError('Network error. Please try again.');
      }
      return false;
    }
  }, [pagination]);

  return { handleAddTaskCategory, handleUpdateTaskCategory, handleDeleteTaskCategory };
}
