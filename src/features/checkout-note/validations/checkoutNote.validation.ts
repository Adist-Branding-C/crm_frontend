import * as yup from 'yup';

export const addCheckoutNoteValidationSchema = yup.object({
  note: yup.string().required('Note is required'),
});
