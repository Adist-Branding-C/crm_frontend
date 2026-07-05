import * as yup from 'yup';

export const addCheckoutNoteValidationSchema = yup.object({
  title: yup.string().trim().required('Title is required'),
  note: yup.string().trim().max(500, 'Note must be under 500 characters').required('Note is required'),
  status: yup.string().trim().required('Status is required'),
});

export const editCheckoutNoteValidationSchema = yup.object({
  title: yup.string().trim().required('Title is required'),
  note: yup.string().trim().max(500, 'Note must be under 500 characters').required('Note is required'),
  status: yup.string().trim().required('Status is required'),
});
