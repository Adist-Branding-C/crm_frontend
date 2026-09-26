/**
 * REST endpoints for the Campaign Task entity.
 *
 * Used by:
 * - CampaignTaskDataService (task/campaign-task/services/campaignTaskDataService.ts)
 */
export const CAMPAIGN_TASK_API_ENDPOINTS = {
  GET_ALL: '/tasks',
  CREATE: '/tasks/campaign',
  GET_BY_ID: (id: number) => `/tasks/${id}`,
  UPDATE: (id: number) => `/tasks/${id}`,
  DELETE: (id: number) => `/tasks/${id}`,
};
