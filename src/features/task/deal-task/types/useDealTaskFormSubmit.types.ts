import type { FormikHelpers } from 'formik';
import type { DealTaskItem } from './entity';
import type { DealTaskFormData } from './request';

export interface UseDealTaskFormSubmitParams {
  editingItem: DealTaskItem | null;
  closeDrawer: () => void;
  handleAddDealTask: (values: DealTaskFormData, helpers: FormikHelpers<DealTaskFormData>) => Promise<boolean>;
  handleUpdateDealTask: (id: number, values: DealTaskFormData, helpers: FormikHelpers<DealTaskFormData>) => Promise<boolean>;
}
