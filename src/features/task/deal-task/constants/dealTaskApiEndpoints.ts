/**
 * REST endpoints for the Deal Task entity.
 *
 * Used by:
 * - DealTaskDataService (task/deal-task/services/dealTaskDataService.ts)
 */
export const DEAL_TASK_API_ENDPOINTS = {
  GET_ALL: '/tasks',
  CREATE: '/tasks/deal',
  UPDATE: (id: number) => `/tasks/${id}`,
  DELETE: (id: number) => `/tasks/${id}`,
};
