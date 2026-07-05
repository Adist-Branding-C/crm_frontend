import type { WhatsappTemplateFormData } from '../types';

export const WHATSAPP_TEMPLATE_FIELD_MAP: Record<string, string> = {
  template_name: 'templateName',
};

export const ADD_WHATSAPP_TEMPLATE_INITIAL_VALUES: WhatsappTemplateFormData = {
  templateName: '',
  message: '',
  status: '',
};

export const WHATSAPP_TEMPLATE_API_ENDPOINTS = {
  GET_ALL: '/whatsapp-template',
  CREATE: '/whatsapp-template',
  UPDATE: (id: number) => `/whatsapp-template/${id}`,
  DELETE: (id: number) => `/whatsapp-template/${id}`,
};
