import axiosInstance from '../../../api/axiosInstance';
import { ApiResponse } from '../../../shared/types/common';
import { CAMPAIGN_API_ENDPOINTS } from '../constants';
import type { CreateCampaignPayload, UpdateCampaignPayload } from '../types';

export class CampaignApiService {
  async getAll(params: Record<string, string | number | undefined> = {}): Promise<ApiResponse<unknown>> {
    const response = await axiosInstance.get<ApiResponse<unknown>>(
      CAMPAIGN_API_ENDPOINTS.BASE,
      { params }
    );
    return response.data;
  }

  async getById(id: string): Promise<ApiResponse<unknown>> {
    const response = await axiosInstance.get<ApiResponse<unknown>>(CAMPAIGN_API_ENDPOINTS.BY_ID(id));
    return response.data;
  }

  async create(data: CreateCampaignPayload): Promise<ApiResponse<unknown>> {
    const response = await axiosInstance.post<ApiResponse<unknown>>(CAMPAIGN_API_ENDPOINTS.BASE, data);
    return response.data;
  }

  async update(id: string, data: UpdateCampaignPayload): Promise<ApiResponse<unknown>> {
    const response = await axiosInstance.patch<ApiResponse<unknown>>(CAMPAIGN_API_ENDPOINTS.BY_ID(id), data);
    return response.data;
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(CAMPAIGN_API_ENDPOINTS.BY_ID(id));
    return response.data;
  }

  async export(params?: Record<string, string | number | undefined>): Promise<Blob> {
    const response = await axiosInstance.get(CAMPAIGN_API_ENDPOINTS.EXPORT, { params, responseType: 'blob' });
    return response.data;
  }
}
