import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { useSubmitErrorHandler } from '../../../shared/hooks/useSubmitErrorHandler';
import { campaignApiService } from '../services';
import { CampaignMapper } from '../mappers/campaign.mapper';
import { CAMPAIGN_FIELD_MAP, CAMPAIGN_FIELD_ERROR_FALLBACKS } from '../constants/index';
import type { CampaignFormData, CreateCampaignPayload, UpdateCampaignPayload } from '../types/request';
import type { UseCampaignCrudParams } from '../types/index';

/**
 * Create/update/delete API orchestration for campaigns. Adding resets the page to 1 and
 * clears any active search before refreshing the list; updating just refreshes in place. Delete
 * errors are parsed inline rather than going through the shared submit-error handler.
 */
export function useCampaignCrud({ pagination, showToastMessage }: UseCampaignCrudParams) {
  const submitError = useSubmitErrorHandler({
    fieldMap: CAMPAIGN_FIELD_MAP,
    fieldFallbacks: CAMPAIGN_FIELD_ERROR_FALLBACKS,
    setError: pagination.setError,
  });

  const handleAddCampaign = useCallback(async (
    values: CampaignFormData,
    { setSubmitting, resetForm, setFieldError }: FormikHelpers<CampaignFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const payload = CampaignMapper.toRequest(values) as CreateCampaignPayload;
      const response = await campaignApiService.create(payload);

      if (response.status) {
        pagination.setPageNumber(1);
        pagination.setSearchQuery('');
        pagination.refresh();
        resetForm();
        showToastMessage('Campaign added successfully', 'success');
        return true;
      }

      submitError.handleErrorResponse(response, setFieldError, 'Failed to add campaign');
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, 'Failed to add campaign');
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [submitError, showToastMessage, pagination]);

  const handleUpdateCampaign = useCallback(async (
    id: number,
    values: CampaignFormData,
    { setSubmitting, setFieldError }: FormikHelpers<CampaignFormData>,
  ) => {
    pagination.setError('');
    pagination.setIsLoading(true);

    try {
      const payload = CampaignMapper.toRequest(values) as UpdateCampaignPayload;
      const response = await campaignApiService.update(String(id), payload);

      if (response.status) {
        pagination.refresh();
        showToastMessage('Campaign updated successfully', 'success');
        return true;
      }

      submitError.handleErrorResponse(response, setFieldError, 'Failed to update campaign');
      return false;
    } catch (err: unknown) {
      submitError.handleThrownError(err, setFieldError, 'Failed to update campaign');
      return false;
    } finally {
      pagination.setIsLoading(false);
      setSubmitting(false);
    }
  }, [submitError, showToastMessage, pagination]);

  const handleDeleteCampaign = useCallback(async (id: number) => {
    pagination.setError('');

    try {
      const response = await campaignApiService.delete(String(id));

      if (response.status) {
        pagination.refresh();
        return true;
      }
      pagination.setError(response.message || 'Failed to delete campaign');
      return false;
    } catch (err: unknown) {
      if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as { response?: { data?: { message?: string } } };
        pagination.setError(axiosErr.response?.data?.message || 'Failed to delete campaign');
      } else if (err && typeof err === 'object' && 'message' in err) {
        pagination.setError((err as { message: string }).message);
      } else {
        pagination.setError('Network error. Please try again.');
      }
      return false;
    }
  }, [pagination]);

  return { handleAddCampaign, handleUpdateCampaign, handleDeleteCampaign };
}
