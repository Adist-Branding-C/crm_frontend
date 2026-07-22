import axiosInstance from '../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../shared/utils/serviceResponse.util';
import { QueryMapper } from '../../../shared/mappers/query.mapper';
import { SPOTLIGHT_API_ENDPOINTS } from '../constants/spotlightApiEndpoints';
import type { ApiResponse } from '../../../shared/types/common';
import type {
  SpotlightLeadApi,
  SpotlightRequestParams,
  SpotlightResponseData,
} from '../types';

class SpotlightService {
  async getLeads(
    params?: Partial<SpotlightRequestParams>,
  ): Promise<ApiResponse<SpotlightResponseData>> {
    const response = await axiosInstance.get<
      ApiResponse<SpotlightResponseData>
    >(SPOTLIGHT_API_ENDPOINTS.LEADS, {
      params: params ? QueryMapper.toQuery(params) : undefined,
    });
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async exportLeads(
    params?: Partial<SpotlightRequestParams>,
  ): Promise<ApiResponse<SpotlightLeadApi[]>> {
    const response = await axiosInstance.get<ApiResponse<SpotlightLeadApi[]>>(
      SPOTLIGHT_API_ENDPOINTS.LEADS_EXPORT,
      {
        params: params ? QueryMapper.toQuery(params) : undefined,
      },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }
}

export const spotlightService = new SpotlightService();
