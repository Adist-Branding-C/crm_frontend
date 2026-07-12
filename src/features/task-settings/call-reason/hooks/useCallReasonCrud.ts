import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useSubmitErrorHandler } from '../../../../shared/hooks/useSubmitErrorHandler';
import { callReasonApiService } from '../services';
import { CALL_REASON_FIELD_MAP, CALL_REASON_FIELD_ERROR_FALLBACKS } from '../constants/index';
import type { CallReasonFormData, UseCallReasonCrudParams } from '../types/index';

/**
 * Call-reason create/update/delete API orchestration.
 *
 * Notes:
 * - Takes the list/pagination setters it needs to drive and a toast trigger as narrow
 *   dependencies, rather than owning or re-exporting the pagination or toast hooks themselves.
 */
export function useCallReasonCrud({ pagination, showToastMessage }: UseCallReasonCrudParams) {
  const submitError = useSubmitErrorHandler({
    fieldMap: CALL_REASON_FIELD_MAP,
    fieldFallbacks: CALL_REASON_FIELD_ERROR_FALLBACKS,
    setError: pagination.setError,
  });

  const handleAddCallReason = useCallback(async (
    values: CallReasonFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<CallReasonFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { name, status } = values;
      const response = await callReasonApiService.create({ name: name.trim(), status });

      if (response.status) {
        pagination.setPageNumber(1);
        pagination.setSearchQuery('');
        pagination.refresh();
        resetForm();
        showToastMessage('Call reason added successfully', 'success');
        return true;
      }

      submitError.handleErrorResponse(response, setFieldError, 'Failed to add call reason');
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, 'Failed to add call reason');
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [submitError, showToastMessage, pagination]);

  const handleUpdateCallReason = useCallback(async (
    id: number,
    values: CallReasonFormData,
    { setSubmitting, setFieldError }: FormikHelpers<CallReasonFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { name, status } = values;
      const response = await callReasonApiService.update(id, { name: name.trim(), status });

      if (response.status) {
        pagination.refresh();
        showToastMessage('Call reason updated successfully', 'success');
        return true;
      }

      submitError.handleErrorResponse(response, setFieldError, 'Failed to update call reason');
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, 'Failed to update call reason');
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [submitError, showToastMessage, pagination]);

  const handleDeleteCallReason = useCallback(async (id: number) => {
    pagination.setError('');

    try {
      const response = await callReasonApiService.delete(id);

      if (response.status) {
        pagination.refresh();
        return true;
      }
      pagination.setError(response.message || 'Failed to delete call reason');
      return false;
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to delete call reason');
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
      } else {
        pagination.setError('Network error. Please try again.');
      }
      return false;
    }
  }, [pagination]);

  return { handleAddCallReason, handleUpdateCallReason, handleDeleteCallReason };
}
