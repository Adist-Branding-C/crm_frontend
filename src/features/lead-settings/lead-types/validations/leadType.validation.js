import * as yup from 'yup';
/**
 * Validation schema for adding or editing a lead type.
 *
 * Used by:
 * - LeadTypeForm (add and edit modes)
 *
 * Notes:
 * - type allows letters, digits, spaces, hyphens, underscores, and apostrophes only;
 *   uniqueness is enforced by the backend, not here.
 */
export const leadTypeValidationSchema = yup.object({
    type: yup
        .string()
        .trim()
        .required('Lead type is required')
        .min(2, 'Lead type must be at least 2 characters')
        .max(100, 'Lead type must not exceed 100 characters')
        .matches(/^[a-zA-Z0-9\s'_-]+$/, 'Lead type contains invalid characters'),
});
//# sourceMappingURL=leadType.validation.js.map