import axiosInstance from '../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../shared/utils/serviceResponse.util';
/**
 * HTTP client for the Activity API - communicates with the backend only.
 *
 * Used by:
 * - activityService singleton, consumed by useLeadActivities (the "Activity" tab in
 *   LeadDetailDrawer).
 */
class ActivityService {
    async getActivities(params) {
        const response = await axiosInstance.get('/activities', { params });
        return ServiceResponseUtil.successResponse({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        });
    }
}
export const activityService = new ActivityService();
//# sourceMappingURL=activityService.js.map