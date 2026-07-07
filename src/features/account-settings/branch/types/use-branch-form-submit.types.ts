import type { FormikHelpers } from 'formik';
import type { BranchItem, BranchFormData } from './branch.types';

export interface UseBranchFormSubmitParams {
  editingItem: BranchItem | null;
  closeDrawer: () => void;
  handleAddBranch: (values: BranchFormData, helpers: FormikHelpers<BranchFormData>) => Promise<boolean>;
  handleUpdateBranch: (id: number, values: BranchFormData, helpers: FormikHelpers<BranchFormData>) => Promise<boolean>;
}
