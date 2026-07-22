import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { CampaignTaskMapper } from '../mappers/campaignTask.mapper';
import type { CampaignTaskFormData } from '../types/index';
import type { UseCampaignTaskFormSubmitParams } from '../types/useCampaignTaskFormSubmit.types';

export function useCampaignTaskFormSubmit({ editingItem, closeDrawer, handleAddCampaignTask, handleUpdateCampaignTask }: UseCampaignTaskFormSubmitParams) {
  const handleSubmit = useCallback(async (
    values: CampaignTaskFormData,
    helpers: FormikHelpers<CampaignTaskFormData>,
  ) => {
    const success = await handleAddCampaignTask(values, helpers);
    if (success) closeDrawer();
  }, [handleAddCampaignTask, closeDrawer]);

  const handleEditSubmit = useCallback(async (
    values: CampaignTaskFormData,
    helpers: FormikHelpers<CampaignTaskFormData>,
  ) => {
    if (!editingItem) return;
    const original = CampaignTaskMapper.toFormValues(editingItem);
    if (JSON.stringify(values) === JSON.stringify(original)) {
      helpers.setSubmitting(false);
      return;
    }
    const success = await handleUpdateCampaignTask(editingItem.id, values, helpers);
    if (success) closeDrawer();
  }, [editingItem, handleUpdateCampaignTask, closeDrawer]);

  return { handleSubmit, handleEditSubmit };
}
