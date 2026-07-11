import axiosInstance from '../../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import { LEAD_PURPOSE_API_ENDPOINTS } from '../constants/leadPurposeApiEndpoints';
class LeadPurposeService {
    async createLeadPurpose(payload) {
        const response = await axiosInstance.post(LEAD_PURPOSE_API_ENDPOINTS.PURPOSES, payload);
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
            errors: response.data.errors,
            field: response.data.field,
        });
    }
    async getLeadPurposes(page = 1, limit = 10, search, sortOrder) {
        const params = { pageNumber: page, limit };
        if (search)
            params.search = search;
        if (sortOrder)
            params.sort_order = sortOrder;
        const response = await axiosInstance.get(LEAD_PURPOSE_API_ENDPOINTS.PURPOSES, { params });
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        });
    }
    async getLeadPurposeById(purposeId) {
        const response = await axiosInstance.get(`${LEAD_PURPOSE_API_ENDPOINTS.PURPOSES}/${purposeId}`);
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        });
    }
    async updateLeadPurpose(purposeId, payload) {
        const response = await axiosInstance.patch(`${LEAD_PURPOSE_API_ENDPOINTS.PURPOSES}/${purposeId}`, payload);
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
            errors: response.data.errors,
            field: response.data.field,
        });
    }
    async deleteLeadPurpose(purposeId) {
        const response = await axiosInstance.delete(`${LEAD_PURPOSE_API_ENDPOINTS.PURPOSES}/${purposeId}`);
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
        });
    }
}
export const leadPurposeService = new LeadPurposeService();
//# sourceMappingURL=index.js.map