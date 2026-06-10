export const CAMPAIGN_TASK_API_ENDPOINTS = {
  GET_ALL: '/campaign-tasks',
  CREATE: '/campaign-tasks',
  UPDATE: (id: number) => `/campaign-tasks/${id}`,
  DELETE: (id: number) => `/campaign-tasks/${id}`,
};
