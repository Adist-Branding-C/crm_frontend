import * as yup from 'yup';

// Shared role-name rule for both add/edit forms in AddRoleDrawer (account-settings/roles).
// "Unique" is enforced by the backend on submit; it can't be known client-side without a list round-trip.
const roleNameValidation = yup
  .string()
  .trim()
  .required('Role name is required')
  .min(2, 'Role name must be at least 2 characters')
  .max(100, 'Role name must not exceed 100 characters')
  .matches(/^[a-zA-Z0-9\s'-]+$/, 'Role name contains invalid characters');

/**
 * Validation schema for the role add/edit drawer (account-settings/roles AddRoleDrawer).
 *
 * Used by:
 * - AddRoleDrawer in both "Add" and "Edit" mode (the RolePage select switches on editingItem).
 *
 * Notes:
 * - Mirrors backend field requirements (role name length/character set).
 * - Backend performs uniqueness validation; the frontend only validates format here.
 * - permissions is a loose object: the "at least one permission selected" rule is enforced in
 *   useRole (blocking submit) rather than in Yup, because Yup's shape can't be expressed without
 *   dynamically enumerating MODULES.
 */
export const roleValidationSchema = yup.object({
  roleName: roleNameValidation,
  permissions: yup.object(),
});
