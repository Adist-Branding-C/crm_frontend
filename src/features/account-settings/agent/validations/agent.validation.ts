import * as yup from 'yup';

// Indian mobile format (starts 6-9, 10 digits) required by the backend staff phone column; shared by add/edit staff forms in AddAgentDrawer.
const phoneValidation = yup
  .string()
  .required('Phone number is required')
  .test('digits-only', 'Only numbers are allowed', (value) => {
    if (!value) return true;
    return /^\d*$/.test(value);
  })
  .test('start-digit', 'Phone number must start with 6, 7, 8, or 9', (value) => {
    if (!value) return true;
    return /^[6-9]/.test(value);
  })
  .test('length', 'Phone number must be exactly 10 digits', (value) => {
    if (!value) return true;
    return value.length === 10;
  });

// Blocks digits/special chars beyond hyphen/apostrophe in staff display names; used by add/edit staff forms in AddAgentDrawer.
const nameValidation = yup
  .string()
  .trim()
  .required('Name is required')
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must not exceed 100 characters')
  .matches(/^[a-zA-Z\s'-]+$/, 'Name contains invalid characters');

// Capped to match the backend staff email column (varchar(255)); shared by add/edit staff forms in AddAgentDrawer.
const emailValidation = yup
  .string()
  .trim()
  .email('Enter a valid email address')
  .max(255, 'Email must not exceed 255 characters')
  .required('Email is required');

/**
 * Validation schema for creating a new staff member.
 *
 * Used by:
 * - AddAgentDrawer (create / "Add Staff" mode)
 *
 * Notes:
 * - email format is checked here only; uniqueness per staff record is enforced by the backend.
 * - password requires only a 6-character minimum, with no complexity rule, mirroring the backend
 *   AddStaffDto/UpdateStaffDto (@MinLength(6)) — deliberately looser than the strong-password rule
 *   used for self-service password change/reset.
 * - confirmPassword guards against typos when setting a new staff member's initial password.
 * - designationId is required so the staff member can be looked up by permission/role elsewhere in the app.
 */
export const addAgentValidationSchema = yup.object({
  fullName: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords do not match').required('Confirm password is required'),
  designationId: yup.string().required('Please select a designation'),
  departmentId: yup.string().required('Please select a department'),
  status: yup.string().required('Please select a status'),
  isAdmin: yup.boolean().default(false),
});

/**
 * Validation schema for editing an existing staff member.
 *
 * Used by:
 * - AddAgentDrawer (edit mode)
 *
 * Notes:
 * - Same field rules as addAgentValidationSchema, except password/confirmPassword are optional
 *   since editing an existing staff member doesn't require resetting credentials - left blank,
 *   the staff member's current password is unchanged (see useAgentCrud.handleUpdateAgent, which
 *   omits password from the update payload when blank). If a password IS entered, it must meet
 *   the same 6-character minimum and be confirmed, same as at creation.
 * - email format is checked here only; uniqueness per staff record is enforced by the backend.
 */
export const editAgentValidationSchema = yup.object({
  fullName: nameValidation,
  email: emailValidation,
  phone: phoneValidation,
  password: yup.string().notRequired().test(
    'min-length-if-present',
    'Password must be at least 6 characters',
    (value) => !value || value.length >= 6,
  ),
  confirmPassword: yup.string().notRequired().test(
    'matches-if-present',
    'Passwords do not match',
    (value, context) => !context.parent.password || value === context.parent.password,
  ),
  designationId: yup.string().required('Please select a designation'),
  departmentId: yup.string().required('Please select a department'),
  status: yup.string().required('Please select a status'),
});
