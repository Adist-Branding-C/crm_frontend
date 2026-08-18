export const FACEBOOK_API_ENDPOINTS = {
  OAUTH_CALLBACK: '/facebook/oauth/callback',
  CONNECTIONS: '/facebook/connections',
  CONNECTION_PAGES: (connectionId: string) => `/facebook/connections/${connectionId}/pages`,
  PAGE_FORMS: (pageId: string) => `/facebook/pages/${pageId}/forms`,
  MAPPING_OPTIONS: '/facebook/mapping-options',
  WORKFLOWS: '/facebook/workflows',
  WORKFLOW_BY_ID: (id: string) => `/facebook/workflows/${id}`,
  LEADS: '/facebook/leads',
  LEAD_BY_ID: (id: string) => `/facebook/leads/${id}`,
};
