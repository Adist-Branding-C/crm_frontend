import type { FormikHelpers } from 'formik';
import type { CallTaskItem } from './entity';
import type { CallTaskFormData } from './request';

export interface UseCallTaskFormSubmitParams {
  editingItem: CallTaskItem | null;
  closeDrawer: () => void;
  handleAddCallTask: (values: CallTaskFormData, helpers: FormikHelpers<CallTaskFormData>) => Promise<boolean>;
  handleUpdateCallTask: (id: number, values: CallTaskFormData, helpers: FormikHelpers<CallTaskFormData>) => Promise<boolean>;
}
