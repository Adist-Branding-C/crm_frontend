export const WHATSAPP_TEMPLATE_API_ENDPOINTS = {
  GET_ALL: '/whatsapp-template',
  CREATE: '/whatsapp-template',
  UPDATE: (id) => `/whatsapp-template/${id}`,
  DELETE: (id) => `/whatsapp-template/${id}`,
};

export const WHATSAPP_TEMPLATE_DEFAULTS = {
  ROWS_PER_PAGE: 10,
};
