import axiosInstance from '../../../../api/axiosInstance';
import { ApiResponse } from '../../../../shared/types/common';
import { CALL_TASK_API_ENDPOINTS } from '../constants/index';
import type { CallTaskItem, CallTaskFormData } from '../types/index';

export class CallTaskApiService {
  async fetchAll(params: Record<string, string | number | undefined> = {}): Promise<ApiResponse<CallTaskItem[]>> {
    const response = await axiosInstance.get<ApiResponse<CallTaskItem[]>>(
      CALL_TASK_API_ENDPOINTS.GET_ALL,
      { params }
    );
    return response.data;
  }

  async create(data: CallTaskFormData): Promise<ApiResponse<CallTaskItem>> {
    const response = await axiosInstance.post<ApiResponse<CallTaskItem>>(CALL_TASK_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async update(id: number, data: CallTaskFormData): Promise<ApiResponse<CallTaskItem>> {
    const response = await axiosInstance.patch<ApiResponse<CallTaskItem>>(CALL_TASK_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(CALL_TASK_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}
