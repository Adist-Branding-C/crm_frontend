export interface CallReasonItem {
  id: number;
  name: string;
  status?: string;
}

/**
 * Normalized shape of a caught API error.
 *
 * Used by:
 * - call-reason/utils/parseApiError, consumed externally by campaigns and
 *   deal-settings/status (useCampaignSubmitHandlers, useDealStatusSubmitHandlers)
 */
export interface ParsedApiError {
  message: string;
  errors?: Record<string, string[]>;
  field?: string;
}
