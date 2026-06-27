import * as yup from 'yup';

const textValidation = yup
  .string()
  .trim()
  .required('Department name is required')
  .min(2, 'Department name must be at least 2 characters')
  .max(200, 'Department name must not exceed 200 characters')
  .matches(/^[a-zA-Z0-9\s'-]+$/, 'Department name contains invalid characters');

const descriptionValidation = yup
  .string()
  .trim()
  .max(500, 'Description must not exceed 500 characters');

export const addDepartmentValidationSchema = yup.object({
  departmentName: textValidation,
  description: descriptionValidation,
  status: yup.string().required('Please select a status'),
});

export const editDepartmentValidationSchema = yup.object({
  departmentName: textValidation,
  description: descriptionValidation,
  status: yup.string().required('Please select a status'),
});
