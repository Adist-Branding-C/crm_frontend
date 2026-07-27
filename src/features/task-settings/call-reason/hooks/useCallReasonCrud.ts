import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useSubmitErrorHandler } from '../../../../shared/hooks/useSubmitErrorHandler';
import { callReasonApiService } from '../services';
import { CALL_REASON_FIELD_MAP, CALL_REASON_FIELD_ERROR_FALLBACKS } from '../constants/index';
import type { CallReasonFormData, UseCallReasonCrudParams } from '../types/index';

/**
 * Create/update/delete API orchestration for call reasons. Adding resets the page to 1 and
 * clears any active search before refreshing the list; updating just refreshes in place. Delete
 * errors are parsed inline and surfaced via toast rather than going through the shared
 * submit-error handler, since the delete confirmation modal has no inline error slot.
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
    try {
      const response = await callReasonApiService.delete(id);

      if (response.status) {
        pagination.refresh();
        return true;
      }
      showToastMessage(response.message || 'Failed to delete call reason', 'error');
      return false;
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        showToastMessage(axiosErr.response?.data?.message || 'Failed to delete call reason', 'error');
      } else if (err && typeof err === 'object' && 'message' in err) {
        showToastMessage((err as { message: string }).message, 'error');
      } else {
        showToastMessage('Network error. Please try again.', 'error');
      }
      return false;
    }
  }, [pagination, showToastMessage]);

  return { handleAddCallReason, handleUpdateCallReason, handleDeleteCallReason };
}
