import * as yup from 'yup';

const templateNameValidation = yup
  .string()
  .trim()
  .required('Template name is required')
  .min(2, 'Template name must be at least 2 characters')
  .max(200, 'Template name must not exceed 200 characters')
  .matches(/^[a-zA-Z0-9\s'-]+$/, 'Template name contains invalid characters');

const messageValidation = yup
  .string()
  .trim()
  .required('Message is required')
  .min(5, 'Message must be at least 5 characters')
  .max(5000, 'Message must not exceed 5000 characters');

export const addWhatsappTemplateValidationSchema = yup.object({
  templateName: templateNameValidation,
  message: messageValidation,
  status: yup.string().required('Please select a status'),
});

export const editWhatsappTemplateValidationSchema = yup.object({
  templateName: templateNameValidation,
  message: messageValidation,
  status: yup.string().required('Please select a status'),
});
