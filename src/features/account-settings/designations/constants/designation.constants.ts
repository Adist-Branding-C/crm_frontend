import type { DesignationFormData } from '../types/designation.types';

// Blank Formik initial state for AddDesignationDrawer's "add" mode (account-settings/designations).
export const ADD_DESIGNATION_INITIAL_VALUES: DesignationFormData = {
  designationName: '',
  description: '',
  status: '',
};
