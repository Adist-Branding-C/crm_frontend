import axiosInstance from '../../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import { LEAD_STATUS_API_ENDPOINTS } from '../constants/leadStatusApiEndpoints';
class LeadStatusService {
    async createLeadStatus(payload) {
        const response = await axiosInstance.post(LEAD_STATUS_API_ENDPOINTS.STATUSES, payload);
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
            errors: response.data.errors,
            field: response.data.field,
        });
    }
    async getLeadStatuses(page = 1, limit = 10, search, sortOrder) {
        const params = { pageNumber: page, limit };
        if (search)
            params.search = search;
        if (sortOrder)
            params.sort_order = sortOrder;
        const response = await axiosInstance.get(LEAD_STATUS_API_ENDPOINTS.STATUSES, { params });
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        });
    }
    async getLeadStatusById(statusId) {
        const response = await axiosInstance.get(`${LEAD_STATUS_API_ENDPOINTS.STATUSES}/${statusId}`);
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        });
    }
    async updateLeadStatus(statusId, payload) {
        const response = await axiosInstance.patch(`${LEAD_STATUS_API_ENDPOINTS.STATUSES}/${statusId}`, payload);
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
            errors: response.data.errors,
            field: response.data.field,
        });
    }
    async deleteLeadStatus(statusId) {
        const response = await axiosInstance.delete(`${LEAD_STATUS_API_ENDPOINTS.STATUSES}/${statusId}`);
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
        });
    }
}
export const leadStatusService = new LeadStatusService();
//# sourceMappingURL=index.js.map