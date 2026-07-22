import * as yup from 'yup';

// Enforces a sane display name for the template list/table; used by add/edit forms in AddWhatsappTemplateDrawer (account-settings/whatsapp-template).
const templateNameValidation = yup
  .string()
  .trim()
  .required('Template name is required')
  .min(2, 'Template name must be at least 2 characters')
  .max(200, 'Template name must not exceed 200 characters')
  .matches(/^[a-zA-Z0-9\s'-]+$/, 'Template name contains invalid characters');

// Bounds the WhatsApp message body length sent to the backend; used by add/edit forms in AddWhatsappTemplateDrawer.
const messageValidation = yup
  .string()
  .trim()
  .required('Message is required')
  .min(5, 'Message must be at least 5 characters')
  .max(5000, 'Message must not exceed 5000 characters');

// Used by AddWhatsappTemplateDrawer when creating a new WhatsApp template (account-settings/whatsapp-template).
export const addWhatsappTemplateValidationSchema = yup.object({
  templateName: templateNameValidation,
  message: messageValidation,
  // Template must be Active/Inactive so it can be filtered/toggled elsewhere in the app.
  status: yup.string().required('Please select a status'),
});

// Used by AddWhatsappTemplateDrawer when editing an existing WhatsApp template (account-settings/whatsapp-template).
export const editWhatsappTemplateValidationSchema = yup.object({
  templateName: templateNameValidation,
  message: messageValidation,
  status: yup.string().required('Please select a status'),
});
