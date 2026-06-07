import type { FormikHelpers } from 'formik';
import type { DepartmentItem, DepartmentFormData } from './department.types';

export interface UseDepartmentActionsParams {
  department: {
    handleAddDepartment: (values: DepartmentFormData, helpers: FormikHelpers<DepartmentFormData>) => Promise<boolean>;
    handleUpdateDepartment: (id: number, values: DepartmentFormData, helpers: FormikHelpers<DepartmentFormData>) => Promise<boolean>;
    handleDeleteDepartment: (id: number) => Promise<boolean>;
  };
  drawer: {
    editingItem: DepartmentItem | null;
    closeDrawer: () => void;
  };
}
