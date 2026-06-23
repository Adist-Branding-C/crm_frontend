export const CAMPAIGN_API_ENDPOINTS = {
  BASE: '/campaigns',
  BY_ID: (id: string) => `/campaigns/${id}`,
  EXPORT: '/campaigns/export',
  LEADS: (id: string) => `/campaigns/${id}/leads`,
  ASSIGN: (id: string) => `/campaigns/${id}/assign`,
};

export const STAFF_API_ENDPOINTS = {
  AGENTS: '/staff',
};
