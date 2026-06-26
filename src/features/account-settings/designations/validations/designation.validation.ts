import * as yup from 'yup';

const textValidation = yup
  .string()
  .trim()
  .required('Designation name is required')
  .min(2, 'Designation name must be at least 2 characters')
  .max(200, 'Designation name must not exceed 200 characters')
  .matches(/^[a-zA-Z0-9\s'-]+$/, 'Designation name contains invalid characters');

const descriptionValidation = yup
  .string()
  .trim()
  .max(500, 'Description must not exceed 500 characters');

export const addDesignationValidationSchema = yup.object({
  designationName: textValidation,
  description: descriptionValidation,
  status: yup.string().required('Please select a status'),
});

export const editDesignationValidationSchema = yup.object({
  designationName: textValidation,
  description: descriptionValidation,
  status: yup.string().required('Please select a status'),
});
