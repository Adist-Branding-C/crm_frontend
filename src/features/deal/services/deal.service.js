import axiosInstance from '../../../api/axiosInstance';
import { DEAL_API_ENDPOINTS } from '../constants/dealApiEndpoints';
class DealService {
    async getAllDeals(params = {}) {
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                queryParams.append(key, String(value));
            }
        });
        const url = queryParams.toString()
            ? `${DEAL_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
            : DEAL_API_ENDPOINTS.GET_ALL;
        const response = await axiosInstance.get(url);
        return {
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        };
    }
    async getDealById(dealId) {
        const response = await axiosInstance.get(DEAL_API_ENDPOINTS.GET_BY_ID(dealId));
        return {
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        };
    }
    async createDeal(data) {
        const response = await axiosInstance.post(DEAL_API_ENDPOINTS.CREATE, data);
        return {
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        };
    }
    async updateDeal(dealId, data) {
        const response = await axiosInstance.patch(DEAL_API_ENDPOINTS.UPDATE(dealId), data);
        return {
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        };
    }
    async deleteDeal(dealId) {
        const response = await axiosInstance.delete(DEAL_API_ENDPOINTS.DELETE(dealId));
        return {
            status: response.data.status,
            message: response.data.message,
        };
    }
    async getDealStages(params = {}) {
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                queryParams.append(key, String(value));
            }
        });
        const url = queryParams.toString()
            ? `${DEAL_API_ENDPOINTS.GET_STAGES}?${queryParams.toString()}`
            : DEAL_API_ENDPOINTS.GET_STAGES;
        const response = await axiosInstance.get(url);
        return {
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        };
    }
    async getDealDropdown(params = {}) {
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                queryParams.append(key, String(value));
            }
        });
        const url = queryParams.toString()
            ? `${DEAL_API_ENDPOINTS.GET_DROPDOWN}?${queryParams.toString()}`
            : DEAL_API_ENDPOINTS.GET_DROPDOWN;
        const response = await axiosInstance.get(url);
        return {
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        };
    }
}
export const dealService = new DealService();
//# sourceMappingURL=deal.service.js.map