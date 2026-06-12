export const DEAL_STATUS_API_ENDPOINTS = {
  GET_ALL: '/deal-status',
  CREATE: '/deal-status',
  UPDATE: (id: number) => `/deal-status/${id}`,
  DELETE: (id: number) => `/deal-status/${id}`,
};
