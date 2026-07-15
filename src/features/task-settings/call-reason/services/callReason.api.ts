import axiosInstance from '../../../../api/axiosInstance';
import { QueryMapper } from '../../../../shared/mappers/query.mapper';
import { CALL_REASON_API_ENDPOINTS } from '../constants/index';
import type { ApiResponse } from '../../../../shared/types/common';
import type { CallReason } from '../types/interface';
import type { CallReasonFormData, FetchCallReasonsParams } from '../types/request';
import type { CallReasonListResponse } from '../types/response';

export class CallReasonApiService {
  async fetchAll(params: FetchCallReasonsParams): Promise<ApiResponse<CallReasonListResponse>> {
    const response = await axiosInstance.get<ApiResponse<CallReasonListResponse>>(
      CALL_REASON_API_ENDPOINTS.GET_ALL,
      { params: QueryMapper.toQuery(params) },
    );
    return response.data;
  }

  async create(data: CallReasonFormData): Promise<ApiResponse<CallReason>> {
    const response = await axiosInstance.post<ApiResponse<CallReason>>(CALL_REASON_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async update(id: number, data: CallReasonFormData): Promise<ApiResponse<CallReason>> {
    const response = await axiosInstance.patch<ApiResponse<CallReason>>(CALL_REASON_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(CALL_REASON_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}
