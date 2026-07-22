import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useSubmitErrorHandler } from '../../../../shared/hooks/useSubmitErrorHandler';
import { callTaskApiService } from '../services/index';
import { TASK_FIELD_MAP, TASK_FIELD_ERROR_FALLBACKS } from '../../shared/constants/fieldErrors';
import type { CallTaskFormData } from '../types/index';
import type { UseCallTaskCrudParams } from '../types/useCallTaskCrud.types';

export function useCallTaskCrud({ pagination, showToastMessage }: UseCallTaskCrudParams) {
  const submitError = useSubmitErrorHandler({
    fieldMap: TASK_FIELD_MAP,
    fieldFallbacks: TASK_FIELD_ERROR_FALLBACKS,
    setError: pagination.setError,
  });

  const handleAddCallTask = useCallback(async (
    values: CallTaskFormData,
    { setSubmitting, setFieldError }: FormikHelpers<CallTaskFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const response = await callTaskApiService.create(values);

      if (response.status) {
        pagination.refresh();
        showToastMessage('Call task added successfully', 'success');
        return true;
      }

      submitError.handleErrorResponse(response, setFieldError, 'Failed to add call task');
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, 'Failed to add call task');
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [submitError, pagination, showToastMessage]);

  const handleUpdateCallTask = useCallback(async (
    id: number,
    values: CallTaskFormData,
    { setSubmitting, setFieldError }: FormikHelpers<CallTaskFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const response = await callTaskApiService.update(id, values);

      if (response.status) {
        pagination.refresh();
        showToastMessage('Call task updated successfully', 'success');
        return true;
      }

      submitError.handleErrorResponse(response, setFieldError, 'Failed to update call task');
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, 'Failed to update call task');
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [submitError, pagination, showToastMessage]);

  const handleDeleteCallTask = useCallback(async (id: number) => {
    try {
      const response = await callTaskApiService.delete(id);

      if (response.status) {
        pagination.refresh();
        showToastMessage('Call task deleted successfully', 'success');
        return true;
      }
      showToastMessage(response.message || 'Failed to delete call task', 'error');
      return false;
    } catch {
      showToastMessage('Failed to delete call task', 'error');
      return false;
    }
  }, [pagination, showToastMessage]);

  return { handleAddCallTask, handleUpdateCallTask, handleDeleteCallTask };
}
