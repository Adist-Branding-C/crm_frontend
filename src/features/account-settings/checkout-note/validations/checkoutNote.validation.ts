import * as yup from 'yup';

const titleValidation = yup
  .string()
  .trim()
  .required('Title is required')
  .min(2, 'Title must be at least 2 characters')
  .max(200, 'Title must not exceed 200 characters')
  .matches(/^[a-zA-Z0-9\s'-]+$/, 'Title contains invalid characters');

const noteValidation = yup
  .string()
  .trim()
  .required('Note is required')
  .min(2, 'Note must be at least 2 characters')
  .max(500, 'Note must not exceed 500 characters');

export const addCheckoutNoteValidationSchema = yup.object({
  title: titleValidation,
  note: noteValidation,
  status: yup.string().required('Please select a status'),
});

export const editCheckoutNoteValidationSchema = yup.object({
  title: titleValidation,
  note: noteValidation,
  status: yup.string().required('Please select a status'),
});
