import * as yup from 'yup';

/**
 * Validation schema for adding or editing a lead source.
 *
 * Used by:
 * - LeadSourceForm (add and edit modes)
 *
 * Notes:
 * - source allows letters, digits, spaces, hyphens, and apostrophes only; uniqueness is
 *   enforced by the backend, not here.
 */
export const leadSourceValidationSchema = yup.object({
  source: yup
    .string()
    .trim()
    .required('Source is required')
    .min(2, 'Source must be at least 2 characters')
    .max(100, 'Source must not exceed 100 characters')
    .matches(/^[a-zA-Z0-9\s'-]+$/, 'Source contains invalid characters'),
});
