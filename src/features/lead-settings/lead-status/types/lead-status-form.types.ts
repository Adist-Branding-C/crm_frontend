import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { LeadStatusFormData } from './interface';

export interface LeadStatusFormConfig {
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: LeadStatusFormData;
  onSubmit: (values: LeadStatusFormData, helpers: FormikHelpers<LeadStatusFormData>) => void | Promise<void>;
  onCancel: () => void;
  isEditing: boolean;
}

export interface LeadStatusFormStatus {
  isLoading: boolean;
  error: string;
  onClearError: () => void;
}

export interface LeadStatusFormProps {
  form: LeadStatusFormConfig;
  status: LeadStatusFormStatus;
}
