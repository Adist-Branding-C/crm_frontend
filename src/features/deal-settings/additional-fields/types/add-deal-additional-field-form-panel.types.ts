import type { FormikHelpers } from 'formik';
import type { DealAdditionalField } from './interface';
import type { DealAdditionalFieldFormData } from './request';

export interface AddDealAdditionalFieldFormPanelProps {
  editingItem: DealAdditionalField | null;
  initialValues: DealAdditionalFieldFormData;
  onSubmit: (values: DealAdditionalFieldFormData, helpers: FormikHelpers<DealAdditionalFieldFormData>) => void;
  isSaving: boolean;
  error: string;
  onClearError: () => void;
  onCancelEdit: () => void;
}
