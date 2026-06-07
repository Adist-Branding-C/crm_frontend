import type { FormikHelpers } from 'formik';
import type { BranchItem, BranchFormData } from './branch.types';

export interface UseBranchActionsParams {
  branch: {
    handleAddBranch: (values: BranchFormData, helpers: FormikHelpers<BranchFormData>) => Promise<boolean>;
    handleUpdateBranch: (id: number, values: BranchFormData, helpers: FormikHelpers<BranchFormData>) => Promise<boolean>;
    handleDeleteBranch: (id: number) => Promise<boolean>;
  };
  drawer: {
    editingItem: BranchItem | null;
    closeDrawer: () => void;
  };
}
