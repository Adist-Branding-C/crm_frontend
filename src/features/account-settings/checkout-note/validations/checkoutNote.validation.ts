import * as yup from 'yup';

// Enforces a readable, non-trivial title for checkout notes; shared by add/edit forms in AddCheckoutNoteDrawer (account-settings/checkout-note).
const titleValidation = yup
  .string()
  .trim()
  .required('Title is required')
  .min(2, 'Title must be at least 2 characters')
  .max(200, 'Title must not exceed 200 characters')
  .matches(/^[a-zA-Z0-9\s'-]+$/, 'Title contains invalid characters');

// Bounds the note body length so the checkout note stays a short note rather than a document; shared by add/edit forms in AddCheckoutNoteDrawer.
const noteValidation = yup
  .string()
  .trim()
  .required('Note is required')
  .min(2, 'Note must be at least 2 characters')
  .max(500, 'Note must not exceed 500 characters');

// Used by AddCheckoutNoteDrawer when creating a new checkout note (account-settings/checkout-note).
export const addCheckoutNoteValidationSchema = yup.object({
  title: titleValidation,
  note: noteValidation,
  // Checkout notes must be explicitly marked active/inactive so they can be toggled without deleting them.
  status: yup.string().required('Please select a status'),
});

// Used by AddCheckoutNoteDrawer when editing an existing checkout note (account-settings/checkout-note).
export const editCheckoutNoteValidationSchema = yup.object({
  title: titleValidation,
  note: noteValidation,
  status: yup.string().required('Please select a status'),
});
