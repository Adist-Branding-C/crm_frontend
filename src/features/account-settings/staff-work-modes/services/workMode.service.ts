import axiosInstance from '../../../../api/axiosInstance';
import { WORK_MODE_API_ENDPOINTS } from '../constants/workModeApiEndpoints';
import type { WorkModeFormData, WorkModeResponse, DeleteWorkModeResponse } from '../types/workMode.types';

class WorkModeService {
  async getAllWorkModes(params: Record<string, string | number | undefined> = {}): Promise<WorkModeResponse> {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    const url = queryParams.toString()
      ? `${WORK_MODE_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : WORK_MODE_API_ENDPOINTS.GET_ALL;

    const response = await axiosInstance.get<WorkModeResponse>(url);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async createWorkMode(data: WorkModeFormData): Promise<WorkModeResponse> {
    const response = await axiosInstance.post<WorkModeResponse>(WORK_MODE_API_ENDPOINTS.CREATE, data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async updateWorkMode(id: number, data: WorkModeFormData): Promise<WorkModeResponse> {
    const response = await axiosInstance.patch<WorkModeResponse>(WORK_MODE_API_ENDPOINTS.UPDATE(id), data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async deleteWorkMode(id: number): Promise<DeleteWorkModeResponse> {
    const response = await axiosInstance.delete<DeleteWorkModeResponse>(WORK_MODE_API_ENDPOINTS.DELETE(id));
    return {
      status: response.data.status,
      message: response.data.message,
    };
  }
}

export const workModeService = new WorkModeService();
