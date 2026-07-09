import type { DealTaskFormData } from '../types/index';

export const DEAL_TASK_API_ENDPOINTS = {
  GET_ALL: '/tasks',
  CREATE: '/tasks/deal',
  UPDATE: (id: number) => `/tasks/${id}`,
  DELETE: (id: number) => `/tasks/${id}`,
};

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
