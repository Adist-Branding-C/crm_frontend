import axiosInstance from '../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../shared/utils/serviceResponse.util';
import { QueryMapper } from '../../../shared/mappers/query.mapper';
import { CAMPAIGN_API_ENDPOINTS } from '../constants';
import type { ApiResponse } from '../../../shared/types/common';
import type { CreateCampaignPayload, UpdateCampaignPayload, GetCampaignsParams } from '../types/request';
import type { CampaignListResponse } from '../types/response';

/**
 * HTTP client for the Campaign API - communicates with the backend only.
 *
 * Used by:
 * - campaignApiService singleton (services/index.ts), consumed by useFetchCampaigns
 *   (list) and useCampaignApi (create/update/delete).
 */
export class CampaignApiService {
  async getAll(params: GetCampaignsParams): Promise<ApiResponse<CampaignListResponse>> {
    const response = await axiosInstance.get<ApiResponse<CampaignListResponse>>(
      CAMPAIGN_API_ENDPOINTS.BASE,
      { params: QueryMapper.toQuery(params) },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getById(id: string): Promise<ApiResponse<unknown>> {
    const response = await axiosInstance.get<ApiResponse<unknown>>(CAMPAIGN_API_ENDPOINTS.BY_ID(id));
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async create(data: CreateCampaignPayload): Promise<ApiResponse<unknown>> {
    const response = await axiosInstance.post<ApiResponse<unknown>>(CAMPAIGN_API_ENDPOINTS.BASE, data);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async update(id: string, data: UpdateCampaignPayload): Promise<ApiResponse<unknown>> {
    const response = await axiosInstance.patch<ApiResponse<unknown>>(CAMPAIGN_API_ENDPOINTS.BY_ID(id), data);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(CAMPAIGN_API_ENDPOINTS.BY_ID(id));
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async export(params?: Partial<GetCampaignsParams>): Promise<Blob> {
    const response = await axiosInstance.get(CAMPAIGN_API_ENDPOINTS.EXPORT, {
      params: params ? QueryMapper.toQuery(params) : undefined,
      responseType: 'blob',
    });
    return response.data;
  }
}
