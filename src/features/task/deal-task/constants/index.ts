import type { DealTaskFormData } from '../types/index';

/**
 * REST endpoints for the Deal Task entity.
 *
 * Used by:
 * - DealTaskApiService (task/deal-task/services/dealTask.api.ts)
 */
export const DEAL_TASK_API_ENDPOINTS = {
  GET_ALL: '/tasks',
  CREATE: '/tasks/deal',
  UPDATE: (id: number) => `/tasks/${id}`,
  DELETE: (id: number) => `/tasks/${id}`,
};

/**
 * Blank form values for the Add Deal Task drawer, and the fallback used by
 * `DealTaskMapper.toFormValues` when there's no editing item yet.
 *
 * Used by:
 * - DealTaskPage (Add drawer initial values)
 * - useDealTaskDrawer (via DealTaskMapper.toFormValues)
 */
export const ADD_DEAL_TASK_INITIAL_VALUES: DealTaskFormData = {
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
