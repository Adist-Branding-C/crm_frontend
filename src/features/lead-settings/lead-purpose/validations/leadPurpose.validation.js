import * as yup from 'yup';
/**
 * Validation schema for adding or editing a lead purpose.
 *
 * Used by:
 * - LeadPurposeForm (add and edit modes)
 *
 * Notes:
 * - title allows letters, digits, spaces, hyphens, underscores, and apostrophes only;
 *   uniqueness is enforced by the backend, not here.
 */
export const leadPurposeValidationSchema = yup.object({
    title: yup
        .string()
        .trim()
        .required('Title is required')
        .min(2, 'Title must be at least 2 characters')
        .max(100, 'Title must not exceed 100 characters')
        .matches(/^[a-zA-Z0-9\s'_-]+$/, 'Title contains invalid characters'),
});
//# sourceMappingURL=leadPurpose.validation.js.map