import type { AgentFormData } from '../types';

export const AGENT_API_ENDPOINTS = {
  GET_ALL: '/staff',
  CREATE: '/staff',
  UPDATE: (staffId: string) => `/staff/${staffId}`,
  DELETE: (staffId: string) => `/staff/${staffId}`,
};

export const AGENT_FIELD_MAP: Record<string, string> = {
  phone_number: 'phone',
  full_name: 'fullName',
  confirm_password: 'confirmPassword',
};

export const ADD_AGENT_INITIAL_VALUES: AgentFormData = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  designationId: '',
  departmentId: '',
  status: '',
};
