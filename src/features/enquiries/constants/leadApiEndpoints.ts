export const LEADS_API_ENDPOINTS = {
  LIST: '/leads',
  GET: (id: string) => `/leads/${id}`,
  CREATE: '/leads',
  UPDATE: (id: string) => `/leads/${id}`,
  DELETE: (id: string) => `/leads/${id}`,
  EXPORT: '/leads/export',
  EXPORT_CUSTOM: '/leads/export/custom',
};
