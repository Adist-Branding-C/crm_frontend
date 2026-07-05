import axiosInstance from '../../../../api/axiosInstance';
import { ApiResponse } from '../../../../shared/types/common';
import { TASK_CATEGORY_API_ENDPOINTS } from '../constants/index';
import type { TaskCategoryItem } from '../types/index';

export class TaskCategoryApiService {
  async fetchAll(params: Record<string, string | number | undefined> = {}): Promise<ApiResponse<TaskCategoryItem[]>> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });
    const url = queryParams.toString()
      ? `${TASK_CATEGORY_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : TASK_CATEGORY_API_ENDPOINTS.GET_ALL;
    const response = await axiosInstance.get<ApiResponse<TaskCategoryItem[]>>(url);
    return response.data;
  }

  async create(data: { category: string; action: string }): Promise<ApiResponse<TaskCategoryItem>> {
    const response = await axiosInstance.post<ApiResponse<TaskCategoryItem>>(TASK_CATEGORY_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async update(id: number, data: { category: string; action: string }): Promise<ApiResponse<TaskCategoryItem>> {
    const response = await axiosInstance.patch<ApiResponse<TaskCategoryItem>>(TASK_CATEGORY_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(TASK_CATEGORY_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}
