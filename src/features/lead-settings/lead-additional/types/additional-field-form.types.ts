import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { AdditionalFieldFormData, LeadPurposeOption } from './interface';

export interface AdditionalFieldFormConfig {
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: AdditionalFieldFormData;
  onSubmit: (values: AdditionalFieldFormData, helpers: FormikHelpers<AdditionalFieldFormData>) => void | Promise<void>;
  isEditing: boolean;
  editingFieldName?: string | undefined;
  onCancelEdit?: (() => void) | undefined;
}

export interface AdditionalFieldFormStatus {
  isSaving: boolean;
  error: string | null;
  onClearError: () => void;
}

export interface AdditionalFieldFormProps {
  form: AdditionalFieldFormConfig;
  status: AdditionalFieldFormStatus;
  purposes: LeadPurposeOption[];
}
