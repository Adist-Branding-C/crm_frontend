export const CHECKOUT_NOTE_API_ENDPOINTS = {
  GET_ALL: '/checkout-note',
  CREATE: '/checkout-note',
  UPDATE: (id: number) => `/checkout-note/${id}`,
  DELETE: (id: number) => `/checkout-note/${id}`,
};

export const CHECKOUT_NOTE_DEFAULTS = {
  ROWS_PER_PAGE: 10,
};
