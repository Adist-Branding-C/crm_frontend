import axiosInstance from '../../../../api/axiosInstance';
import { AGENT_API_ENDPOINTS } from '../constants/agentApiEndpoints';
import { buildQueryParams } from '../../../../shared/utils/queryParams.util';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import { sanitizePhoneDigits } from '../../../../shared/utils/phone.util';
class AgentService {
    async getAllAgents(params = {}) {
        const { pageNumber, limit, search } = params;
        const queryString = buildQueryParams({ pageNumber, limit, search });
        const url = queryString ? `${AGENT_API_ENDPOINTS.GET_ALL}?${queryString}` : AGENT_API_ENDPOINTS.GET_ALL;
        const response = await axiosInstance.get(url);
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
        });
    }
    async createAgent(data) {
        const { fullName, email, phone, password, designationId, status } = data;
        const payload = {
            fullName,
            email: email.trim(),
            phone_number: sanitizePhoneDigits(phone),
            password,
            designationId,
            status,
        };
        const response = await axiosInstance.post(AGENT_API_ENDPOINTS.CREATE, payload);
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
            errors: response.data.errors,
            field: response.data.field,
        });
    }
    async updateAgent(staffId, data) {
        const { fullName, email, phone, designationId, status } = data;
        const payload = {
            fullName,
            email: email.trim(),
            phone_number: sanitizePhoneDigits(phone),
            designationId,
            status,
        };
        const response = await axiosInstance.patch(AGENT_API_ENDPOINTS.UPDATE(staffId), payload);
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
            data: response.data.data,
            errors: response.data.errors,
            field: response.data.field,
        });
    }
    async deleteAgent(staffId) {
        const response = await axiosInstance.delete(AGENT_API_ENDPOINTS.DELETE(staffId));
        return ServiceResponseUtil.normalize({
            status: response.data.status,
            message: response.data.message,
        });
    }
}
export const agentService = new AgentService();
//# sourceMappingURL=agent.service.js.map