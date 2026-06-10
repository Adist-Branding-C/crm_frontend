import axiosInstance from '../../../../api/axiosInstance';
import { DEAL_TASK_API_ENDPOINTS } from '../constants/dealTaskApiEndpoints';
import type { DealTaskFormData, DealTaskResponse } from '../types/dealTask.types';

class DealTaskService {
  async getAll(params: Record<string, string | number | undefined> = {}): Promise<DealTaskResponse> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });
    const queryString = queryParams.toString();
    const url = queryString
      ? `${DEAL_TASK_API_ENDPOINTS.GET_ALL}?${queryString}`
      : DEAL_TASK_API_ENDPOINTS.GET_ALL;
    const response = await axiosInstance.get<DealTaskResponse>(url);
    return response.data;
  }

  async create(data: DealTaskFormData): Promise<DealTaskResponse> {
    const response = await axiosInstance.post<DealTaskResponse>(DEAL_TASK_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async update(id: number, data: DealTaskFormData): Promise<DealTaskResponse> {
    const response = await axiosInstance.patch<DealTaskResponse>(DEAL_TASK_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: number): Promise<Pick<DealTaskResponse, 'status' | 'message'>> {
    const response = await axiosInstance.delete<DealTaskResponse>(DEAL_TASK_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}

export const dealTaskService = new DealTaskService();
