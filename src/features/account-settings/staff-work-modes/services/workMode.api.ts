import axiosInstance from '../../../../api/axiosInstance';
import { ApiResponse } from '../../../../shared/types/common';
import { WORK_MODE_API_ENDPOINTS } from '../constants';
import type { WorkModeItem, WorkModeFormData } from '../types';

export class WorkModeApiService {
  async fetchAll(params: Record<string, string | number | undefined> = {}): Promise<ApiResponse<{ items: WorkModeItem[]; total?: number }>> {
    const response = await axiosInstance.get<ApiResponse<{ items: WorkModeItem[]; total?: number }>>(WORK_MODE_API_ENDPOINTS.GET_ALL, { params });
    return response.data;
  }

  async create(data: WorkModeFormData): Promise<ApiResponse<WorkModeItem>> {
    const response = await axiosInstance.post<ApiResponse<WorkModeItem>>(WORK_MODE_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async update(id: number, data: WorkModeFormData): Promise<ApiResponse<WorkModeItem>> {
    const response = await axiosInstance.patch<ApiResponse<WorkModeItem>>(WORK_MODE_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(WORK_MODE_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}
