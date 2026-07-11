import axiosInstance from '../../../api/axiosInstance';
import { MAIL_CONFIG_API_ENDPOINTS } from '../constants';
function toApiPayload(data) {
    return {
        driver: data.driver,
        host: data.host,
        port: Number(data.port),
        encryption: data.encryption,
        username: data.username,
        password: data.password,
        fromEmail: data.fromEmail,
        fromName: data.fromName,
        isActive: data.isActive,
    };
}
class MailConfigService {
    async getAll(params = {}) {
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                queryParams.append(key, String(value));
            }
        });
        const url = queryParams.toString()
            ? `${MAIL_CONFIG_API_ENDPOINTS.BASE}?${queryParams.toString()}`
            : MAIL_CONFIG_API_ENDPOINTS.BASE;
        const response = await axiosInstance.get(url);
        return response.data;
    }
    async createMailConfig(data) {
        const response = await axiosInstance.post(MAIL_CONFIG_API_ENDPOINTS.BASE, toApiPayload(data));
        return response.data;
    }
    async updateMailConfig(id, data) {
        const response = await axiosInstance.patch(MAIL_CONFIG_API_ENDPOINTS.BY_ID(id), toApiPayload(data));
        return response.data;
    }
    async deleteMailConfig(id) {
        const response = await axiosInstance.delete(MAIL_CONFIG_API_ENDPOINTS.BY_ID(id));
        return response.data;
    }
}
export const mailConfigService = new MailConfigService();
//# sourceMappingURL=mailConfig.service.js.map