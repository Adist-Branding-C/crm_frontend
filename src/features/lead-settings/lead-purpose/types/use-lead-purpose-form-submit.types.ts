import type { FormikHelpers } from 'formik';
import type { LeadPurposeItem, LeadPurposeFormData } from './interface';

export interface UseLeadPurposeFormSubmitParams {
  editingItem: LeadPurposeItem | null;
  closeDrawer: () => void;
  handleCreateLeadPurpose: (values: LeadPurposeFormData, helpers: FormikHelpers<LeadPurposeFormData>) => Promise<boolean>;
  handleUpdateLeadPurpose: (id: string, values: LeadPurposeFormData, helpers: FormikHelpers<LeadPurposeFormData>) => Promise<boolean>;
}
