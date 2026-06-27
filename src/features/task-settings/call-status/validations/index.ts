import * as yup from 'yup';

const nameValidation = yup
  .string()
  .trim()
  .required('Name is required')
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must not exceed 100 characters');

const callStatusValidationSchema = yup.object({
  name: nameValidation,
  status: yup.string().required('Please select a status'),
});

export const addCallStatusValidationSchema = callStatusValidationSchema;
export const editCallStatusValidationSchema = callStatusValidationSchema;
