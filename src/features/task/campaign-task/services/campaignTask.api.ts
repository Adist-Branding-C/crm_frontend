import axiosInstance from '../../../../api/axiosInstance';
import { ApiResponse } from '../../../../shared/types/common';
import { CAMPAIGN_TASK_API_ENDPOINTS } from '../constants/index';
import type { CampaignTaskItem, CampaignTaskFormData } from '../types/index';

export class CampaignTaskApiService {
  async fetchAll(params: Record<string, string | number | undefined> = {}): Promise<ApiResponse<CampaignTaskItem[]>> {
    const response = await axiosInstance.get<ApiResponse<CampaignTaskItem[]>>(
      CAMPAIGN_TASK_API_ENDPOINTS.GET_ALL,
      { params }
    );
    return response.data;
  }

  async create(data: CampaignTaskFormData): Promise<ApiResponse<CampaignTaskItem>> {
    const response = await axiosInstance.post<ApiResponse<CampaignTaskItem>>(CAMPAIGN_TASK_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async update(id: number, data: CampaignTaskFormData): Promise<ApiResponse<CampaignTaskItem>> {
    const response = await axiosInstance.patch<ApiResponse<CampaignTaskItem>>(CAMPAIGN_TASK_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(CAMPAIGN_TASK_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}
