import axiosInstance from '../../../api/axiosInstance';

class ActivityService {
  async getActivities(params: Record<string, string | number>) {
    const response = await axiosInstance.get('/activities', { params });
    return response.data;
  }
}

export const activityService = new ActivityService();
