import * as yup from 'yup';

export const dealStatusValidationSchema = yup.object({
  name: yup.string().required('Name is required'),
  status: yup.string().required('Status is required'),
});
