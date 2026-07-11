import axiosInstance from '../../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import { LEAD_SOURCE_API_ENDPOINTS } from '../constants/leadSourceApiEndpoints';
class LeadSourceService {
    async createLeadSource(payload) {
        const response = await axiosInstance.post(LEAD_SOURCE_API_ENDPOINTS.SOURCES, payload);
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
            errors: response.data.errors,
            field: response.data.field,
        });
    }
    async getLeadSources(page = 1, limit = 10, search, sortOrder) {
        const params = { pageNumber: page, limit };
        if (search)
            params.search = search;
        if (sortOrder)
            params.sort_order = sortOrder;
        const response = await axiosInstance.get(LEAD_SOURCE_API_ENDPOINTS.SOURCES, { params });
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        });
    }
    async getLeadSourceById(sourceId) {
        const response = await axiosInstance.get(`${LEAD_SOURCE_API_ENDPOINTS.SOURCES}/${sourceId}`);
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        });
    }
    async updateLeadSource(sourceId, payload) {
        const response = await axiosInstance.patch(`${LEAD_SOURCE_API_ENDPOINTS.SOURCES}/${sourceId}`, payload);
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
            errors: response.data.errors,
            field: response.data.field,
        });
    }
    async deleteLeadSource(sourceId) {
        const response = await axiosInstance.delete(`${LEAD_SOURCE_API_ENDPOINTS.SOURCES}/${sourceId}`);
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
        });
    }
}
export const leadSourceService = new LeadSourceService();
//# sourceMappingURL=index.js.map