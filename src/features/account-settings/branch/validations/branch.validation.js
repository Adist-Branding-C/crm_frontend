import * as yup from 'yup';
const nameValidation = yup
    .string()
    .trim()
    .required('Branch name is required')
    .min(2, 'Branch name must be at least 2 characters')
    .max(200, 'Branch name must not exceed 200 characters')
    .matches(/^[a-zA-Z0-9\s'-]+$/, 'Branch name contains invalid characters');
const descriptionValidation = yup
    .string()
    .trim()
    .max(500, 'Description must not exceed 500 characters');
/**
 * Validation schema for creating a new branch.
 *
 * Used by:
 * - AddBranchDrawer (create / "Add Branch" mode)
 *
 * Notes:
 * - name allows letters, digits, spaces, hyphens, and apostrophes only; uniqueness per branch
 *   name is enforced by the backend, not here.
 * - description is optional free text, capped to match the backend column length.
 */
export const addBranchValidationSchema = yup.object({
    name: nameValidation,
    description: descriptionValidation,
    status: yup.string().required('Please select a status'),
});
/**
 * Validation schema for editing an existing branch.
 *
 * Used by:
 * - AddBranchDrawer (edit mode)
 *
 * Notes:
 * - Same field rules as addBranchValidationSchema; branch records have no credential/password
 *   fields to relax in edit mode, unlike staff.
 */
export const editBranchValidationSchema = yup.object({
    name: nameValidation,
    description: descriptionValidation,
    status: yup.string().required('Please select a status'),
});
//# sourceMappingURL=branch.validation.js.map