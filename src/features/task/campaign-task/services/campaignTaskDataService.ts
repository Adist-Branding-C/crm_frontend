import axiosInstance from '../../../../api/axiosInstance';
import { ApiResponse } from '../../../../shared/types/common';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import { QueryMapper } from '../../../../shared/mappers/query.mapper';
import { CAMPAIGN_TASK_API_ENDPOINTS } from '../constants/campaignTaskApiEndpoints';
import type { TaskListParams } from '../../common/types/listParams';
import type { CampaignTaskItem, CampaignTaskFormData } from '../types/index';

/**
 * HTTP client for the Campaign Task API - communicates with the backend only.
 *
 * Used by:
 * - campaignTaskDataService singleton, consumed by useCampaignTaskCrud (create/update/delete)
 *   and CampaignTaskPage (list fetch).
 */
export class CampaignTaskDataService {
  async fetchAll(params: TaskListParams): Promise<ApiResponse<CampaignTaskItem[]>> {
    const response = await axiosInstance.get<ApiResponse<CampaignTaskItem[]>>(
      CAMPAIGN_TASK_API_ENDPOINTS.GET_ALL,
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

  async create(data: CampaignTaskFormData): Promise<ApiResponse<CampaignTaskItem>> {
    const response = await axiosInstance.post<ApiResponse<CampaignTaskItem>>(CAMPAIGN_TASK_API_ENDPOINTS.CREATE, this.cleanPayload(data));
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async update(id: number, data: Partial<CampaignTaskFormData>): Promise<ApiResponse<CampaignTaskItem>> {
    const response = await axiosInstance.patch<ApiResponse<CampaignTaskItem>>(CAMPAIGN_TASK_API_ENDPOINTS.UPDATE(id), this.cleanPayload(data));
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(CAMPAIGN_TASK_API_ENDPOINTS.DELETE(id));
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }
}

export const campaignTaskDataService = new CampaignTaskDataService();
