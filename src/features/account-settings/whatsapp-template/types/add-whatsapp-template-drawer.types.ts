import type { FormikHelpers } from 'formik';
import type { Schema } from 'yup';
import type { WhatsappTemplateFormData } from './whatsapp-template.types';

export interface AddWhatsappTemplateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  validationSchema: Schema<Record<string, unknown>>;
  initialValues: WhatsappTemplateFormData;
  onSubmit: (values: WhatsappTemplateFormData, helpers: FormikHelpers<WhatsappTemplateFormData>) => void | Promise<void>;
  isLoading: boolean;
  error: string;
  isEditing: boolean;
}
