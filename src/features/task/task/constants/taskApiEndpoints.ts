export const TASK_API_ENDPOINTS = {
  GET_ALL: '/tasks',
  CREATE: '/tasks',
  UPDATE: (id: number) => `/tasks/${id}`,
  DELETE: (id: number) => `/tasks/${id}`,
};
