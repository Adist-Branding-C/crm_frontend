import type { CheckoutNoteFormData } from '../types';

export const CHECKOUT_NOTE_FIELD_MAP: Record<string, string> = {
  note: 'note',
  title: 'title',
};

export const ADD_CHECKOUT_NOTE_INITIAL_VALUES: CheckoutNoteFormData = {
  title: '',
  note: '',
  status: '',
};

export const CHECKOUT_NOTE_API_ENDPOINTS = {
  GET_ALL: '/checkout-note',
  CREATE: '/checkout-note',
  UPDATE: (id: number) => `/checkout-note/${id}`,
  DELETE: (id: number) => `/checkout-note/${id}`,
};
