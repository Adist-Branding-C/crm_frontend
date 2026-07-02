import axiosInstance from '../../../../api/axiosInstance';
import { ApiResponse } from '../../../../shared/types/common';
import { DEAL_TASK_API_ENDPOINTS } from '../constants/index';
import type { DealTaskItem, DealTaskFormData } from '../types/index';

export class DealTaskApiService {
  async fetchAll(params: Record<string, string | number | undefined> = {}): Promise<ApiResponse<DealTaskItem[]>> {
    const response = await axiosInstance.get<ApiResponse<DealTaskItem[]>>(
      DEAL_TASK_API_ENDPOINTS.GET_ALL,
      { params }
    );
    return response.data;
  }

  async create(data: DealTaskFormData): Promise<ApiResponse<DealTaskItem>> {
    const response = await axiosInstance.post<ApiResponse<DealTaskItem>>(DEAL_TASK_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async update(id: number, data: DealTaskFormData): Promise<ApiResponse<DealTaskItem>> {
    const response = await axiosInstance.patch<ApiResponse<DealTaskItem>>(DEAL_TASK_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(DEAL_TASK_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}
