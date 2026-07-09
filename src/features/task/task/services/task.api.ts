import axiosInstance from '../../../../api/axiosInstance';
import { ApiResponse } from '../../../../shared/types/common';
import { TASK_API_ENDPOINTS } from '../constants/index';
import type { TaskItem, TaskFormData } from '../types/index';

export class TaskApiService {
  async fetchAll(params: Record<string, string | number | undefined> = {}): Promise<ApiResponse<TaskItem[]>> {
    const response = await axiosInstance.get<ApiResponse<TaskItem[]>>(
      TASK_API_ENDPOINTS.GET_ALL,
      { params }
    );
    return response.data;
  }

  async create(data: TaskFormData): Promise<ApiResponse<TaskItem>> {
    const response = await axiosInstance.post<ApiResponse<TaskItem>>(TASK_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async update(id: number, data: TaskFormData): Promise<ApiResponse<TaskItem>> {
    const response = await axiosInstance.patch<ApiResponse<TaskItem>>(TASK_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(TASK_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}
