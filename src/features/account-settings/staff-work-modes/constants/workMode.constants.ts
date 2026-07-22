import type { WorkModeFormData } from '../types/workMode.types';

// Blank Formik initial state for AddWorkModeDrawer's "add" mode (account-settings/staff-work-modes).
export const ADD_WORK_MODE_INITIAL_VALUES: WorkModeFormData = {
  workModeName: '',
  description: '',
  status: '',
};
