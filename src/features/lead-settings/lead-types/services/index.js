import axiosInstance from '../../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import { LEAD_TYPE_API_ENDPOINTS } from '../constants/leadTypeApiEndpoints';
class LeadTypeService {
    async createLeadType(payload) {
        const response = await axiosInstance.post(LEAD_TYPE_API_ENDPOINTS.TYPES, payload);
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
            errors: response.data.errors,
            field: response.data.field,
        });
    }
    async getLeadTypes(page = 1, limit = 10, search, sortOrder) {
        const params = { pageNumber: page, limit };
        if (search)
            params.search = search;
        if (sortOrder)
            params.sort_order = sortOrder;
        const response = await axiosInstance.get(LEAD_TYPE_API_ENDPOINTS.TYPES, { params });
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        });
    }
    async updateLeadType(typeId, payload) {
        const response = await axiosInstance.patch(`${LEAD_TYPE_API_ENDPOINTS.TYPES}/${typeId}`, payload);
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
            errors: response.data.errors,
            field: response.data.field,
        });
    }
    async deleteLeadType(typeId) {
        const response = await axiosInstance.delete(`${LEAD_TYPE_API_ENDPOINTS.TYPES}/${typeId}`);
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
        });
    }
}
export const leadTypeService = new LeadTypeService();
//# sourceMappingURL=index.js.map