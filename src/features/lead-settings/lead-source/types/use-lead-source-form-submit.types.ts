import type { FormikHelpers } from 'formik';
import type { LeadSourceItem, LeadSourceFormData } from './interface';

export interface UseLeadSourceFormSubmitParams {
  editingItem: LeadSourceItem | null;
  closeDrawer: () => void;
  handleCreateLeadSource: (values: LeadSourceFormData, helpers: FormikHelpers<LeadSourceFormData>) => Promise<boolean>;
  handleUpdateLeadSource: (id: string, values: LeadSourceFormData, helpers: FormikHelpers<LeadSourceFormData>) => Promise<boolean>;
}
