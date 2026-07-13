import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { LeadTypeFormData } from './interface';

export interface LeadTypeFormConfig {
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: LeadTypeFormData;
  onSubmit: (values: LeadTypeFormData, helpers: FormikHelpers<LeadTypeFormData>) => void | Promise<void>;
  onCancel: () => void;
  isEditing: boolean;
}

export interface LeadTypeFormStatus {
  isLoading: boolean;
  error: string;
  onClearError: () => void;
}

export interface LeadTypeFormProps {
  form: LeadTypeFormConfig;
  status: LeadTypeFormStatus;
}
