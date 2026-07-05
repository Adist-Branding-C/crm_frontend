import * as yup from 'yup';

export const addMailConfigurationValidationSchema = yup.object({
  driver: yup.string().trim().required('Driver is required'),
  host: yup.string().trim().required('Host is required'),
  port: yup.string().trim().required('Port is required'),
  encryption: yup.string().trim().required('Encryption is required'),
  username: yup.string().trim().notRequired(),
  password: yup.string().trim().required('Password is required'),
  fromEmail: yup.string().trim().notRequired(),
  fromName: yup.string().trim().notRequired(),
});

export const editMailConfigurationValidationSchema = yup.object({
  driver: yup.string().trim().required('Driver is required'),
  host: yup.string().trim().required('Host is required'),
  port: yup.string().trim().required('Port is required'),
  encryption: yup.string().trim().required('Encryption is required'),
  username: yup.string().trim().notRequired(),
  password: yup.string().trim().notRequired(),
  fromEmail: yup.string().trim().notRequired(),
  fromName: yup.string().trim().notRequired(),
});
