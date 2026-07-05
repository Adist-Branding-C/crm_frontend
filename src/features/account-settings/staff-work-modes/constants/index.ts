import type { WorkModeFormData } from '../types';

export const ADD_WORK_MODE_INITIAL_VALUES: WorkModeFormData = {
  workModeName: '',
  description: '',
  status: '',
};

export const WORK_MODE_API_ENDPOINTS = {
  GET_ALL: '/work-mode',
  CREATE: '/work-mode',
  UPDATE: (id: number) => `/work-mode/${id}`,
  DELETE: (id: number) => `/work-mode/${id}`,
};
