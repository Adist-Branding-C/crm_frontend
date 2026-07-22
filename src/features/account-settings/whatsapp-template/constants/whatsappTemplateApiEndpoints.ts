// WhatsApp template CRUD routes consumed by whatsappTemplate.service.ts (account-settings/whatsapp-template tab).
export const WHATSAPP_TEMPLATE_API_ENDPOINTS = {
  GET_ALL: '/whatsapp-template',
  CREATE: '/whatsapp-template',
  UPDATE: (id: number) => `/whatsapp-template/${id}`,
  DELETE: (id: number) => `/whatsapp-template/${id}`,
};
