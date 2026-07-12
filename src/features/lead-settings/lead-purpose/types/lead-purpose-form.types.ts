import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { LeadPurposeFormData } from './interface';

export interface LeadPurposeFormConfig {
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: LeadPurposeFormData;
  onSubmit: (values: LeadPurposeFormData, helpers: FormikHelpers<LeadPurposeFormData>) => void | Promise<void>;
  onCancel: () => void;
  isEditing: boolean;
}

export interface LeadPurposeFormStatus {
  isLoading: boolean;
  error: string;
  onClearError: () => void;
}

export interface LeadPurposeFormProps {
  form: LeadPurposeFormConfig;
  status: LeadPurposeFormStatus;
}
