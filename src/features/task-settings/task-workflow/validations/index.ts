import * as yup from 'yup';

const nameValidation = yup
  .string()
  .trim()
  .required('Name is required')
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must not exceed 100 characters');

export const createWorkflowValidationSchema = yup.object({
  name: nameValidation,
});

const stageNameValidation = yup
  .string()
  .trim()
  .required('Stage name is required')
  .min(2, 'Stage name must be at least 2 characters')
  .max(100, 'Stage name must not exceed 100 characters');

export const stageValidationSchema = yup.object({
  name: stageNameValidation,
  color: yup
    .string()
    .matches(/^#[0-9A-Fa-f]{6}$/, 'Color must be a valid hex value')
    .required('Color is required'),
});
