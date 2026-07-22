import * as yup from 'yup';

// Used by AddWorkModeDrawer when creating a new work mode (account-settings/staff-work-modes).
export const addWorkModeValidationSchema = yup.object({
  // Primary display name for the work mode; required so the table/list never shows a blank entry.
  workModeName: yup.string().trim().required('Work mode name is required'),
  // Optional free-text notes about the work mode; no format constraints needed.
  description: yup.string().trim(),
  // Active/Inactive toggle surfaced via the drawer's status select; required for consistent filtering.
  status: yup.string().required('Status is required'),
});

// Used by AddWorkModeDrawer when editing an existing work mode (account-settings/staff-work-modes).
export const editWorkModeValidationSchema = yup.object({
  // Primary display name for the work mode; required so the table/list never shows a blank entry.
  workModeName: yup.string().trim().required('Work mode name is required'),
  // Optional free-text notes about the work mode; no format constraints needed.
  description: yup.string().trim(),
  // Active/Inactive toggle surfaced via the drawer's status select; required for consistent filtering.
  status: yup.string().required('Status is required'),
});
