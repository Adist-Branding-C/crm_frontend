import type { CampaignTaskFormData } from '../types/index';

/**
 * Blank form values for the Add Campaign Task drawer, and the fallback used by
 * `CampaignTaskMapper.toFormValues` when there's no editing item yet.
 *
 * Used by:
 * - CampaignTaskPage (Add drawer initial values)
 * - useCampaignTaskDrawer (via CampaignTaskMapper.toFormValues)
 */
export const ADD_CAMPAIGN_TASK_INITIAL_VALUES: CampaignTaskFormData = {
  title: '',
  description: '',
  scheduledDate: '',
  scheduledTime: '',
  assignedTo: '',
  leadId: '',
  priority: '',
  status: '',
};
