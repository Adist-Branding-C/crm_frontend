import axiosInstance from '../../../../api/axiosInstance';
import { ApiResponse } from '../../../../shared/types/common';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import { QueryMapper } from '../../../../shared/mappers/query.mapper';
import { DEAL_TASK_API_ENDPOINTS } from '../constants/dealTaskApiEndpoints';
import type { TaskListParams } from '../../common/types/listParams';
import type { DealTaskItem, DealTaskFormData } from '../types/index';

/**
 * HTTP client for the Deal Task API - communicates with the backend only.
 *
 * Used by:
 * - dealTaskDataService singleton, consumed by useDealTaskCrud (create/update/delete)
 *   and DealTaskPage (list fetch).
 */
export class DealTaskDataService {
  async fetchAll(params: TaskListParams): Promise<ApiResponse<DealTaskItem[]>> {
    const response = await axiosInstance.get<ApiResponse<DealTaskItem[]>>(
      DEAL_TASK_API_ENDPOINTS.GET_ALL,
      { params: QueryMapper.toQuery(params) }
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async create(data: DealTaskFormData): Promise<ApiResponse<DealTaskItem>> {
    const response = await axiosInstance.post<ApiResponse<DealTaskItem>>(DEAL_TASK_API_ENDPOINTS.CREATE, data);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async update(id: number, data: DealTaskFormData): Promise<ApiResponse<DealTaskItem>> {
    const response = await axiosInstance.patch<ApiResponse<DealTaskItem>>(DEAL_TASK_API_ENDPOINTS.UPDATE(id), data);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(DEAL_TASK_API_ENDPOINTS.DELETE(id));
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }
}

export const dealTaskDataService = new DealTaskDataService();
