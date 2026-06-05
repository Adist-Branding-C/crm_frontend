export const BRANCH_API_ENDPOINTS = {
  GET_ALL: '/branch',
  CREATE: '/branch',
  UPDATE: (id: number) => `/branch/${id}`,
  DELETE: (id: number) => `/branch/${id}`,
};

export const BRANCH_DEFAULTS = {
  ROWS_PER_PAGE: 10,
};
