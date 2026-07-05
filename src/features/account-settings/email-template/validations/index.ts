import * as yup from 'yup';

export const addEmailTemplateValidationSchema = yup.object({
  templateName: yup.string().trim().required('Template name is required'),
  subject: yup.string().trim().required('Subject is required'),
  content: yup.string().trim().required('Content is required'),
  status: yup.string().trim().required('Status is required'),
});

export const editEmailTemplateValidationSchema = yup.object({
  templateName: yup.string().trim().required('Template name is required'),
  subject: yup.string().trim().required('Subject is required'),
  content: yup.string().trim().required('Content is required'),
  status: yup.string().trim().required('Status is required'),
});
