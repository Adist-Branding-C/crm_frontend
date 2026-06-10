export const CALL_TASK_API_ENDPOINTS = {
  GET_ALL: '/call-tasks',
  CREATE: '/call-tasks',
  UPDATE: (id: number) => `/call-tasks/${id}`,
  DELETE: (id: number) => `/call-tasks/${id}`,
};
