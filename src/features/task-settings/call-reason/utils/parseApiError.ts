import type { ParsedApiError } from '../types/index';

/**
 * Normalizes a caught error (axios response error, plain Error, or unknown) into a
 * single `ParsedApiError` shape.
 *
 * Used by:
 * - campaigns (useCampaignSubmitHandlers), deal-settings/status (useDealStatusSubmitHandlers)
 *
 * Notes:
 * - Lives under call-reason/ for historical reasons but is consumed only by other feature
 *   modules; out of scope to relocate in this pass since that would require touching those
 *   external call sites. New task-settings code should use the shared
 *   `useSubmitErrorHandler` hook instead, which every task-settings sub-module already does.
 */
export function parseApiError(err: unknown): ParsedApiError {
  if (err && typeof err === 'object' && 'response' in err) {
    const axiosErr = err as { response?: { data?: { errors?: Record<string, string[]>; message?: string; field?: string } } };
    const data = axiosErr.response?.data;
    return {
      message: data?.message || 'Network error. Please try again.',
      ...(data?.errors ? { errors: data.errors } : {}),
      ...(data?.field ? { field: data.field } : {}),
    };
  }

  if (err && typeof err === 'object' && 'message' in err) {
    return { message: (err as { message: string }).message };
  }

  return { message: 'Network error. Please try again.' };
}
