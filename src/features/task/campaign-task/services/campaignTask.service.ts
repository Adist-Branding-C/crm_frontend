import axiosInstance from '../../../../api/axiosInstance';
import { CAMPAIGN_TASK_API_ENDPOINTS } from '../constants/campaignTaskApiEndpoints';
import type { CampaignTaskFormData, CampaignTaskResponse } from '../types/campaignTask.types';

class CampaignTaskService {
  async getAll(params: Record<string, string | number | undefined> = {}): Promise<CampaignTaskResponse> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });
    const queryString = queryParams.toString();
    const url = queryString
      ? `${CAMPAIGN_TASK_API_ENDPOINTS.GET_ALL}?${queryString}`
      : CAMPAIGN_TASK_API_ENDPOINTS.GET_ALL;
    const response = await axiosInstance.get<CampaignTaskResponse>(url);
    return response.data;
  }

  async create(data: CampaignTaskFormData): Promise<CampaignTaskResponse> {
    const response = await axiosInstance.post<CampaignTaskResponse>(CAMPAIGN_TASK_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async update(id: number, data: CampaignTaskFormData): Promise<CampaignTaskResponse> {
    const response = await axiosInstance.patch<CampaignTaskResponse>(CAMPAIGN_TASK_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: number): Promise<Pick<CampaignTaskResponse, 'status' | 'message'>> {
    const response = await axiosInstance.delete<CampaignTaskResponse>(CAMPAIGN_TASK_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}

export const campaignTaskService = new CampaignTaskService();
