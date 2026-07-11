import axiosInstance from '../../../../api/axiosInstance';
import { CAMPAIGN_TASK_API_ENDPOINTS } from '../constants/index';
export class CampaignTaskApiService {
    async fetchAll(params = {}) {
        const response = await axiosInstance.get(CAMPAIGN_TASK_API_ENDPOINTS.GET_ALL, { params });
        return response.data;
    }
    async create(data) {
        const response = await axiosInstance.post(CAMPAIGN_TASK_API_ENDPOINTS.CREATE, data);
        return response.data;
    }
    async update(id, data) {
        const response = await axiosInstance.patch(CAMPAIGN_TASK_API_ENDPOINTS.UPDATE(id), data);
        return response.data;
    }
    async delete(id) {
        const response = await axiosInstance.delete(CAMPAIGN_TASK_API_ENDPOINTS.DELETE(id));
        return response.data;
    }
}
//# sourceMappingURL=campaignTask.api.js.map