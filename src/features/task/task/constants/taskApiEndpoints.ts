/**
 * REST endpoints for the Task entity.
 *
 * Used by:
 * - TaskDataService (task/task/services/taskDataService.ts)
 *
 * Notes:
 * - Task creates against the same base path as the list endpoint (unlike Call/Campaign/Deal
 *   Task, which each POST to their own entity-specific sub-path) - GET_ALL and CREATE are
 *   intentionally the same value.
 */
export const TASK_API_ENDPOINTS = {
  GET_ALL: '/tasks',
  CREATE: '/tasks',
  GET_BY_ID: (id: number) => `/tasks/${id}`,
  UPDATE: (id: number) => `/tasks/${id}`,
  DELETE: (id: number) => `/tasks/${id}`,
  RECURRENCE_CHAIN: (id: number) => `/tasks/${id}/recurrence-chain`,
};
