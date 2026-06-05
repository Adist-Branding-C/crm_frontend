import * as yup from 'yup';

export const addCheckoutNoteValidationSchema = yup.object({
  title: yup.string().trim().required('Title is required'),
  note: yup.string().trim().required('Note is required'),
  status: yup.string().required('Status is required'),
});
