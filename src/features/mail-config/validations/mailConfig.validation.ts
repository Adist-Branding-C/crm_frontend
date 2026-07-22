import * as yup from 'yup';

/**
 * Validation schema for creating/editing a mail configuration.
 *
 * Used by:
 * - MailConfigPage's Add/Edit Mail Config drawer
 *
 * Notes:
 * - driver/host/port/fromEmail are the fields actually required for the config to work (backend
 *   uses them to build the mail transport); encryption/username/password/fromName are left
 *   optional since some drivers (e.g. local sendmail) don't need auth credentials.
 * - port is validated as an integer in the valid TCP port range (1-65535).
 * - The backend's CreateMailConfigDto only checks types (IsString/IsNumber), not presence or
 *   format, so this is the only layer currently enforcing required fields and email format.
 */
export const mailConfigValidationSchema = yup.object({
  driver: yup.string().required('Mail driver is required'),
  host: yup.string().trim().required('Host is required').max(255, 'Host must not exceed 255 characters'),
  port: yup
    .number()
    .typeError('Port must be a number')
    .required('Port is required')
    .integer('Port must be a whole number')
    .min(1, 'Port must be between 1 and 65535')
    .max(65535, 'Port must be between 1 and 65535'),
  encryption: yup.string(),
  username: yup.string().max(255, 'Username must not exceed 255 characters'),
  password: yup.string().max(500, 'Password must not exceed 500 characters'),
  fromEmail: yup.string().trim().email('Enter a valid email address').required('From email is required').max(255, 'From email must not exceed 255 characters'),
  fromName: yup.string().max(255, 'From name must not exceed 255 characters'),
  isActive: yup.boolean(),
});
