import axiosInstance from '../../../../api/axiosInstance';
import { ApiResponse } from '../../../../shared/types/common';

import { CALL_REASON_API_ENDPOINTS } from '../constants/index';
import { CallReason } from '../types';

export class CallReasonApiService {
  async fetchAll(
    params: Record<string, string | number | undefined> = {}
  ): Promise<ApiResponse<CallReason[]>> {
    const response = await axiosInstance.get<ApiResponse<CallReason[]>>(
      CALL_REASON_API_ENDPOINTS.GET_ALL,
      { params }
    );
    return response.data;
  }

  async create(
    data: { name: string; status: string }
  ): Promise<ApiResponse<CallReason>> {
    const response = await axiosInstance.post<ApiResponse<CallReason>>(
      CALL_REASON_API_ENDPOINTS.CREATE,
      data
    );
    return response.data;
  }

  async update(
    id: number,
    data: { name: string; status: string }
  ): Promise<ApiResponse<CallReason>> {
    const response = await axiosInstance.patch<ApiResponse<CallReason>>(
      CALL_REASON_API_ENDPOINTS.UPDATE(id),
      data
    );
    return response.data;
  }

  async delete(
    id: number
  ): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(
      CALL_REASON_API_ENDPOINTS.DELETE(id)
    );
    return response.data;
  }
}
