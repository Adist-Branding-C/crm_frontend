export const WHATSAPP_TEMPLATE_API_ENDPOINTS = {
  GET_ALL: '/whatsapp-template',
  CREATE: '/whatsapp-template',
  UPDATE: (id: number) => `/whatsapp-template/${id}`,
  DELETE: (id: number) => `/whatsapp-template/${id}`,
};

export const WHATSAPP_TEMPLATE_DEFAULTS = {
  ROWS_PER_PAGE: 10,
};
