import type { DesignationFormData } from '../types';

export const DESIGNATION_FIELD_MAP: Record<string, string> = {
  designation_name: 'designationName',
};

export const ADD_DESIGNATION_INITIAL_VALUES: DesignationFormData = {
  designationName: '',
  description: '',
  status: '',
};

export const DESIGNATION_API_ENDPOINTS = {
  GET_ALL: '/designation',
  CREATE: '/designation',
  UPDATE: (id: number) => `/designation/${id}`,
  DELETE: (id: number) => `/designation/${id}`,
};
