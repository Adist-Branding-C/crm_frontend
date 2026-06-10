import axiosInstance from '../../../../api/axiosInstance';
import { TASK_API_ENDPOINTS } from '../constants/taskApiEndpoints';
import type { TaskFormData, TaskResponse } from '../types/task.types';

class TaskService {
  async getAll(params: Record<string, string | number | undefined> = {}): Promise<TaskResponse> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });
    const queryString = queryParams.toString();
    const url = queryString
      ? `${TASK_API_ENDPOINTS.GET_ALL}?${queryString}`
      : TASK_API_ENDPOINTS.GET_ALL;
    const response = await axiosInstance.get<TaskResponse>(url);
    return response.data;
  }

  async create(data: TaskFormData): Promise<TaskResponse> {
    const response = await axiosInstance.post<TaskResponse>(TASK_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async update(id: number, data: TaskFormData): Promise<TaskResponse> {
    const response = await axiosInstance.patch<TaskResponse>(TASK_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: number): Promise<Pick<TaskResponse, 'status' | 'message'>> {
    const response = await axiosInstance.delete<TaskResponse>(TASK_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}

export const taskService = new TaskService();
