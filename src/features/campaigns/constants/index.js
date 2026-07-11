import { getCreatedByLabel } from '../utils/campaign.utils';
/**
 * The two campaign types supported by the backend, used as the canonical
 * `type` field values on both the Campaign entity and create/update payloads.
 *
 * Used by:
 * - CampaignMapper (branches request/form-value mapping on type)
 * - CampaignForm (conditionally renders Lead Campaign vs Data Pool fields)
 * - campaignValidationSchema (conditional field requirements per type)
 */
export const CAMPAIGN_TYPES = {
    LEAD_CAMPAIGN: 'Lead Campaign',
    DATA_POOL: 'Data Pool',
};
/**
 * Dropdown options for the campaign "Type" select field, derived from CAMPAIGN_TYPES.
 *
 * Used by:
 * - CampaignForm's Type select field
 */
export const CAMPAIGN_TYPE_OPTIONS = [
    { value: CAMPAIGN_TYPES.LEAD_CAMPAIGN, label: 'Lead Campaign' },
    { value: CAMPAIGN_TYPES.DATA_POOL, label: 'Data Pool' },
];
/**
 * REST endpoint paths for the Campaign API.
 *
 * Used by:
 * - CampaignApiService, for every request it makes.
 */
export const CAMPAIGN_API_ENDPOINTS = {
    BASE: '/campaigns',
    BY_ID: (id) => `/campaigns/${id}`,
    EXPORT: '/campaigns/export',
    LEADS: (id) => `/campaigns/${id}/leads`,
    ASSIGN: (id) => `/campaigns/${id}/assign`,
};
/**
 * Blank CampaignFormData used to initialize the Add Campaign form, and as the
 * fallback initial values when there is no campaign being edited.
 *
 * Used by:
 * - CampaignsPage (Add Campaign drawer's initialValues)
 * - CampaignMapper.toFormValues (fallback when editingItem is null)
 */
export const ADD_CAMPAIGN_INITIAL_VALUES = {
    type: '',
    name: '',
    startDate: '',
    endDate: '',
    description: '',
    poolName: '',
    poolAgents: [],
    agents: [],
};
/**
 * Column definitions for the campaigns CSV export - one shared CsvColumn per
 * exported field, in export order.
 *
 * Used by:
 * - useCampaignExport (passed to the shared exportToCsv helper)
 */
export const CAMPAIGN_CSV_COLUMNS = [
    { header: 'Sl No', value: (c) => c.slNo },
    { header: 'Name', value: (c) => `"${c.name}"` },
    { header: 'Type', value: (c) => c.type },
    { header: 'Total Tasks', value: (c) => c.totalTasks },
    { header: 'Completed Tasks', value: (c) => c.completedTasks },
    { header: 'Completed %', value: (c) => `${c.completedPercent}%` },
    { header: 'Created By', value: (c) => getCreatedByLabel(c.createdBy) },
    { header: 'Created At', value: (c) => c.createdAt },
];
//# sourceMappingURL=index.js.map