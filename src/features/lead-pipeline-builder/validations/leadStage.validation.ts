import * as yup from 'yup';

/**
 * Validation schema for the add/edit Stage form on the pipeline canvas.
 *
 * Used by:
 * - StageFormDrawer
 */
export const leadStageValidationSchema = yup.object({
  status: yup
    .string()
    .trim()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  color: yup
    .string()
    .trim()
    .required('Color is required')
    .matches(/^#[0-9a-fA-F]{6}$/, 'Color must be a valid hex color'),
  conversion: yup.boolean().required(),
});
