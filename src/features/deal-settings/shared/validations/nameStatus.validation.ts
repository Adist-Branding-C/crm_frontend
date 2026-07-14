import * as yup from 'yup';

/**
 * Validation schema for the shared {name, status} form shape.
 *
 * Used by:
 * - AddDealTypeDrawer (deal-settings/type)
 *
 * Notes:
 * - Deal type form uses this two-field schema.
 * - Text fields use .trim() to reject whitespace-only input, with min/max length
 *   matching the Campaign module's validation conventions.
 * - Status uses a custom test because Yup's boolean().required() coerces "" to false,
 *   which would incorrectly pass validation when the user hasn't selected anything.
 * - Backend is the source of truth for uniqueness and further business validation.
 */
export const nameStatusValidationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  status: yup
    .mixed()
    .test('is-boolean', 'Status is required', (value) => {
      return value === true || value === false || value === 'true' || value === 'false';
    }),
});
