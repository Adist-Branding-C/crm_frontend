import * as yup from 'yup';

export const changePasswordValidationSchema = yup.object({
  currentPassword: yup.string().trim().required('Current password is required'),
  newPassword: yup.string().trim().required('New password is required'),
  confirmPassword: yup.string().trim().oneOf([yup.ref('newPassword')], 'Passwords do not match').required('Confirm password is required'),
});
