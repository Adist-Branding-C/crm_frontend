import axiosInstance from '../../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import { normalizeFieldType } from '../utils/fieldType';
import { LEAD_ADDITIONAL_API_ENDPOINTS } from '../constants/leadAdditionalApiEndpoints';
class LeadAdditionalService {
    async create(payload) {
        const response = await axiosInstance.post(LEAD_ADDITIONAL_API_ENDPOINTS.ADDITIONAL_FIELDS, {
            name: payload.name,
            fieldType: normalizeFieldType(payload.fieldType),
            isRequired: payload.isRequired,
            showInList: payload.showInList,
            showInFilter: payload.showInFilter,
            connectWithLeadPurpose: payload.connectWithLeadPurpose,
            purposeId: payload.purposeId,
            values: payload.values,
        });
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
            errors: response.data.errors,
            field: response.data.field,
        });
    }
    async getAll(page = 1, limit = 10, search, sortOrder) {
        const params = { pageNumber: page, limit };
        if (search)
            params.search = search;
        if (sortOrder)
            params.sort_order = sortOrder;
        const response = await axiosInstance.get(LEAD_ADDITIONAL_API_ENDPOINTS.ADDITIONAL_FIELDS, { params });
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        });
    }
    async getById(fieldId) {
        const response = await axiosInstance.get(`${LEAD_ADDITIONAL_API_ENDPOINTS.ADDITIONAL_FIELDS}/${fieldId}`);
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        });
    }
    async update(fieldId, payload) {
        const response = await axiosInstance.patch(`${LEAD_ADDITIONAL_API_ENDPOINTS.ADDITIONAL_FIELDS}/${fieldId}`, {
            name: payload.name,
            fieldType: payload.fieldType ? normalizeFieldType(payload.fieldType) : undefined,
            isRequired: payload.isRequired,
            showInList: payload.showInList,
            showInFilter: payload.showInFilter,
            connectWithLeadPurpose: payload.connectWithLeadPurpose,
            purposeId: payload.purposeId,
            values: payload.values,
        });
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
            errors: response.data.errors,
            field: response.data.field,
        });
    }
    async delete(fieldId) {
        const response = await axiosInstance.delete(`${LEAD_ADDITIONAL_API_ENDPOINTS.ADDITIONAL_FIELDS}/${fieldId}`);
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
        });
    }
}
export const leadAdditionalService = new LeadAdditionalService();
//# sourceMappingURL=leadAdditionalService.js.map