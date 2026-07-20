import { useCallback } from 'react';
import type { FormikHelpers } from 'formik';
import { CampaignMapper } from '../mappers/campaign.mapper';
import type { CampaignFormData } from '../types/request';
import type { UseCampaignFormSubmitParams } from '../types/index';

/**
 * Add/edit submit orchestration for the campaign drawer: dispatches to add or update, skips
 * the update call when the form is unchanged, and closes the relevant drawer on success.
 */
export function useCampaignFormSubmit({
  editingItem,
  closeAddDrawer,
  closeEditDrawer,
  handleAddCampaign,
  handleUpdateCampaign,
}: UseCampaignFormSubmitParams) {
  const handleSubmit = useCallback(async (
    values: CampaignFormData,
    helpers: FormikHelpers<CampaignFormData>,
  ) => {
    const success = await handleAddCampaign(values, helpers);
    if (success) closeAddDrawer();
  }, [handleAddCampaign, closeAddDrawer]);

  const handleEditSubmit = useCallback(async (
    values: CampaignFormData,
    helpers: FormikHelpers<CampaignFormData>,
  ) => {
    if (!editingItem) return;
    const original = CampaignMapper.toFormValues(editingItem);
    if (JSON.stringify(values) === JSON.stringify(original)) {
      helpers.setSubmitting(false);
      return;
    }
    const success = await handleUpdateCampaign(editingItem.id, values, helpers);
    if (success) closeEditDrawer();
  }, [editingItem, handleUpdateCampaign, closeEditDrawer]);

  return { handleSubmit, handleEditSubmit };
}
