import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useSubmitErrorHandler } from '../../../../shared/hooks/useSubmitErrorHandler';
import { dealTaskApiService } from '../services/index';
import { TASK_FIELD_MAP, TASK_FIELD_ERROR_FALLBACKS } from '../../shared/constants/fieldErrors';
import type { DealTaskFormData } from '../types/index';
import type { UseDealTaskCrudParams } from '../types/useDealTaskCrud.types';

export function useDealTaskCrud({ pagination, showToastMessage }: UseDealTaskCrudParams) {
  const submitError = useSubmitErrorHandler({
    fieldMap: TASK_FIELD_MAP,
    fieldFallbacks: TASK_FIELD_ERROR_FALLBACKS,
    setError: pagination.setError,
  });

  const handleAddDealTask = useCallback(async (
    values: DealTaskFormData,
    { setSubmitting, setFieldError }: FormikHelpers<DealTaskFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const response = await dealTaskApiService.create(values);

      if (response.status) {
        pagination.refresh();
        showToastMessage('Deal task added successfully', 'success');
        return true;
      }

      submitError.handleErrorResponse(response, setFieldError, 'Failed to add deal task');
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, 'Failed to add deal task');
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [submitError, pagination, showToastMessage]);

  const handleUpdateDealTask = useCallback(async (
    id: number,
    values: DealTaskFormData,
    { setSubmitting, setFieldError }: FormikHelpers<DealTaskFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const response = await dealTaskApiService.update(id, values);

      if (response.status) {
        pagination.refresh();
        showToastMessage('Deal task updated successfully', 'success');
        return true;
      }

      submitError.handleErrorResponse(response, setFieldError, 'Failed to update deal task');
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, 'Failed to update deal task');
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [submitError, pagination, showToastMessage]);

  const handleDeleteDealTask = useCallback(async (id: number) => {
    try {
      const response = await dealTaskApiService.delete(id);

      if (response.status) {
        pagination.refresh();
        showToastMessage('Deal task deleted successfully', 'success');
        return true;
      }
      showToastMessage(response.message || 'Failed to delete deal task', 'error');
      return false;
    } catch {
      showToastMessage('Failed to delete deal task', 'error');
      return false;
    }
  }, [pagination, showToastMessage]);

  return { handleAddDealTask, handleUpdateDealTask, handleDeleteDealTask };
}
