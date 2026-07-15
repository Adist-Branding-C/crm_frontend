import axiosInstance from '../../../../api/axiosInstance';
import { ApiResponse } from '../../../../shared/types/common';
import { QueryMapper } from '../../../../shared/mappers/query.mapper';
import { CALL_TASK_API_ENDPOINTS } from '../constants/index';
import type { TaskListParams } from '../../shared/types/listParams';
import type { CallTaskItem, CallTaskFormData } from '../types/index';

export class CallTaskApiService {
  async fetchAll(params: TaskListParams): Promise<ApiResponse<CallTaskItem[]>> {
    const response = await axiosInstance.get<ApiResponse<CallTaskItem[]>>(
      CALL_TASK_API_ENDPOINTS.GET_ALL,
      { params: QueryMapper.toQuery(params) }
    );
    return response.data;
  }

  async create(data: CallTaskFormData): Promise<ApiResponse<CallTaskItem>> {
    const response = await axiosInstance.post<ApiResponse<CallTaskItem>>(CALL_TASK_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async update(id: number, data: CallTaskFormData): Promise<ApiResponse<CallTaskItem>> {
    const response = await axiosInstance.patch<ApiResponse<CallTaskItem>>(CALL_TASK_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(CALL_TASK_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}
