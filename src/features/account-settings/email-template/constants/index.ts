import type { EmailTemplateFormData } from '../types';

export const EMAIL_TEMPLATE_FIELD_MAP: Record<string, string> = {
  template_name: 'templateName',
};

export const ADD_EMAIL_TEMPLATE_INITIAL_VALUES: EmailTemplateFormData = {
  templateName: '',
  subject: '',
  content: '',
  status: '',
};

export const EMAIL_TEMPLATE_API_ENDPOINTS = {
  GET_ALL: '/email-template',
  CREATE: '/email-template',
  UPDATE: (id: number) => `/email-template/${id}`,
  DELETE: (id: number) => `/email-template/${id}`,
};
