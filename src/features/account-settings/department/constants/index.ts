import type { DepartmentFormData } from '../types';

export const DEPARTMENT_FIELD_MAP: Record<string, string> = {
  department_name: 'departmentName',
};

export const ADD_DEPARTMENT_INITIAL_VALUES: DepartmentFormData = {
  departmentName: '',
  description: '',
  status: '',
};

export const DEPARTMENT_API_ENDPOINTS = {
  GET_ALL: '/department',
  CREATE: '/department',
  UPDATE: (id: number) => `/department/${id}`,
  DELETE: (id: number) => `/department/${id}`,
};
