import * as yup from 'yup';

export const resetPasswordValidationSchema = yup.object({
  password: yup
    .string()
    .required('Please enter a new password')
    .min(8, 'Password must be at least 8 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your new password'),
});
