export const DEAL_TASK_API_ENDPOINTS = {
  GET_ALL: '/deal-tasks',
  CREATE: '/deal-tasks',
  UPDATE: (id: number) => `/deal-tasks/${id}`,
  DELETE: (id: number) => `/deal-tasks/${id}`,
};
