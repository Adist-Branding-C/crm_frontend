import type { EmailTemplateFormData } from '../types/emailTemplate.types';

// Blank Formik initial state for AddEmailTemplateDrawer's "add" mode (account-settings/email-template).
export const ADD_EMAIL_TEMPLATE_INITIAL_VALUES: EmailTemplateFormData = {
  templateName: '',
  subject: '',
  content: '',
  status: '',
};
