import axiosInstance from '../../../api/axiosInstance';
import { ACTIVITY_API_ENDPOINTS } from '../constants/activityApiEndpoints';
class ActivityService {
    async getActivities(params) {
        const response = await axiosInstance.get(ACTIVITY_API_ENDPOINTS.ACTIVITIES, { params });
        return response.data;
    }
}
export const activityService = new ActivityService();
//# sourceMappingURL=ActivityService.js.map