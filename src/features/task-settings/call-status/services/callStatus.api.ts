import axiosInstance from '../../../../api/axiosInstance';
import { ApiResponse } from '../../../../shared/types/common';
import { CALL_STATUS_API_ENDPOINTS } from '../constants/index';
import type { CallStatusItem } from '../types/index';

export class CallStatusApiService {
  async fetchAll(params: Record<string, string | number | undefined> = {}): Promise<ApiResponse<CallStatusItem[]>> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });
    const url = queryParams.toString()
      ? `${CALL_STATUS_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : CALL_STATUS_API_ENDPOINTS.GET_ALL;
    const response = await axiosInstance.get<ApiResponse<CallStatusItem[]>>(url);
    return response.data;
  }

  async create(data: { name: string; status: string }): Promise<ApiResponse<CallStatusItem>> {
    const response = await axiosInstance.post<ApiResponse<CallStatusItem>>(CALL_STATUS_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async update(id: number, data: { name: string; status: string }): Promise<ApiResponse<CallStatusItem>> {
    const response = await axiosInstance.patch<ApiResponse<CallStatusItem>>(CALL_STATUS_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(CALL_STATUS_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}
