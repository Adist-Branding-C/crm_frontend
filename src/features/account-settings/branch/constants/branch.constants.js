export const BRANCH_API_ENDPOINTS = {
  GET_ALL: '/branch',
  CREATE: '/branch',
  UPDATE: (id) => `/branch/${id}`,
  DELETE: (id) => `/branch/${id}`,
};

export const BRANCH_DEFAULTS = {
  ROWS_PER_PAGE: 10,
};
