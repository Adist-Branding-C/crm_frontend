import axiosInstance from '../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../shared/utils/serviceResponse.util';
import type { ApiResponse } from '../../../shared/types/common';
import type { Remark } from '../types/interface';
import type { RemarkListData } from '../types/response';
import type { CreateRemarkPayload, UpdateRemarkPayload } from '../types/request';

/**
 * HTTP client for the Remark API - communicates with the backend only.
 *
 * Used by:
 * - remarkService singleton, consumed by useLeadRemarks (the "Log Note" tab in
 *   LeadDetailDrawer).
 */
class RemarkService {
  async getRemarks(params: { referenceId: string; entityType: string; page?: number; limit?: number }): Promise<ApiResponse<RemarkListData>> {
    const { page, ...rest } = params;
    const queryParams = { ...rest, ...(page !== undefined && { pageNumber: page }) };
    const response = await axiosInstance.get<ApiResponse<RemarkListData>>('/remarks', { params: queryParams });
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async createRemark(payload: CreateRemarkPayload): Promise<ApiResponse<Remark>> {
    const response = await axiosInstance.post<ApiResponse<Remark>>('/remarks', payload);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async updateRemark(id: number | string, payload: UpdateRemarkPayload): Promise<ApiResponse<Remark>> {
    const response = await axiosInstance.patch<ApiResponse<Remark>>(`/remarks/${id}`, payload);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async deleteRemark(id: number | string): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(`/remarks/${id}`);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }
}

export const remarkService = new RemarkService();
