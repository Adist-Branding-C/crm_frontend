import * as yup from 'yup';

/**
 * Validation schema for adding or editing a lead purpose.
 *
 * Used by:
 * - LeadPurposeForm (add and edit modes)
 *
 * Notes:
 * - title is only checked for required/min-length/max-length and trimmed of
 *   surrounding whitespace; all standard characters are allowed. Uniqueness is
 *   enforced by the backend, not here.
 */
export const leadPurposeValidationSchema = yup.object({
  title: yup
    .string()
    .trim()
    .required('Title is required')
    .min(2, 'Title must be at least 2 characters')
    .max(100, 'Title must not exceed 100 characters'),
});
