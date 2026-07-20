import { getCreatedByLabel, getPoolAgentsLabel } from '../utils/campaign.utils';
import type { CampaignFormData, Campaign } from '../types';
import type { CsvColumn } from '../../../shared/types/csv';
import type { FieldErrorMap, FieldErrorFallback } from '../../../shared/types/formFieldError.types';

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
} as const;

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
  BY_ID: (id: string) => `/campaigns/${id}`,
  EXPORT: '/campaigns/export',
  LEADS: (id: string) => `/campaigns/${id}/leads`,
  ASSIGN: (id: string) => `/campaigns/${id}/assign`,
};

/**
 * Blank CampaignFormData used to initialize the Add Campaign form, and as the
 * fallback initial values when there is no campaign being edited.
 *
 * Used by:
 * - CampaignsPage (Add Campaign drawer's initialValues)
 * - CampaignMapper.toFormValues (fallback when editingItem is null)
 */
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

/**
 * Maps backend campaign field names to frontend Formik field names.
 *
 * Used by:
 * - useCampaignCrud (create/update error handling, via shared useSubmitErrorHandler)
 *
 * Notes:
 * - Empty because the backend already uses the same field names as the form; kept for
 *   parity with the shared useSubmitErrorHandler contract.
 */
export const CAMPAIGN_FIELD_MAP: FieldErrorMap = {};

/**
 * Keyword -> field fallback used when the backend returns a plain message with no
 * field-scoped errors. Order matters; first match wins.
 *
 * Used by:
 * - useCampaignCrud (create/update error handling, via shared useSubmitErrorHandler)
 */
export const CAMPAIGN_FIELD_ERROR_FALLBACKS: FieldErrorFallback[] = [
  { keyword: 'name', field: 'name' },
];

/**
 * CSV column definitions for campaign export.
 *
 * Used by:
 * - useCampaignExport (passed to the shared exportToCsv helper)
 */
export const CAMPAIGN_CSV_COLUMNS: CsvColumn<Campaign>[] = [
  { header: 'Sl No', value: (c) => c.slNo },
  { header: 'Name', value: (c) => c.name },
  { header: 'Type', value: (c) => c.type },
  { header: 'Total Tasks', value: (c) => c.totalTasks },
  { header: 'Completed Tasks', value: (c) => c.completedTasks },
  { header: 'Completed %', value: (c) => `${c.completedPercent}%` },
  { header: 'Created By', value: (c) => getCreatedByLabel(c.createdBy) },
  { header: 'Pool Agents', value: (c) => getPoolAgentsLabel(c.poolAgents) },
  { header: 'Created At', value: (c) => c.createdAt },
];
