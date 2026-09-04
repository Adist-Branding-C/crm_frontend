import axiosInstance from '../../../../api/axiosInstance';
import { ApiResponse } from '../../../../shared/types/common';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import { QueryMapper } from '../../../../shared/mappers/query.mapper';
import { CALL_TASK_API_ENDPOINTS } from '../constants/callTaskApiEndpoints';
import type { TaskListParams } from '../../common/types/listParams';
import type { CallTaskItem, CallTaskFormData } from '../types/index';

/**
 * HTTP client for the Call Task API - communicates with the backend only.
 *
 * Used by:
 * - callTaskDataService singleton, consumed by useCallTaskCrud (create/update/delete)
 *   and CallTaskPage (list fetch).
 */
export class CallTaskDataService {
  async fetchAll(params: TaskListParams): Promise<ApiResponse<CallTaskItem[]>> {
    const response = await axiosInstance.get<ApiResponse<CallTaskItem[]>>(
      CALL_TASK_API_ENDPOINTS.GET_ALL,
      { params: QueryMapper.toQuery(params) }
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  private cleanPayload(data: any): any {
    const payload = { ...data };
    ['leadId', 'dealId', 'campaignId', 'categoryId'].forEach(key => {
      if (payload[key] === '') delete payload[key];
      else if (payload[key] !== undefined && payload[key] !== null && key !== 'leadId') {
        payload[key] = Number(payload[key]);
      }
    });
    return payload;
  }

  async create(data: CallTaskFormData): Promise<ApiResponse<CallTaskItem>> {
    const response = await axiosInstance.post<ApiResponse<CallTaskItem>>(CALL_TASK_API_ENDPOINTS.CREATE, this.cleanPayload(data));
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async update(id: number, data: Partial<CallTaskFormData>): Promise<ApiResponse<CallTaskItem>> {
    const response = await axiosInstance.patch<ApiResponse<CallTaskItem>>(CALL_TASK_API_ENDPOINTS.UPDATE(id), this.cleanPayload(data));
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(CALL_TASK_API_ENDPOINTS.DELETE(id));
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }
}

export const callTaskDataService = new CallTaskDataService();
