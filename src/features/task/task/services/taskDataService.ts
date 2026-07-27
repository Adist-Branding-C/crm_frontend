import axiosInstance from '../../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import { QueryMapper } from '../../../../shared/mappers/query.mapper';
import { TASK_API_ENDPOINTS } from '../constants/taskApiEndpoints';
import type { ApiResponse } from '../../../../shared/types/common';
import type { TaskListParams } from '../../common/types/listParams';
import type { TaskItem, TaskFormData, TaskFormDataUpdate } from '../types';

/**
 * HTTP client for the Task API - communicates with the backend only.
 *
 * Used by:
 * - taskDataService singleton, consumed by useTaskCrud (create/update/delete)
 *   and TaskPage (list fetch).
 */
export class TaskDataService {
  
  async getAll(params: TaskListParams): Promise<ApiResponse<TaskItem[]>> {
    const response = await axiosInstance.get<ApiResponse<TaskItem[]>>(
      TASK_API_ENDPOINTS.GET_ALL,
      { params: QueryMapper.toQuery(params) },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async create(data: TaskFormData): Promise<ApiResponse<TaskItem>> {
    const response = await axiosInstance.post<ApiResponse<TaskItem>>(TASK_API_ENDPOINTS.CREATE, data);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async update(id: number, data: TaskFormDataUpdate): Promise<ApiResponse<TaskItem>> {
    const response = await axiosInstance.patch<ApiResponse<TaskItem>>(TASK_API_ENDPOINTS.UPDATE(id), data);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(TASK_API_ENDPOINTS.DELETE(id));
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }
}

export const taskDataService = new TaskDataService();
