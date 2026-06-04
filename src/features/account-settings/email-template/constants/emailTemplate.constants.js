export const EMAIL_TEMPLATE_API_ENDPOINTS = {
  GET_ALL: '/email-template',
  CREATE: '/email-template',
  UPDATE: (id) => `/email-template/${id}`,
  DELETE: (id) => `/email-template/${id}`,
};

export const EMAIL_TEMPLATE_DEFAULTS = {
  ROWS_PER_PAGE: 10,
};
