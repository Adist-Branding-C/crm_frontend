import type { CallTaskFormData } from '../types/index';

export const CALL_TASK_API_ENDPOINTS = {
  GET_ALL: '/tasks',
  CREATE: '/tasks/call',
  UPDATE: (id: number) => `/tasks/${id}`,
  DELETE: (id: number) => `/tasks/${id}`,
};

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
