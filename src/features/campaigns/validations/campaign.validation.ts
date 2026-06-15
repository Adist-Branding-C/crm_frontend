import { CAMPAIGN_TYPES } from '../constants/campaign.constants';
import type { CampaignFormData } from '../types/campaign.types';

export const validateCampaignForm = (
  formData: CampaignFormData
): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!formData.type) {
    errors.type = 'Type is required';
  } else if (formData.type === CAMPAIGN_TYPES.LEAD_CAMPAIGN) {
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.startDate.trim()) errors.startDate = 'Start Date is required';
    if (!formData.endDate.trim()) errors.endDate = 'End Date is required';
  } else if (formData.type === CAMPAIGN_TYPES.DATA_POOL) {
    if (!formData.poolName.trim()) errors.poolName = 'Pool Name is required';
  }

  return errors;
};
