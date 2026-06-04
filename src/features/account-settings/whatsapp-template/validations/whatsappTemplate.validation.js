import * as yup from 'yup';

export const addWhatsappTemplateValidationSchema = yup.object({
  templateName: yup.string().trim().required('Template name is required'),
  message: yup.string().trim().required('Message is required'),
  status: yup.string().required('Status is required'),
});
