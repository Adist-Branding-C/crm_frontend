export const DEAL_API_ENDPOINTS = {
  GET_ALL: '/deals',
  GET_BY_ID: (dealId: string) => `/deals/${dealId}`,
  CREATE: '/deals',
  UPDATE: (dealId: string) => `/deals/${dealId}`,
  DELETE: (dealId: string) => `/deals/${dealId}`,
  GET_STAGES: '/deals/stages',
  GET_DROPDOWN: '/deals/dropdown',
  EXPORT: '/deals/export',
};
