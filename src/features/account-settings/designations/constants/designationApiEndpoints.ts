// Designation CRUD routes consumed by designation.service.ts (account-settings/designations tab and agent's designation dropdown).
export const DESIGNATION_API_ENDPOINTS = {
  GET_ALL: '/designation',
  CREATE: '/designation',
  UPDATE: (id: number) => `/designation/${id}`,
  DELETE: (id: number) => `/designation/${id}`,
};
