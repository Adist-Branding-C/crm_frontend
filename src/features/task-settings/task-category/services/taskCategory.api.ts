import axiosInstance from '../../../../api/axiosInstance';
import { TASK_CATEGORY_API_ENDPOINTS } from '../constants/index';
import type { TaskCategoryResponse } from '../types/index';

export async function fetchTaskCategoriesApi(params: Record<string, string | number | undefined> = {}): Promise<TaskCategoryResponse> {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, String(value));
    }
  });

  const url = queryParams.toString()
    ? `${TASK_CATEGORY_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
    : TASK_CATEGORY_API_ENDPOINTS.GET_ALL;

  const response = await axiosInstance.get<TaskCategoryResponse>(url);
  return response.data;
}

export async function createTaskCategoryApi(data: { category: string; action: string }): Promise<TaskCategoryResponse> {
  const response = await axiosInstance.post<TaskCategoryResponse>(TASK_CATEGORY_API_ENDPOINTS.CREATE, data);
  return response.data;
}

export async function updateTaskCategoryApi(id: number, data: { category: string; action: string }): Promise<TaskCategoryResponse> {
  const response = await axiosInstance.patch<TaskCategoryResponse>(TASK_CATEGORY_API_ENDPOINTS.UPDATE(id), data);
  return response.data;
}

export async function deleteTaskCategoryApi(id: number): Promise<TaskCategoryResponse> {
  const response = await axiosInstance.delete<TaskCategoryResponse>(TASK_CATEGORY_API_ENDPOINTS.DELETE(id));
  return response.data;
}
