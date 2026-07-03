import * as yup from 'yup';

export const loginValidationSchema = yup.object({
  phone: yup.string().required('Phone number is required'),
  password: yup.string().required('Password is required'),
});
