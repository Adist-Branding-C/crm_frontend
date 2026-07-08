import type { CampaignFormData } from '../types';

// ─── Campaign type constants ───
export const CAMPAIGN_TYPES = {
  LEAD_CAMPAIGN: 'Lead Campaign',
  DATA_POOL: 'Data Pool',
} as const;

export const CAMPAIGN_TYPE_OPTIONS = [
  { value: CAMPAIGN_TYPES.LEAD_CAMPAIGN, label: 'Lead Campaign' },
  { value: CAMPAIGN_TYPES.DATA_POOL, label: 'Data Pool' },
];

// ─── API endpoints ───
export const CAMPAIGN_API_ENDPOINTS = {
  BASE: '/campaigns',
  BY_ID: (id: string) => `/campaigns/${id}`,
  EXPORT: '/campaigns/export',
  LEADS: (id: string) => `/campaigns/${id}/leads`,
  ASSIGN: (id: string) => `/campaigns/${id}/assign`,
};

// ─── Initial form values ───
export const ADD_CAMPAIGN_INITIAL_VALUES: CampaignFormData = {
  type: '',
  name: '',
  startDate: '',
  endDate: '',
  description: '',
  poolName: '',
  poolAgents: [],
  agents: [],
};

export { ADD_CAMPAIGN_INITIAL_VALUES as INITIAL_CAMPAIGN_FORM_DATA };
