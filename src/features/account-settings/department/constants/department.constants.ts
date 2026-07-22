import type { DepartmentFormData } from '../types/department.types';

// Blank Formik initial state for AddDepartmentDrawer's "add" mode (account-settings/department).
export const ADD_DEPARTMENT_INITIAL_VALUES: DepartmentFormData = {
  departmentName: '',
  description: '',
  status: '',
};
