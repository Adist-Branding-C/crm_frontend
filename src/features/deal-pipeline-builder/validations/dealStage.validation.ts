import * as yup from 'yup';

/**
 * Validation schema for the add/edit Stage form on the pipeline canvas.
 *
 * Used by:
 * - StageFormDrawer
 *
 * Notes:
 * - probability is a percentage (0-100), matching the backend's @Min/@Max.
 * - color must be a hex value - the picker always produces one, but a form
 *   is still validated independently of its own inputs' constraints.
 */
export const dealStageValidationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  probability: yup
    .number()
    .typeError('Probability must be a number')
    .required('Probability is required')
    .min(0, 'Probability cannot be below 0%')
    .max(100, 'Probability cannot exceed 100%'),
  outcome: yup
    .string()
    .oneOf(['OPEN', 'WON', 'LOST'], 'Select a valid outcome')
    .required('Outcome is required'),
  color: yup
    .string()
    .matches(/^#[0-9A-Fa-f]{6}$/, 'Color must be a hex value')
    .required('Color is required'),
});
