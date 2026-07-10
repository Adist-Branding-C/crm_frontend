import type { FormikHelpers } from 'formik';
import type { LeadTypeItem, LeadTypeFormData } from './interface';

export interface UseLeadTypeFormSubmitParams {
  editingItem: LeadTypeItem | null;
  closeDrawer: () => void;
  handleCreateLeadType: (values: LeadTypeFormData, helpers: FormikHelpers<LeadTypeFormData>) => Promise<boolean>;
  handleUpdateLeadType: (id: string, values: LeadTypeFormData, helpers: FormikHelpers<LeadTypeFormData>) => Promise<boolean>;
}
