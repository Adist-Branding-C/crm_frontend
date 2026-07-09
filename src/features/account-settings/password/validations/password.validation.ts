import * as yup from 'yup';
import { strongPasswordYupSchema } from '../../../../shared/validations/password.validation';

export const changePasswordValidationSchema = yup.object({
  // Used by PasswordPage's change-password form (account-settings/password) to require the
  // user's existing password before allowing a change.
  currentPassword: yup.string().required('Current password is required'),
  // Used by PasswordPage's change-password form (account-settings/password); reuses the shared
  // strongPasswordYupSchema (src/shared/validations/password.validation.ts) for the strength rule
  // and layers on the "must differ from current password" check.
  newPassword: strongPasswordYupSchema
    .required('New password is required')
    .notOneOf([yup.ref('currentPassword')], 'New password must be different from current password'),
  // Used by PasswordPage's change-password form (account-settings/password) to ensure the user
  // retyped the new password correctly before submitting.
  confirmPassword: yup
    .string()
    .required('Please confirm your new password')
    .oneOf([yup.ref('newPassword')], 'Passwords do not match'),
});
