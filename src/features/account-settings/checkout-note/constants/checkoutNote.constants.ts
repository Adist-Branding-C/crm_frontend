import type { CheckoutNoteFormData } from '../types/checkoutNote.types';

// Blank Formik initial state for AddCheckoutNoteDrawer's "add" mode (account-settings/checkout-note).
export const ADD_CHECKOUT_NOTE_INITIAL_VALUES: CheckoutNoteFormData = {
  title: '',
  note: '',
  status: '',
};
