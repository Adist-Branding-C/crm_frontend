// Department CRUD routes consumed by department.service.ts (account-settings/department).
export const DEPARTMENT_API_ENDPOINTS = {
  GET_ALL: '/department',
  CREATE: '/department',
  UPDATE: (id: number) => `/department/${id}`,
  DELETE: (id: number) => `/department/${id}`,
};
