import type { CampaignTaskFormData } from '../types/index';

/**
 * REST endpoints for the Campaign Task entity.
 *
 * Used by:
 * - CampaignTaskApiService (task/campaign-task/services/campaignTask.api.ts)
 */
export const CAMPAIGN_TASK_API_ENDPOINTS = {
  GET_ALL: '/tasks',
  CREATE: '/tasks/campaign',
  UPDATE: (id: number) => `/tasks/${id}`,
  DELETE: (id: number) => `/tasks/${id}`,
};

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

export { PRIORITY_OPTIONS } from '../../shared/constants/priorityOptions';
export { STATUS_OPTIONS } from '../../shared/constants/statusOptions';
