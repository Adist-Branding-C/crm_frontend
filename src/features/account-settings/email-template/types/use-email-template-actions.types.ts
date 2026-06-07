import type { FormikHelpers } from 'formik';
import type { EmailTemplateItem, EmailTemplateFormData } from './emailTemplate.types';

export interface UseEmailTemplateActionsParams {
  emailTemplate: {
    handleAddEmailTemplate: (values: EmailTemplateFormData, helpers: FormikHelpers<EmailTemplateFormData>) => Promise<boolean>;
    handleUpdateEmailTemplate: (id: number, values: EmailTemplateFormData, helpers: FormikHelpers<EmailTemplateFormData>) => Promise<boolean>;
    handleDeleteEmailTemplate: (id: number) => Promise<boolean>;
  };
  drawer: {
    editingItem: EmailTemplateItem | null;
    closeDrawer: () => void;
  };
}
