import axiosInstance from '../../../../api/axiosInstance';
import { DEAL_STATUS_API_ENDPOINTS } from '../constants/dealStatusApiEndpoints';
class DealStatusService {
    async getAllDealStatuses(params = {}) {
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                queryParams.append(key, String(value));
            }
        });
        const url = queryParams.toString()
            ? `${DEAL_STATUS_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
            : DEAL_STATUS_API_ENDPOINTS.GET_ALL;
        const response = await axiosInstance.get(url);
        return {
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        };
    }
    async createDealStatus(data) {
        const response = await axiosInstance.post(DEAL_STATUS_API_ENDPOINTS.CREATE, data);
        return {
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        };
    }
    async updateDealStatus(id, data) {
        const response = await axiosInstance.patch(DEAL_STATUS_API_ENDPOINTS.UPDATE(id), data);
        return {
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        };
    }
    async deleteDealStatus(id) {
        const response = await axiosInstance.delete(DEAL_STATUS_API_ENDPOINTS.DELETE(id));
        return {
            status: response.data.status,
            message: response.data.message,
        };
    }
}
export const dealStatusService = new DealStatusService();
//# sourceMappingURL=dealStatus.service.js.map