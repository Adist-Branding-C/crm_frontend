import type { FormikHelpers } from 'formik';
import type { WorkModeItem, WorkModeFormData } from './workMode.types';

export interface UseWorkModeActionsParams {
  workMode: {
    handleAddWorkMode: (values: WorkModeFormData, helpers: FormikHelpers<WorkModeFormData>) => Promise<boolean>;
    handleUpdateWorkMode: (id: number, values: WorkModeFormData, helpers: FormikHelpers<WorkModeFormData>) => Promise<boolean>;
    handleDeleteWorkMode: (id: number) => Promise<boolean>;
  };
  drawer: {
    editingItem: WorkModeItem | null;
    closeDrawer: () => void;
  };
}
