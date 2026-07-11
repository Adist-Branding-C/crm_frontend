import axiosInstance from '../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../shared/utils/serviceResponse.util';
import { QueryMapper } from '../../../shared/mappers/query.mapper';
import { LEAD_API_ENDPOINTS } from '../constants/leadApiEndpoints';
/**
 * HTTP client for the Lead API - communicates with the backend only.
 *
 * Used by:
 * - leadDataService singleton, consumed by useLeadListData (list/refresh), useLeadDeleteConfirm
 *   (delete), useLeadBulkActions (bulk status/staff update, bulk delete), and AddLeadDrawer
 *   (create/update).
 */
class LeadDataService {
    async getLeads(params) {
        const response = await axiosInstance.get(LEAD_API_ENDPOINTS.LEADS, {
            params: QueryMapper.toQuery(params),
        });
        return ServiceResponseUtil.successResponse({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        });
    }
    async createLead(payload) {
        const response = await axiosInstance.post(LEAD_API_ENDPOINTS.LEADS, payload);
        return ServiceResponseUtil.successResponse({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        });
    }
    async deleteLead(leadId) {
        const response = await axiosInstance.delete(`${LEAD_API_ENDPOINTS.LEADS}/${leadId}`);
        return ServiceResponseUtil.successResponse({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        });
    }
    async updateLead(leadId, payload) {
        const response = await axiosInstance.patch(`${LEAD_API_ENDPOINTS.LEADS}/${leadId}`, payload);
        return ServiceResponseUtil.successResponse({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        });
    }
}
export const leadDataService = new LeadDataService();
//# sourceMappingURL=leadDataService.js.map