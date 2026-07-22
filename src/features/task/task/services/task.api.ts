import axiosInstance from '../../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
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
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async create(data: TaskFormData): Promise<ApiResponse<TaskItem>> {
    const response = await axiosInstance.post<ApiResponse<TaskItem>>(TASK_API_ENDPOINTS.BASE, data);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async update(id: number, data: Partial<TaskFormData>): Promise<ApiResponse<TaskItem>> {
    const response = await axiosInstance.patch<ApiResponse<TaskItem>>(TASK_API_ENDPOINTS.BY_ID(id), data);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(TASK_API_ENDPOINTS.BY_ID(id));
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }
}
