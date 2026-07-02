import type { TaskFormData } from '../types/index';

export const TASK_API_ENDPOINTS = {
  GET_ALL: '/tasks',
  CREATE: '/tasks',
  UPDATE: (id: number) => `/tasks/${id}`,
  DELETE: (id: number) => `/tasks/${id}`,
};

export const ADD_TASK_INITIAL_VALUES: TaskFormData = {
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
