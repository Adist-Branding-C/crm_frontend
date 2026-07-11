import axiosInstance from '../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../shared/utils/serviceResponse.util';
/**
 * HTTP client for the Remark API - communicates with the backend only.
 *
 * Used by:
 * - remarkService singleton, consumed by useLeadRemarks (the "Log Note" tab in
 *   LeadDetailDrawer).
 */
class RemarkService {
    async getRemarks(params) {
        const response = await axiosInstance.get('/remarks', { params });
        return ServiceResponseUtil.successResponse({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        });
    }
    async createRemark(payload) {
        const response = await axiosInstance.post('/remarks', payload);
        return ServiceResponseUtil.successResponse({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        });
    }
    async updateRemark(id, payload) {
        const response = await axiosInstance.patch(`/remarks/${id}`, payload);
        return ServiceResponseUtil.successResponse({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        });
    }
    async deleteRemark(id) {
        const response = await axiosInstance.delete(`/remarks/${id}`);
        return ServiceResponseUtil.successResponse({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        });
    }
}
export const remarkService = new RemarkService();
//# sourceMappingURL=remarkService.js.map