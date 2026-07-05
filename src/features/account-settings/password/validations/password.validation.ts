import * as yup from 'yup';
import { STRONG_PASSWORD_REGEX, STRONG_PASSWORD_MESSAGE } from '../../../../shared/constants/regex';

export const changePasswordValidationSchema = yup.object({
  currentPassword: yup.string().required('Current password is required'),
  newPassword: yup
    .string()
    .required('New password is required')
    .matches(STRONG_PASSWORD_REGEX, STRONG_PASSWORD_MESSAGE)
    .notOneOf([yup.ref('currentPassword')], 'New password must be different from current password'),
  confirmPassword: yup
    .string()
    .required('Please confirm your new password')
    .oneOf([yup.ref('newPassword')], 'Passwords do not match'),
});
