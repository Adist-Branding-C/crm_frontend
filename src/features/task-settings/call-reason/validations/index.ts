import * as yup from 'yup';

const nameValidation = yup
  .string()
  .trim()
  .required('Reason is required')
  .min(2, 'Reason must be at least 2 characters')
  .max(100, 'Reason must not exceed 100 characters');

/**
 * Validation schema for creating and editing a call reason.
 *
 * Used by:
 * - CallReasonForm (call-reason add/edit drawer)
 *
 * Notes:
 * - The same schema is reused for both add and edit modes; no field differs between them.
 * - Checks format and required-ness only; the backend re-validates on submit.
 */
const callReasonValidationSchema = yup.object({
  name: nameValidation,
  status: yup.string().required('Please select a status'),
});

export const addCallReasonValidationSchema = callReasonValidationSchema;
export const editCallReasonValidationSchema = callReasonValidationSchema;
