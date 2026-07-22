import type { ApiResponse } from '../types/common';
import type { ServiceResponseInput as SuccessResponseInput } from '../types/response';
import type { ServiceResponseShape, ServiceResponseInput } from '../types/serviceResponse.types';

/**
 * Builds the standard { status, message, data } envelope every service method returns.
 *
 * Used by:
 * - All feature API service classes (e.g. CampaignApiService), in place of returning
 *   the raw axios response body or an inline object literal.
 *
 * Notes:
 * - Callers must name every property explicitly (status/message/data) rather than
 *   forwarding a whole response object, so it stays obvious which fields actually flow
 *   from the backend response into the app.
 */
export class ServiceResponseUtil {
  static successResponse<T>({ status, message, data }: SuccessResponseInput<T>): ApiResponse<T> {
    return { status, message, data };
  }

  // Kept alongside successResponse for callers (account-settings and lead-settings services)
  // that still need errors/field passed through for per-field form validation messages.
  static normalize<T>(payload: ServiceResponseInput<T>): ServiceResponseShape<T> {
    const result: ServiceResponseShape<T> = { status: payload.status, message: payload.message };
    if (payload.data !== undefined) result.data = payload.data;
    if (payload.errors !== undefined) result.errors = payload.errors;
    if (payload.field !== undefined) result.field = payload.field;
    return result;
  }
}
