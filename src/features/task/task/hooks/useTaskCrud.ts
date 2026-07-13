import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useSubmitErrorHandler } from '../../../../shared/hooks/useSubmitErrorHandler';
import { taskApiService } from '../services/index';
import { TASK_FIELD_MAP, TASK_FIELD_ERROR_FALLBACKS } from '../../shared/constants/fieldErrors';
import type { TaskFormData } from '../types';
import type { UseTaskCrudParams } from '../types';

export function useTaskCrud({ pagination, showToastMessage }: UseTaskCrudParams) {
  const submitError = useSubmitErrorHandler({
    fieldMap: TASK_FIELD_MAP,
    fieldFallbacks: TASK_FIELD_ERROR_FALLBACKS,
    setError: pagination.setError,
  });

  const handleAddTask = useCallback(async (
    values: TaskFormData,
    { setSubmitting, setFieldError }: FormikHelpers<TaskFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);
    try {
      const response = await taskApiService.create(values);
      if (response.status) {
        pagination.refresh();
        showToastMessage('Task added successfully', 'success');
        return true;
      }
      submitError.handleErrorResponse(response, setFieldError, 'Failed to add task');
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, 'Failed to add task');
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [submitError, pagination, showToastMessage]);

  const handleUpdateTask = useCallback(async (
    id: number,
    values: TaskFormData,
    { setSubmitting, setFieldError }: FormikHelpers<TaskFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);
    try {
      const response = await taskApiService.update(id, values);
      if (response.status) {
        pagination.refresh();
        showToastMessage('Task updated successfully', 'success');
        return true;
      }
      submitError.handleErrorResponse(response, setFieldError, 'Failed to update task');
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, 'Failed to update task');
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [submitError, pagination, showToastMessage]);

  const handleDeleteTask = useCallback(async (id: number) => {
    try {
      const response = await taskApiService.delete(id);
      if (response.status) {
        pagination.refresh();
        showToastMessage('Task deleted successfully', 'success');
        return true;
      }
      showToastMessage(response.message || 'Failed to delete task', 'error');
      return false;
    } catch {
      showToastMessage('Failed to delete task', 'error');
      return false;
    }
  }, [pagination, showToastMessage]);

  return { handleAddTask, handleUpdateTask, handleDeleteTask };
}
