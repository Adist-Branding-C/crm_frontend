/**
 * REST endpoints for the Call Task entity.
 *
 * Used by:
 * - CallTaskDataService (task/call-task/services/callTaskDataService.ts)
 */
export const CALL_TASK_API_ENDPOINTS = {
  GET_ALL: '/tasks',
  CREATE: '/tasks/call',
  UPDATE: (id: number) => `/tasks/${id}`,
  DELETE: (id: number) => `/tasks/${id}`,
};
