import type { CallTaskFormData } from '../types/index';

/**
 * REST endpoints for the Call Task entity.
 *
 * Used by:
 * - CallTaskApiService (task/call-task/services/callTask.api.ts)
 */
export const CALL_TASK_API_ENDPOINTS = {
  GET_ALL: '/tasks',
  CREATE: '/tasks/call',
  UPDATE: (id: number) => `/tasks/${id}`,
  DELETE: (id: number) => `/tasks/${id}`,
};

/**
 * Blank form values for the Add Call Task drawer, and the fallback used by
 * `CallTaskMapper.toFormValues` when there's no editing item yet.
 *
 * Used by:
 * - CallTaskPage (Add drawer initial values)
 * - useCallTaskDrawer (via CallTaskMapper.toFormValues)
 */
export const ADD_CALL_TASK_INITIAL_VALUES: CallTaskFormData = {
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
