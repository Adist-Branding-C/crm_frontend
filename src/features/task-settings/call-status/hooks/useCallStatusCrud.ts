import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useSubmitErrorHandler } from '../../../../shared/hooks/useSubmitErrorHandler';
import { callStatusApiService } from '../services';
import { CALL_STATUS_FIELD_MAP, CALL_STATUS_FIELD_ERROR_FALLBACKS } from '../constants/index';
import type { CallStatusFormData, UseCallStatusCrudParams } from '../types/index';

/**
 * Call-status create/update/delete API orchestration.
 *
 * Notes:
 * - Takes the list/pagination setters it needs to drive and a toast trigger as narrow
 *   dependencies, rather than owning or re-exporting the pagination or toast hooks themselves.
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
    pagination.setError('');

    try {
      const response = await callStatusApiService.delete(id);

      if (response.status) {
        pagination.refresh();
        return true;
      }
      pagination.setError(response.message || 'Failed to delete call status');
      return false;
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to delete call status');
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
      } else {
        pagination.setError('Network error. Please try again.');
      }
      return false;
    }
  }, [pagination]);

  return { handleAddCallStatus, handleUpdateCallStatus, handleDeleteCallStatus };
}
