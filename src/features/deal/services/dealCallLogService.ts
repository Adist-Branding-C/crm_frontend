import axiosInstance from '../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../shared/utils/serviceResponse.util';
import type { ApiResponse } from '../../../shared/types/common';
import type { DealCallLogListData } from '../types/response';

/**
 * HTTP client for the generic `/call-logs` endpoint, scoped by leadId - a
 * Deal has no calls of its own (calls are always logged against the parent
 * Lead), so the "Call" tab in DealDetailContent reuses this same list rather
 * than inventing a deal-scoped call concept.
 *
 * Used by:
 * - useDealCallLogs (the "Call" tab in DealDetailContent)
 */
class DealCallLogService {
  async getCallLogsByLead(leadId: string, page = 1, limit = 10): Promise<ApiResponse<DealCallLogListData>> {
    const response = await axiosInstance.get<ApiResponse<DealCallLogListData>>('/call-logs', {
      params: { leadId, pageNumber: page, limit },
    });
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }
}

export const dealCallLogService = new DealCallLogService();
