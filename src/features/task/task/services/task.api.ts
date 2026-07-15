import axiosInstance from '../../../../api/axiosInstance';
import { QueryMapper } from '../../../../shared/mappers/query.mapper';
import { TASK_API_ENDPOINTS } from '../constants';
import type { ApiResponse } from '../../../../shared/types/common';
import type { TaskListParams } from '../../shared/types/listParams';
import type { TaskItem, TaskFormData } from '../types';

export class TaskApiService {
  async getAll(params: TaskListParams): Promise<ApiResponse<TaskItem[]>> {
    const response = await axiosInstance.get<ApiResponse<TaskItem[]>>(
      TASK_API_ENDPOINTS.BASE,
      { params: QueryMapper.toQuery(params) },
    );
    return response.data;
  }

  async create(data: TaskFormData): Promise<ApiResponse<TaskItem>> {
    const response = await axiosInstance.post<ApiResponse<TaskItem>>(TASK_API_ENDPOINTS.BASE, data);
    return response.data;
  }

  async update(id: number, data: TaskFormData): Promise<ApiResponse<TaskItem>> {
    const response = await axiosInstance.patch<ApiResponse<TaskItem>>(TASK_API_ENDPOINTS.BY_ID(id), data);
    return response.data;
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(TASK_API_ENDPOINTS.BY_ID(id));
    return response.data;
  }
}
