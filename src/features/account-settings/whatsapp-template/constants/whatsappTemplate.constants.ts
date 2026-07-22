import type { WhatsappTemplateFormData } from '../types/whatsapp-template.types';

// Blank Formik initial state for AddWhatsappTemplateDrawer's "add" mode (account-settings/whatsapp-template).
export const ADD_WHATSAPP_TEMPLATE_INITIAL_VALUES: WhatsappTemplateFormData = {
  templateName: '',
  message: '',
  status: '',
};
