import type { FormikHelpers } from 'formik';
import type { DesignationItem, DesignationFormData } from './designation.types';

export interface UseDesignationActionsParams {
  designation: {
    handleAddDesignation: (values: DesignationFormData, helpers: FormikHelpers<DesignationFormData>) => Promise<boolean>;
    handleUpdateDesignation: (id: number, values: DesignationFormData, helpers: FormikHelpers<DesignationFormData>) => Promise<boolean>;
    handleDeleteDesignation: (id: number) => Promise<boolean>;
  };
  drawer: {
    editingItem: DesignationItem | null;
    closeDrawer: () => void;
  };
}
