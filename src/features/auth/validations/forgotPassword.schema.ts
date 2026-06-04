import * as yup from 'yup';

export const forgotPasswordValidationSchema = yup.object({
  phone: yup.string().required('Phone number is required'),
});
