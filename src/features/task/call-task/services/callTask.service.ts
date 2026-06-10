import axiosInstance from '../../../../api/axiosInstance';
import { CALL_TASK_API_ENDPOINTS } from '../constants/callTaskApiEndpoints';
import type { CallTaskFormData, CallTaskResponse } from '../types/callTask.types';

class CallTaskService {
  async getAll(params: Record<string, string | number | undefined> = {}): Promise<CallTaskResponse> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });
    const queryString = queryParams.toString();
    const url = queryString
      ? `${CALL_TASK_API_ENDPOINTS.GET_ALL}?${queryString}`
      : CALL_TASK_API_ENDPOINTS.GET_ALL;
    const response = await axiosInstance.get<CallTaskResponse>(url);
    return response.data;
  }

  async create(data: CallTaskFormData): Promise<CallTaskResponse> {
    const response = await axiosInstance.post<CallTaskResponse>(CALL_TASK_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async update(id: number, data: CallTaskFormData): Promise<CallTaskResponse> {
    const response = await axiosInstance.patch<CallTaskResponse>(CALL_TASK_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: number): Promise<Pick<CallTaskResponse, 'status' | 'message'>> {
    const response = await axiosInstance.delete<CallTaskResponse>(CALL_TASK_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}

export const callTaskService = new CallTaskService();
