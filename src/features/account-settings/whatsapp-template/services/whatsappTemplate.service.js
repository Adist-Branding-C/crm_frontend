import axiosInstance from '../../../../api/axiosInstance';
import { WHATSAPP_TEMPLATE_API_ENDPOINTS } from '../constants/whatsappTemplateApiEndpoints';
import { WhatsappTemplateMapper } from '../mappers/whatsappTemplate.mapper';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
class WhatsappTemplateService {
    async getAllWhatsappTemplates(params = {}) {
        const queryString = WhatsappTemplateMapper.toQueryParams(params);
        const url = queryString ? `${WHATSAPP_TEMPLATE_API_ENDPOINTS.GET_ALL}?${queryString}` : WHATSAPP_TEMPLATE_API_ENDPOINTS.GET_ALL;
        const response = await axiosInstance.get(url);
        return ServiceResponseUtil.normalize(response.data);
    }
    async createWhatsappTemplate(data) {
        const response = await axiosInstance.post(WHATSAPP_TEMPLATE_API_ENDPOINTS.CREATE, data);
        return ServiceResponseUtil.normalize(response.data);
    }
    async updateWhatsappTemplate(id, data) {
        const response = await axiosInstance.patch(WHATSAPP_TEMPLATE_API_ENDPOINTS.UPDATE(id), data);
        return ServiceResponseUtil.normalize(response.data);
    }
    async deleteWhatsappTemplate(id) {
        const response = await axiosInstance.delete(WHATSAPP_TEMPLATE_API_ENDPOINTS.DELETE(id));
        return ServiceResponseUtil.normalize(response.data);
    }
}
export const whatsappTemplateService = new WhatsappTemplateService();
//# sourceMappingURL=whatsappTemplate.service.js.map