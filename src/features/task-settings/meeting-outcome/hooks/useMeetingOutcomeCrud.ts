import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useSubmitErrorHandler } from '../../../../shared/hooks/useSubmitErrorHandler';
import { meetingOutcomeApiService } from '../services';
import { MEETING_OUTCOME_FIELD_MAP, MEETING_OUTCOME_FIELD_ERROR_FALLBACKS } from '../constants/index';
import type { MeetingOutcomeFormData, UseMeetingOutcomeCrudParams } from '../types/index';

/**
 * Create/update/delete API orchestration for meeting outcomes. Adding resets the page to 1 and
 * clears any active search before refreshing the list; updating just refreshes in place and,
 * unlike add/delete, does not show a success toast. Delete errors are parsed inline rather than
 * going through the shared submit-error handler.
 */
export function useMeetingOutcomeCrud({ pagination, showToastMessage }: UseMeetingOutcomeCrudParams) {
  const submitError = useSubmitErrorHandler({
    fieldMap: MEETING_OUTCOME_FIELD_MAP,
    fieldFallbacks: MEETING_OUTCOME_FIELD_ERROR_FALLBACKS,
    setError: pagination.setError,
  });

  const handleAddMeetingOutcome = useCallback(async (
    values: MeetingOutcomeFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<MeetingOutcomeFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { name, status } = values;
      const response = await meetingOutcomeApiService.create({ name: name.trim(), status });

      if (response.status) {
        pagination.setPageNumber(1);
        pagination.setSearchQuery('');
        pagination.refresh();
        resetForm();
        showToastMessage('Meeting outcome added successfully', 'success');
        return true;
      }

      submitError.handleErrorResponse(response, setFieldError, 'Failed to add meeting outcome');
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, 'Failed to add meeting outcome');
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [submitError, showToastMessage, pagination]);

  const handleUpdateMeetingOutcome = useCallback(async (
    id: number,
    values: MeetingOutcomeFormData,
    { setSubmitting, setFieldError }: FormikHelpers<MeetingOutcomeFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const { name, status } = values;
      const response = await meetingOutcomeApiService.update(id, { name: name.trim(), status });

      if (response.status) {
        pagination.refresh();
        return true;
      }

      submitError.handleErrorResponse(response, setFieldError, 'Failed to update meeting outcome');
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, 'Failed to update meeting outcome');
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [submitError, pagination]);

  const handleDeleteMeetingOutcome = useCallback(async (id: number) => {
    pagination.setError('');

    try {
      const response = await meetingOutcomeApiService.delete(id);

      if (response.status) {
        pagination.refresh();
        return true;
      }
      pagination.setError(response.message || 'Failed to delete meeting outcome');
      return false;
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to delete meeting outcome');
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
      } else {
        pagination.setError('Network error. Please try again.');
      }
      return false;
    }
  }, [pagination]);

  return { handleAddMeetingOutcome, handleUpdateMeetingOutcome, handleDeleteMeetingOutcome };
}
