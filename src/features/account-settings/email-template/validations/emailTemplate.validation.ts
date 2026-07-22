import * as yup from 'yup';

// Restricts template names to alphanumerics/spaces/hyphen/apostrophe; used by add/edit email template forms in AddEmailTemplateDrawer.
const templateNameValidation = yup
  .string()
  .trim()
  .required('Template name is required')
  .min(2, 'Template name must be at least 2 characters')
  .max(200, 'Template name must not exceed 200 characters')
  .matches(/^[a-zA-Z0-9\s'-]+$/, 'Template name contains invalid characters');

// Bounds the email subject length; no character-format restriction since real subject lines
// legitimately use punctuation (e.g. "Welcome to our service!") - used by add/edit email
// template forms in AddEmailTemplateDrawer.
const subjectValidation = yup
  .string()
  .trim()
  .required('Subject is required')
  .min(2, 'Subject must be at least 2 characters')
  .max(255, 'Subject must not exceed 255 characters');

// Bounds the template body length to keep payloads reasonable; used by add/edit email template forms in AddEmailTemplateDrawer.
const contentValidation = yup
  .string()
  .trim()
  .required('Content is required')
  .min(5, 'Content must be at least 5 characters')
  .max(5000, 'Content must not exceed 5000 characters');

// Used by AddEmailTemplateDrawer when creating a new email template (account-settings/email-template).
export const addEmailTemplateValidationSchema = yup.object({
  templateName: templateNameValidation,
  subject: subjectValidation,
  content: contentValidation,
  // Templates must be explicitly marked Active/Inactive so the sender UI can filter usable templates.
  status: yup.string().required('Please select a status'),
});

// Used by AddEmailTemplateDrawer when editing an existing email template (account-settings/email-template).
export const editEmailTemplateValidationSchema = yup.object({
  templateName: templateNameValidation,
  subject: subjectValidation,
  content: contentValidation,
  status: yup.string().required('Please select a status'),
});
