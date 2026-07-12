import type { FormikHelpers } from 'formik';
import type { LeadStatusItem, LeadStatusFormData } from './interface';

export interface UseLeadStatusFormSubmitParams {
  editingItem: LeadStatusItem | null;
  closeDrawer: () => void;
  handleCreateLeadStatus: (values: LeadStatusFormData, helpers: FormikHelpers<LeadStatusFormData>) => Promise<boolean>;
  handleUpdateLeadStatus: (id: string, values: LeadStatusFormData, helpers: FormikHelpers<LeadStatusFormData>) => Promise<boolean>;
}
