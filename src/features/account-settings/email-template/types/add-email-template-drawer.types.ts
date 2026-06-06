import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { EmailTemplateFormData } from './emailTemplate.types';

export interface AddEmailTemplateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: EmailTemplateFormData;
  onSubmit: (values: EmailTemplateFormData, helpers: FormikHelpers<EmailTemplateFormData>) => void | Promise<void>;
  isLoading: boolean;
  error: string;
  isEditing: boolean;
}
