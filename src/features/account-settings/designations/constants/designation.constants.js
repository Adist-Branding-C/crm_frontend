export const DESIGNATION_API_ENDPOINTS = {
  GET_ALL: '/designation',
  CREATE: '/designation',
  UPDATE: (id) => `/designation/${id}`,
  DELETE: (id) => `/designation/${id}`,
};

export const DESIGNATION_DEFAULTS = {
  ROWS_PER_PAGE: 10,
};
