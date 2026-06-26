import * as yup from 'yup';

const phoneValidation = yup
  .string()
  .required('Phone number is required')
  .test('digits-only', 'Only numbers are allowed', (value) => {
    if (!value) return true;
    return /^\d*$/.test(value);
  })
  .test('start-digit', 'Phone number must start with 6, 7, 8, or 9', (value) => {
    if (!value) return true;
    return /^[6-9]/.test(value);
  })
  .test('length', 'Phone number must be exactly 10 digits', (value) => {
    if (!value) return true;
    return value.length === 10;
  });

const nameValidation = yup
  .string()
  .required('Name is required')
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must not exceed 100 characters')
  .matches(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters');

export const addAgentValidationSchema = yup.object({
  fullName: nameValidation,
  email: yup.string().email('Enter a valid email address').required('Email is required'),
  phone: phoneValidation,
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords do not match').required('Confirm password is required'),
  designationId: yup.string().required('Please select a designation'),
  status: yup.string().required('Please select a status'),
});

export const editAgentValidationSchema = yup.object({
  fullName: nameValidation,
  email: yup.string().email('Enter a valid email address').required('Email is required'),
  phone: phoneValidation,
  password: yup.string().notRequired(),
  confirmPassword: yup.string().notRequired(),
  designationId: yup.string().required('Please select a designation'),
  status: yup.string().required('Please select a status'),
});
