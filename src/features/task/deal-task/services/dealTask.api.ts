import axiosInstance from '../../../../api/axiosInstance';
import { ApiResponse } from '../../../../shared/types/common';
import { QueryMapper } from '../../../../shared/mappers/query.mapper';
import { DEAL_TASK_API_ENDPOINTS } from '../constants/index';
import type { TaskListParams } from '../../shared/types/listParams';
import type { DealTaskItem, DealTaskFormData } from '../types/index';

export class DealTaskApiService {
  async fetchAll(params: TaskListParams): Promise<ApiResponse<DealTaskItem[]>> {
    const response = await axiosInstance.get<ApiResponse<DealTaskItem[]>>(
      DEAL_TASK_API_ENDPOINTS.GET_ALL,
      { params: QueryMapper.toQuery(params) }
    );
    return response.data;
  }

  async create(data: DealTaskFormData): Promise<ApiResponse<DealTaskItem>> {
    const response = await axiosInstance.post<ApiResponse<DealTaskItem>>(DEAL_TASK_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async update(id: number, data: DealTaskFormData): Promise<ApiResponse<DealTaskItem>> {
    const response = await axiosInstance.patch<ApiResponse<DealTaskItem>>(DEAL_TASK_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(DEAL_TASK_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}
