import axiosInstance from '../../../../api/axiosInstance';
import { WORK_MODE_API_ENDPOINTS } from '../constants/workMode.constants';
import type { WorkModeFormData, WorkModeItem, WorkModeResponse } from '../types/workMode.types';

class WorkModeService {
  async getAllWorkModes(params: Record<string, string> = {}): Promise<WorkModeResponse<{ items: WorkModeItem[] } | WorkModeItem[]>> {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });

    const url = queryParams.toString()
      ? `${WORK_MODE_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : WORK_MODE_API_ENDPOINTS.GET_ALL;

    const response = await axiosInstance.get<WorkModeResponse<{ items: WorkModeItem[] } | WorkModeItem[]>>(url);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async createWorkMode(data: WorkModeFormData): Promise<WorkModeResponse<{ id?: number; workMode?: WorkModeItem }>> {
    const response = await axiosInstance.post<WorkModeResponse<{ id?: number; workMode?: WorkModeItem }>>(WORK_MODE_API_ENDPOINTS.CREATE, data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async updateWorkMode(id: number, data: WorkModeFormData): Promise<WorkModeResponse<unknown>> {
    const response = await axiosInstance.patch<WorkModeResponse<unknown>>(WORK_MODE_API_ENDPOINTS.UPDATE(id), data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async deleteWorkMode(id: number): Promise<{ status: boolean; message: string }> {
    const response = await axiosInstance.delete<{ status: boolean; message: string }>(WORK_MODE_API_ENDPOINTS.DELETE(id));
    return {
      status: response.data.status,
      message: response.data.message,
    };
  }
}

export const workModeService = new WorkModeService();
