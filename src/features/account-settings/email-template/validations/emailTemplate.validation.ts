import * as yup from 'yup';

const templateNameValidation = yup
  .string()
  .trim()
  .required('Template name is required')
  .min(2, 'Template name must be at least 2 characters')
  .max(200, 'Template name must not exceed 200 characters')
  .matches(/^[a-zA-Z0-9\s'-]+$/, 'Template name contains invalid characters');

const subjectValidation = yup
  .string()
  .trim()
  .required('Subject is required')
  .min(2, 'Subject must be at least 2 characters')
  .max(255, 'Subject must not exceed 255 characters')
  .matches(/^[a-zA-Z0-9\s'-]+$/, 'Subject contains invalid characters');

const contentValidation = yup
  .string()
  .trim()
  .required('Content is required')
  .min(5, 'Content must be at least 5 characters')
  .max(5000, 'Content must not exceed 5000 characters');

export const addEmailTemplateValidationSchema = yup.object({
  templateName: templateNameValidation,
  subject: subjectValidation,
  content: contentValidation,
  status: yup.string().required('Please select a status'),
});

export const editEmailTemplateValidationSchema = yup.object({
  templateName: templateNameValidation,
  subject: subjectValidation,
  content: contentValidation,
  status: yup.string().required('Please select a status'),
});
