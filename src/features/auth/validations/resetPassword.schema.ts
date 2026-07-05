import * as yup from 'yup';
import { STRONG_PASSWORD_REGEX, STRONG_PASSWORD_MESSAGE } from '../../../shared/constants/regex';

export const resetPasswordValidationSchema = yup.object({
  password: yup
    .string()
    .required('Please enter a new password')
    .matches(STRONG_PASSWORD_REGEX, STRONG_PASSWORD_MESSAGE),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your new password'),
});
