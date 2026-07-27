import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useSubmitErrorHandler } from '../../../../shared/hooks/useSubmitErrorHandler';
import { callStatusApiService } from '../services';
import { CALL_STATUS_FIELD_MAP, CALL_STATUS_FIELD_ERROR_FALLBACKS } from '../constants/index';
import type { CallStatusFormData, UseCallStatusCrudParams } from '../types/index';

/**
 * Create/update/delete API orchestration for call statuses. Adding resets the page to 1 and
 * clears any active search before refreshing the list; updating just refreshes in place. Delete
 * errors are parsed inline and surfaced via toast rather than going through the shared
 * submit-error handler, since the delete confirmation modal has no inline error slot.
 */
export function useCallStatusCrud({ pagination, showToastMessage }: UseCallStatusCrudParams) {
  const submitError = useSubmitErrorHandler({
    fieldMap: CALL_STATUS_FIELD_MAP,
    fieldFallbacks: CALL_STATUS_FIELD_ERROR_FALLBACKS,
    setError: pagination.setError,
  });

  const handleAddCallStatus = useCallback(async (
    values: CallStatusFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<CallStatusFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { name, status } = values;
      const response = await callStatusApiService.create({ name: name.trim(), status });

      if (response.status) {
        pagination.setPageNumber(1);
        pagination.setSearchQuery('');
        pagination.refresh();
        resetForm();
        showToastMessage('Call status added successfully', 'success');
        return true;
      }

      submitError.handleErrorResponse(response, setFieldError, 'Failed to add call status');
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, 'Failed to add call status');
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [submitError, showToastMessage, pagination]);

  const handleUpdateCallStatus = useCallback(async (
    id: number,
    values: CallStatusFormData,
    { setSubmitting, setFieldError }: FormikHelpers<CallStatusFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { name, status } = values;
      const response = await callStatusApiService.update(id, { name: name.trim(), status });

      if (response.status) {
        pagination.refresh();
        showToastMessage('Call status updated successfully', 'success');
        return true;
      }

      submitError.handleErrorResponse(response, setFieldError, 'Failed to update call status');
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, 'Failed to update call status');
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [submitError, showToastMessage, pagination]);

  const handleDeleteCallStatus = useCallback(async (id: number) => {
    try {
      const response = await callStatusApiService.delete(id);

      if (response.status) {
        pagination.refresh();
        return true;
      }
      showToastMessage(response.message || 'Failed to delete call status', 'error');
      return false;
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        showToastMessage(axiosErr.response?.data?.message || 'Failed to delete call status', 'error');
      } else if (err && typeof err === 'object' && 'message' in err) {
        showToastMessage((err as { message: string }).message, 'error');
      } else {
        showToastMessage('Network error. Please try again.', 'error');
      }
      return false;
    }
  }, [pagination, showToastMessage]);

  return { handleAddCallStatus, handleUpdateCallStatus, handleDeleteCallStatus };
}
