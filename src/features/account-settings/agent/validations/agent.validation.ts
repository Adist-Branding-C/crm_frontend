import * as yup from 'yup';

export const addAgentValidationSchema = yup.object({
  fullName: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords do not match').required('Confirm password is required'),
  designationId: yup.string(),
  status: yup.string().required('Status is required'),
});

export const editAgentValidationSchema = yup.object({
  fullName: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  password: yup.string().notRequired(),
  confirmPassword: yup.string().notRequired(),
  designationId: yup.string(),
  status: yup.string().required('Status is required'),
});
