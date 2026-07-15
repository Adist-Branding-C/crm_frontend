import axiosInstance from '../../../api/axiosInstance';
import type { ApiResponse } from '../../../shared/types/common';
import type { ActivityListData } from '../types/response';

class ActivityService {
  async getActivities(params: { entityType: string; entityId: string }): Promise<ApiResponse<ActivityListData>> {
    const response = await axiosInstance.get<ApiResponse<ActivityListData>>('/activities', { params });
    return response.data;
  }
}

export const activityService = new ActivityService();
