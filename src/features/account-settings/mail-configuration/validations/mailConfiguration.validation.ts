import * as yup from 'yup';

const nameValidation = yup
  .string()
  .trim()
  .required('Mail driver is required');

const hostValidation = yup
  .string()
  .trim()
  .required('SMTP host is required')
  .min(2, 'Host must be at least 2 characters')
  .max(255, 'Host must not exceed 255 characters');

const portValidation = yup
  .string()
  .trim()
  .required('Port is required')
  .test('is-numeric', 'Port must be a number', (value) => {
    if (!value) return true;
    return /^\d+$/.test(value);
  })
  .test('port-range', 'Port must be between 1 and 65535', (value) => {
    if (!value) return true;
    const num = Number(value);
    return num >= 1 && num <= 65535;
  });

const emailValidation = yup
  .string()
  .trim()
  .email('Enter a valid email address');

export const addMailConfigurationValidationSchema = yup.object({
  driver: nameValidation,
  host: hostValidation,
  port: portValidation,
  encryption: yup.string().trim().required('Please select encryption'),
  username: emailValidation,
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  fromEmail: emailValidation,
  fromName: yup.string().trim(),
});

export const editMailConfigurationValidationSchema = yup.object({
  driver: nameValidation,
  host: hostValidation,
  port: portValidation,
  encryption: yup.string().trim().required('Please select encryption'),
  username: emailValidation,
  password: yup.string().notRequired(),
  fromEmail: emailValidation,
  fromName: yup.string().trim(),
});
