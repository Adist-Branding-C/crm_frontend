import * as yup from 'yup';

const nameValidation = yup
  .string()
  .trim()
  .required('Name is required')
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must not exceed 100 characters');

/**
 * Validation schema for creating and editing a call status.
 *
 * Used by:
 * - CallStatusForm (call-status add/edit drawer)
 *
 * Notes:
 * - The same schema is reused for both add and edit modes; no field differs between them.
 * - Checks format and required-ness only; the backend re-validates on submit.
 */
const callStatusValidationSchema = yup.object({
  name: nameValidation,
  status: yup.string().required('Please select a status'),
});

export const addCallStatusValidationSchema = callStatusValidationSchema;
export const editCallStatusValidationSchema = callStatusValidationSchema;
