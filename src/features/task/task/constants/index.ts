/**
 * REST endpoints for the Task entity.
 *
 * Used by:
 * - TaskApiService (task/task/services/task.api.ts)
 */
export const TASK_API_ENDPOINTS = {
  BASE: '/tasks',
  BY_ID: (id: number) => `/tasks/${id}`,
};

/**
 * Blank form values for the Add Task drawer, and the fallback used by
 * `TaskMapper.toFormValues` when there's no editing item yet.
 *
 * Used by:
 * - TaskPage (Add drawer initial values)
 * - TaskMapper.toFormValues
 */
export const ADD_TASK_INITIAL_VALUES = {
  title: '',
  description: '',
  categoryId: '',
  scheduledDate: '',
  scheduledTime: '',
  assignedTo: '',
  leadId: '',
  priority: '',
  status: '',
};

export { PRIORITY_OPTIONS } from '../../shared/constants/priorityOptions';
export { STATUS_OPTIONS } from '../../shared/constants/statusOptions';
