import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { LeadSourceFormData } from './interface';

export interface LeadSourceFormConfig {
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: LeadSourceFormData;
  onSubmit: (values: LeadSourceFormData, helpers: FormikHelpers<LeadSourceFormData>) => void | Promise<void>;
  onCancel: () => void;
  isEditing: boolean;
}

export interface LeadSourceFormStatus {
  isLoading: boolean;
  error: string;
  onClearError: () => void;
}

export interface LeadSourceFormProps {
  form: LeadSourceFormConfig;
  status: LeadSourceFormStatus;
}
