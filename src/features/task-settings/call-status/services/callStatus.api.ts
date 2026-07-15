import axiosInstance from '../../../../api/axiosInstance';
import { QueryMapper } from '../../../../shared/mappers/query.mapper';
import { CALL_STATUS_API_ENDPOINTS } from '../constants/index';
import type { ApiResponse } from '../../../../shared/types/common';
import type { CallStatusItem } from '../types/interface';
import type { CallStatusFormData, FetchCallStatusParams } from '../types/request';
import type { CallStatusListResponse } from '../types/response';

export class CallStatusApiService {
  async fetchAll(params: FetchCallStatusParams): Promise<ApiResponse<CallStatusListResponse>> {
    const response = await axiosInstance.get<ApiResponse<CallStatusListResponse>>(
      CALL_STATUS_API_ENDPOINTS.GET_ALL,
      { params: QueryMapper.toQuery(params) },
    );
    return response.data;
  }

  async create(data: CallStatusFormData): Promise<ApiResponse<CallStatusItem>> {
    const response = await axiosInstance.post<ApiResponse<CallStatusItem>>(CALL_STATUS_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async update(id: number, data: CallStatusFormData): Promise<ApiResponse<CallStatusItem>> {
    const response = await axiosInstance.patch<ApiResponse<CallStatusItem>>(CALL_STATUS_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(CALL_STATUS_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}
