import type { BranchFormData } from '../types';

export const BRANCH_FIELD_MAP: Record<string, string> = {
  name: 'name',
  branch_name: 'name',
};

export const ADD_BRANCH_INITIAL_VALUES: BranchFormData = {
  name: '',
  description: '',
  status: '',
};

export const BRANCH_API_ENDPOINTS = {
  GET_ALL: '/branch',
  CREATE: '/branch',
  UPDATE: (id: number) => `/branch/${id}`,
  DELETE: (id: number) => `/branch/${id}`,
};
