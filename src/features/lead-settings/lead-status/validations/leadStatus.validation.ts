import * as yup from 'yup';

/**
 * Validation schema for adding or editing a lead status.
 *
 * Used by:
 * - LeadStatusForm (add and edit modes)
 *
 * Notes:
 * - status is only checked for required/min-length/max-length and trimmed of
 *   surrounding whitespace; all standard characters are allowed. Uniqueness is
 *   enforced by the backend, not here.
 * - color must be a valid hex color string; the input is a browser color picker so this
 *   mainly guards against a manually-crafted value.
 */
export const leadStatusValidationSchema = yup.object({
  status: yup
    .string()
    .trim()
    .required('Status is required')
    .min(2, 'Status must be at least 2 characters')
    .max(100, 'Status must not exceed 100 characters'),
  color: yup
    .string()
    .trim()
    .required('Color is required')
    .matches(/^#[0-9a-fA-F]{6}$/, 'Color must be a valid hex color'),
  useForConversion: yup.boolean().required(),
});
