import axiosInstance from '../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../shared/utils/serviceResponse.util';
import { ACTIVITY_API_ENDPOINTS } from '../constants/activityApiEndpoints';
import type { ApiResponse } from '../../../shared/types/common';
import type { ActivityResponseData, GetActivitiesParams, StaffListResponseData } from '../types';

/**
 * HTTP client for the Activity API - communicates with the backend only.
 *
 * Used by:
 * - activityService singleton, consumed by useActivitiesFetch (activity list)
 *   and useStaffOptions (staff filter dropdown).
 */
class ActivityService {
  async getActivities(params: Partial<GetActivitiesParams>): Promise<ApiResponse<ActivityResponseData>> {
    const response = await axiosInstance.get<ApiResponse<ActivityResponseData>>(
      ACTIVITY_API_ENDPOINTS.ACTIVITIES,
      { params },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getStaffOptions(search?: string): Promise<ApiResponse<StaffListResponseData>> {
    const response = await axiosInstance.get<ApiResponse<StaffListResponseData>>(
      ACTIVITY_API_ENDPOINTS.STAFF,
      { params: { limit: 100, search } },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }
}

export const activityService = new ActivityService();
