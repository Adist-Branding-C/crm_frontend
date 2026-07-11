import * as yup from 'yup';
// Shared department-name rule for both add/edit forms in AddDepartmentDrawer (account-settings/department).
const textValidation = yup
    .string()
    .trim()
    .required('Department name is required')
    .min(2, 'Department name must be at least 2 characters')
    .max(200, 'Department name must not exceed 200 characters')
    .matches(/^[a-zA-Z0-9\s'-]+$/, 'Department name contains invalid characters');
// Optional free-text field capped to match the backend department description column; used by add/edit forms in AddDepartmentDrawer.
const descriptionValidation = yup
    .string()
    .trim()
    .max(500, 'Description must not exceed 500 characters');
// Used by AddDepartmentDrawer when creating a new department (account-settings/department).
export const addDepartmentValidationSchema = yup.object({
    departmentName: textValidation,
    description: descriptionValidation,
    // Every department must have an active/inactive status set on creation.
    status: yup.string().required('Please select a status'),
});
// Used by AddDepartmentDrawer when editing an existing department (account-settings/department).
export const editDepartmentValidationSchema = yup.object({
    departmentName: textValidation,
    description: descriptionValidation,
    // Status is still mandatory on edit; departments can't be left without a status.
    status: yup.string().required('Please select a status'),
});
//# sourceMappingURL=department.validation.js.map