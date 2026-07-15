import axiosInstance from '../../../api/axiosInstance';
import { QueryMapper } from '../../../shared/mappers/query.mapper';
import { CAMPAIGN_API_ENDPOINTS } from '../constants';
import type { ApiResponse } from '../../../shared/types/common';
import type { CreateCampaignPayload, UpdateCampaignPayload, GetCampaignsParams } from '../types/request';
import type { CampaignListResponse } from '../types/response';

export class CampaignApiService {
  async getAll(params: GetCampaignsParams): Promise<ApiResponse<CampaignListResponse>> {
    const response = await axiosInstance.get<ApiResponse<CampaignListResponse>>(
      CAMPAIGN_API_ENDPOINTS.BASE,
      { params: QueryMapper.toQuery(params) },
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

  async export(params?: Partial<GetCampaignsParams>): Promise<Blob> {
    const response = await axiosInstance.get(CAMPAIGN_API_ENDPOINTS.EXPORT, {
      params: params ? QueryMapper.toQuery(params) : undefined,
      responseType: 'blob',
    });
    return response.data;
  }
}
