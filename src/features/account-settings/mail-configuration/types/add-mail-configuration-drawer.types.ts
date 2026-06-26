import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { MailConfigFormData } from './mailConfiguration.types';

export interface AddMailConfigurationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: MailConfigFormData;
  onSubmit: (values: MailConfigFormData, helpers: FormikHelpers<MailConfigFormData>) => void | Promise<void>;
  isLoading: boolean;
  error: string;
  isEditing: boolean;
}
