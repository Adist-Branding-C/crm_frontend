import axiosInstance from '../../../../api/axiosInstance';
import { DEAL_TYPE_API_ENDPOINTS } from '../constants/dealTypeApiEndpoints';
class DealTypeService {
    async getAllDealTypes(params = {}) {
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                queryParams.append(key, String(value));
            }
        });
        const url = queryParams.toString()
            ? `${DEAL_TYPE_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
            : DEAL_TYPE_API_ENDPOINTS.GET_ALL;
        const response = await axiosInstance.get(url);
        return {
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        };
    }
    async createDealType(data) {
        const response = await axiosInstance.post(DEAL_TYPE_API_ENDPOINTS.CREATE, data);
        return {
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        };
    }
    async updateDealType(id, data) {
        const response = await axiosInstance.patch(DEAL_TYPE_API_ENDPOINTS.UPDATE(id), data);
        return {
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        };
    }
    async deleteDealType(id) {
        const response = await axiosInstance.delete(DEAL_TYPE_API_ENDPOINTS.DELETE(id));
        return {
            status: response.data.status,
            message: response.data.message,
        };
    }
}
export const dealTypeService = new DealTypeService();
//# sourceMappingURL=dealType.service.js.map