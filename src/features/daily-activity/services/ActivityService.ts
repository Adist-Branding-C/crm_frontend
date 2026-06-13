import axiosInstance from '../../../api/axiosInstance';
import { ACTIVITY_API_ENDPOINTS } from '../constants/activityApiEndpoints';
import type { ActivityResponse } from '../types';

class ActivityService {
  async getActivities(params?: Record<string, string | number>): Promise<ActivityResponse> {
    const response = await axiosInstance.get<ActivityResponse>(
      ACTIVITY_API_ENDPOINTS.ACTIVITIES,
      { params },
    );
    return response.data;
  }
}

export const activityService = new ActivityService();
