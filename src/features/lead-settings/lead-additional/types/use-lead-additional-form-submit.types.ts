import type { FormikHelpers } from 'formik';
import type { LeadAdditionalItem, AdditionalFieldFormData } from './interface';

export interface UseLeadAdditionalFormSubmitParams {
  editingItem: LeadAdditionalItem | null;
  closeDrawer: () => void;
  handleCreateAdditionalField: (values: AdditionalFieldFormData, helpers: FormikHelpers<AdditionalFieldFormData>) => Promise<boolean>;
  handleUpdateAdditionalField: (id: string, values: AdditionalFieldFormData, helpers: FormikHelpers<AdditionalFieldFormData>) => Promise<boolean>;
}
