import type { ApiResponse } from '../types/common';
import type { ServiceResponseInput } from '../types/response';

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
  static successResponse<T>({ status, message, data }: ServiceResponseInput<T>): ApiResponse<T> {
    return { status, message, data };
  }
}
