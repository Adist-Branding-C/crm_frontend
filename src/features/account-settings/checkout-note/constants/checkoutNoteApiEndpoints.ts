// Checkout note CRUD routes consumed by checkoutNote.service.ts (account-settings/checkout-note tab).
export const CHECKOUT_NOTE_API_ENDPOINTS = {
  GET_ALL: '/checkout-note',
  CREATE: '/checkout-note',
  UPDATE: (id: number) => `/checkout-note/${id}`,
  DELETE: (id: number) => `/checkout-note/${id}`,
};
