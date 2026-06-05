export const DEPARTMENT_API_ENDPOINTS = {
  GET_ALL: '/department',
  CREATE: '/department',
  UPDATE: (id: number) => `/department/${id}`,
  DELETE: (id: number) => `/department/${id}`,
};

export const DEPARTMENT_DEFAULTS = {
  ROWS_PER_PAGE: 10,
};
