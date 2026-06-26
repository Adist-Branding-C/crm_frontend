import * as yup from 'yup';

const nameValidation = yup
  .string()
  .trim()
  .required('Branch name is required')
  .min(2, 'Branch name must be at least 2 characters')
  .max(200, 'Branch name must not exceed 200 characters')
  .matches(/^[a-zA-Z0-9\s'-]+$/, 'Branch name contains invalid characters');

const descriptionValidation = yup
  .string()
  .trim()
  .max(500, 'Description must not exceed 500 characters');

export const addBranchValidationSchema = yup.object({
  name: nameValidation,
  description: descriptionValidation,
  status: yup.string().required('Please select a status'),
});

export const editBranchValidationSchema = yup.object({
  name: nameValidation,
  description: descriptionValidation,
  status: yup.string().required('Please select a status'),
});
