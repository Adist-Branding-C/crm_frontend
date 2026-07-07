import * as yup from 'yup';

// Enforces backend designation-name format/length rules; shared by add/edit designation forms in AddDesignationDrawer (account-settings/designations).
const textValidation = yup
  .string()
  .trim()
  .required('Designation name is required')
  .min(2, 'Designation name must be at least 2 characters')
  .max(200, 'Designation name must not exceed 200 characters')
  .matches(/^[a-zA-Z0-9\s'-]+$/, 'Designation name contains invalid characters');

// Optional free-text field capped to match the backend column size; shared by add/edit designation forms in AddDesignationDrawer.
const descriptionValidation = yup
  .string()
  .trim()
  .max(500, 'Description must not exceed 500 characters');

// Used by AddDesignationDrawer when creating a new designation (account-settings/designations).
export const addDesignationValidationSchema = yup.object({
  designationName: textValidation,
  description: descriptionValidation,
  // Every designation must have an active/inactive status set on create.
  status: yup.string().required('Please select a status'),
});

// Used by AddDesignationDrawer when editing an existing designation (account-settings/designations).
export const editDesignationValidationSchema = yup.object({
  designationName: textValidation,
  description: descriptionValidation,
  // Status remains required on edit too, so a designation can't be left without one.
  status: yup.string().required('Please select a status'),
});
