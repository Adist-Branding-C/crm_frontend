export const LEAD_IMPORT_API_ENDPOINTS = {
  CREATE: '/leads/import',
  SAMPLE: '/leads/import/sample',
  HISTORY: '/leads/import-history',
  HISTORY_DETAIL: (importId: string) => `/leads/import-history/${importId}`,
  HISTORY_ENTRIES: (importId: string) => `/leads/import-history/${importId}/entries`,
};
