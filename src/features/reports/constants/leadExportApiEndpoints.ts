export const LEAD_EXPORT_API_ENDPOINTS = {
  CREATE: '/leads/export',
  HISTORY: '/leads/export-history',
  DETAIL: (exportId: string) => `/leads/export-history/${exportId}`,
  DOWNLOAD: (exportId: string) => `/leads/export-history/${exportId}/download`,
};
