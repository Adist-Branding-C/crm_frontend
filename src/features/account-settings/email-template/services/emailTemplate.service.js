import axiosInstance from '../../../../api/axiosInstance';
import { EMAIL_TEMPLATE_API_ENDPOINTS } from '../constants/emailTemplateApiEndpoints';
import { EmailTemplateMapper } from '../mappers/emailTemplate.mapper';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
class EmailTemplateService {
    async getAllEmailTemplates(params = {}) {
        const queryString = EmailTemplateMapper.toQueryParams(params);
        const url = queryString
            ? `${EMAIL_TEMPLATE_API_ENDPOINTS.GET_ALL}?${queryString}`
            : EMAIL_TEMPLATE_API_ENDPOINTS.GET_ALL;
        const response = await axiosInstance.get(url);
        return ServiceResponseUtil.normalize(response.data);
    }
    async createEmailTemplate(data) {
        const { templateName, subject, content, status } = data;
        const payload = { templateName, subject, content, status };
        const response = await axiosInstance.post(EMAIL_TEMPLATE_API_ENDPOINTS.CREATE, payload);
        return ServiceResponseUtil.normalize(response.data);
    }
    async updateEmailTemplate(id, data) {
        const { templateName, subject, content, status } = data;
        const payload = { templateName, subject, content, status };
        const response = await axiosInstance.patch(EMAIL_TEMPLATE_API_ENDPOINTS.UPDATE(id), payload);
        return ServiceResponseUtil.normalize(response.data);
    }
    async deleteEmailTemplate(id) {
        const response = await axiosInstance.delete(EMAIL_TEMPLATE_API_ENDPOINTS.DELETE(id));
        return ServiceResponseUtil.normalize(response.data);
    }
}
export const emailTemplateService = new EmailTemplateService();
//# sourceMappingURL=emailTemplate.service.js.map