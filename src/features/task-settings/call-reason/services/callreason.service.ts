import axiosInstance from '../../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import { QueryMapper } from '../../../../shared/mappers/query.mapper';
import { CALL_REASON_API_ENDPOINTS } from '../constants/index';
import type { ApiResponse } from '../../../../shared/types/common';
import type { CallReasonItem } from '../types/interface';
import type { CallReasonFormData, FetchCallReasonsParams } from '../types/request';
import type { CallReasonListResponse } from '../types/response';

/**
 * HTTP client for the Call Reason API - communicates with the backend only.
 *
 * Used by:
 * - callReasonApiService singleton (services/index.ts), consumed by useFetchCallReasons
 *   (list) and useCallReasonCrud (create/update/delete).
 */
export class CallReasonApiService {
  async fetchAll(params: FetchCallReasonsParams): Promise<ApiResponse<CallReasonListResponse>> {
    const response = await axiosInstance.get<ApiResponse<CallReasonListResponse>>(
      CALL_REASON_API_ENDPOINTS.GET_ALL,
      { params: QueryMapper.toQuery(params) },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async create(data: CallReasonFormData): Promise<ApiResponse<CallReasonItem>> {
    const response = await axiosInstance.post<ApiResponse<CallReasonItem>>(CALL_REASON_API_ENDPOINTS.CREATE, data);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async update(id: number, data: CallReasonFormData): Promise<ApiResponse<CallReasonItem>> {
    const response = await axiosInstance.patch<ApiResponse<CallReasonItem>>(CALL_REASON_API_ENDPOINTS.UPDATE(id), data);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(CALL_REASON_API_ENDPOINTS.DELETE(id));
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }
}
