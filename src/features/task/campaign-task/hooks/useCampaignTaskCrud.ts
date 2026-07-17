import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useSubmitErrorHandler } from '../../../../shared/hooks/useSubmitErrorHandler';
import { campaignTaskApiService } from '../services/index';
import { TASK_FIELD_MAP, TASK_FIELD_ERROR_FALLBACKS } from '../../shared/constants/fieldErrors';
import type { CampaignTaskFormData } from '../types/index';
import type { UseCampaignTaskCrudParams } from '../types/useCampaignTaskCrud.types';

export function useCampaignTaskCrud({ pagination, showToastMessage }: UseCampaignTaskCrudParams) {
  const submitError = useSubmitErrorHandler({
    fieldMap: TASK_FIELD_MAP,
    fieldFallbacks: TASK_FIELD_ERROR_FALLBACKS,
    setError: pagination.setError,
  });

  const handleAddCampaignTask = useCallback(async (
    values: CampaignTaskFormData,
    { setSubmitting, setFieldError }: FormikHelpers<CampaignTaskFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const response = await campaignTaskApiService.create(values);

      if (response.status) {
        pagination.refresh();
        showToastMessage('Campaign task added successfully', 'success');
        return true;
      }

      submitError.handleErrorResponse(response, setFieldError, 'Failed to add campaign task');
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, 'Failed to add campaign task');
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [submitError, pagination, showToastMessage]);

  const handleUpdateCampaignTask = useCallback(async (
    id: number,
    values: CampaignTaskFormData,
    { setSubmitting, setFieldError }: FormikHelpers<CampaignTaskFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const response = await campaignTaskApiService.update(id, values);

      if (response.status) {
        pagination.refresh();
        showToastMessage('Campaign task updated successfully', 'success');
        return true;
      }

      submitError.handleErrorResponse(response, setFieldError, 'Failed to update campaign task');
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, 'Failed to update campaign task');
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [submitError, pagination, showToastMessage]);

  const handleDeleteCampaignTask = useCallback(async (id: number) => {
    try {
      const response = await campaignTaskApiService.delete(id);

      if (response.status) {
        pagination.refresh();
        showToastMessage('Campaign task deleted successfully', 'success');
        return true;
      }
      showToastMessage(response.message || 'Failed to delete campaign task', 'error');
      return false;
    } catch {
      showToastMessage('Failed to delete campaign task', 'error');
      return false;
    }
  }, [pagination, showToastMessage]);

  return { handleAddCampaignTask, handleUpdateCampaignTask, handleDeleteCampaignTask };
}
