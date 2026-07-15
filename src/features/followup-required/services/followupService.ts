import axiosInstance from '../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../shared/utils/serviceResponse.util';
import { QueryMapper } from '../../../shared/mappers/query.mapper';
import { FOLLOWUP_API_ENDPOINTS } from '../constants/followupApiEndpoints';
import type { ApiResponse } from '../../../shared/types/common';
import type { FollowupLeadsData, GetFollowupLeadsParams } from '../types';

class FollowupService {
  async getFollowupLeads(
    params: GetFollowupLeadsParams,
  ): Promise<ApiResponse<FollowupLeadsData>> {
    const response = await axiosInstance.get<ApiResponse<FollowupLeadsData>>(
      FOLLOWUP_API_ENDPOINTS.LEADS,
      {
        params: QueryMapper.toQuery(params),
      },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }
}

export const followupService = new FollowupService();
