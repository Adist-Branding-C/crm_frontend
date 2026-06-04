import axiosInstance from '../../../../api/axiosInstance';
import { WHATSAPP_TEMPLATE_API_ENDPOINTS } from '../constants/whatsappTemplate.constants';

class WhatsappTemplateService {
  async getAllWhatsappTemplates(params = {}) {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });

    const url = queryParams.toString()
      ? `${WHATSAPP_TEMPLATE_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : WHATSAPP_TEMPLATE_API_ENDPOINTS.GET_ALL;

    const response = await axiosInstance.get(url);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async createWhatsappTemplate(data) {
    const response = await axiosInstance.post(WHATSAPP_TEMPLATE_API_ENDPOINTS.CREATE, data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async updateWhatsappTemplate(id, data) {
    const response = await axiosInstance.patch(WHATSAPP_TEMPLATE_API_ENDPOINTS.UPDATE(id), data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async deleteWhatsappTemplate(id) {
    const response = await axiosInstance.delete(WHATSAPP_TEMPLATE_API_ENDPOINTS.DELETE(id));
    return {
      status: response.data.status,
      message: response.data.message,
    };
  }
}

export const whatsappTemplateService = new WhatsappTemplateService();
