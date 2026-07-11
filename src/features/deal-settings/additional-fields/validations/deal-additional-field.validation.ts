import * as yup from 'yup';

/**
 * Validation schema for adding/editing a deal additional field.
 *
 * Used by:
 * - DealAdditionalFieldFormPanel (deal-settings/additional-fields)
 *
 * Notes:
 * - Text fields use .trim() to reject whitespace-only input, with min/max length
 *   matching the Campaign module's validation conventions.
 * - Backend is the source of truth for uniqueness and further business validation.
 */
export const dealAdditionalFieldValidationSchema = yup.object({
  fieldName: yup
    .string()
    .trim()
    .required('Field name is required')
    .min(2, 'Field name must be at least 2 characters')
    .max(100, 'Field name must not exceed 100 characters'),
  fieldType: yup.string().required('Field type is required'),
});
