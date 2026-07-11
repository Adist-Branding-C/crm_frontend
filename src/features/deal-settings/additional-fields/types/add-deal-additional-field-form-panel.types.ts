import type { FormikHelpers } from 'formik';
import type { DealAdditionalField } from './interface';
import type { DealAdditionalFieldFormData } from './request';

export interface AddDealAdditionalFieldFormPanelProps {
  initialValues: DealAdditionalFieldFormData;
  editingItem: DealAdditionalField | null;
  onSubmit: (values: DealAdditionalFieldFormData, helpers: FormikHelpers<DealAdditionalFieldFormData>) => void | Promise<void>;
}
