import * as yup from 'yup';

const callStatusValidationSchema = yup.object({
  name: yup.string().trim().required('Name is required'),
  status: yup.string().required('Status is required'),
});

export const addCallStatusValidationSchema = callStatusValidationSchema;
export const editCallStatusValidationSchema = callStatusValidationSchema;
