import * as yup from 'yup';

const nameValidation = yup
  .string()
  .trim()
  .required('Reason is required')
  .min(2, 'Reason must be at least 2 characters')
  .max(100, 'Reason must not exceed 100 characters');

const callReasonValidationSchema = yup.object({
  name: nameValidation,
  status: yup.string().required('Please select a status'),
});

export const addCallReasonValidationSchema = callReasonValidationSchema;
export const editCallReasonValidationSchema = callReasonValidationSchema;
