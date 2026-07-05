import * as yup from 'yup';

export const addAgentValidationSchema = yup.object({
  fullName: yup.string().trim().required('Full name is required'),
  email: yup.string().trim().required('Email is required'),
  phone: yup.string().trim().required('Phone is required'),
  password: yup.string().trim().required('Password is required'),
  confirmPassword: yup.string().trim().oneOf([yup.ref('password')], 'Passwords do not match').required('Confirm password is required'),
  designationId: yup.string().trim().required('Designation is required'),
  departmentId: yup.string().trim().required('Department is required'),
  status: yup.string().trim().required('Status is required'),
});

export const editAgentValidationSchema = yup.object({
  fullName: yup.string().trim().required('Full name is required'),
  email: yup.string().trim().required('Email is required'),
  phone: yup.string().trim().required('Phone is required'),
  password: yup.string().trim().notRequired(),
  confirmPassword: yup.string().trim().notRequired(),
  designationId: yup.string().trim().required('Designation is required'),
  departmentId: yup.string().trim().required('Department is required'),
  status: yup.string().trim().required('Status is required'),
});
