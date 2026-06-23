export const DEAL_TYPE_API_ENDPOINTS = {
  GET_ALL: '/deal-types',
  CREATE: '/deal-types',
  UPDATE: (id: number) => `/deal-types/${id}`,
  DELETE: (id: number) => `/deal-types/${id}`,
};
