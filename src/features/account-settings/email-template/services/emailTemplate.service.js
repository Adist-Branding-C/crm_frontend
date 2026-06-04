import axiosInstance from '../../../../api/axiosInstance';
import { EMAIL_TEMPLATE_API_ENDPOINTS } from '../constants/emailTemplate.constants';

class EmailTemplateService {
  async getAllEmailTemplates(params = {}) {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });

    const url = queryParams.toString()
      ? `${EMAIL_TEMPLATE_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : EMAIL_TEMPLATE_API_ENDPOINTS.GET_ALL;

    const response = await axiosInstance.get(url);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async createEmailTemplate(data) {
    const response = await axiosInstance.post(EMAIL_TEMPLATE_API_ENDPOINTS.CREATE, data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async updateEmailTemplate(id, data) {
    const response = await axiosInstance.patch(EMAIL_TEMPLATE_API_ENDPOINTS.UPDATE(id), data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async deleteEmailTemplate(id) {
    const response = await axiosInstance.delete(EMAIL_TEMPLATE_API_ENDPOINTS.DELETE(id));
    return {
      status: response.data.status,
      message: response.data.message,
    };
  }
}

export const emailTemplateService = new EmailTemplateService();
