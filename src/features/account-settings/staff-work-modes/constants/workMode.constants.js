export const WORK_MODE_API_ENDPOINTS = {
  GET_ALL: '/work-mode',
  CREATE: '/work-mode',
  UPDATE: (id) => `/work-mode/${id}`,
  DELETE: (id) => `/work-mode/${id}`,
};

export const WORK_MODE_DEFAULTS = {
  ROWS_PER_PAGE: 10,
};
