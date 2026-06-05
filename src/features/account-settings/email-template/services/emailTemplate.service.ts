import axiosInstance from '../../../../api/axiosInstance';
import { EMAIL_TEMPLATE_API_ENDPOINTS } from '../constants/emailTemplate.constants';
import type { EmailTemplateFormData, EmailTemplateListResponse, EmailTemplateResponse, EmailTemplateQueryParams, DeleteResponse } from '../types/emailTemplate.types';

class EmailTemplateService {
  async getAllEmailTemplates(params: EmailTemplateQueryParams = {}): Promise<EmailTemplateListResponse> {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    const url = queryParams.toString()
      ? `${EMAIL_TEMPLATE_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : EMAIL_TEMPLATE_API_ENDPOINTS.GET_ALL;

    const response = await axiosInstance.get<EmailTemplateListResponse>(url);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async createEmailTemplate(data: EmailTemplateFormData): Promise<EmailTemplateResponse> {
    const response = await axiosInstance.post<EmailTemplateResponse>(EMAIL_TEMPLATE_API_ENDPOINTS.CREATE, data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async updateEmailTemplate(id: number, data: EmailTemplateFormData): Promise<EmailTemplateResponse> {
    const response = await axiosInstance.patch<EmailTemplateResponse>(EMAIL_TEMPLATE_API_ENDPOINTS.UPDATE(id), data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async deleteEmailTemplate(id: number): Promise<DeleteResponse> {
    const response = await axiosInstance.delete<DeleteResponse>(EMAIL_TEMPLATE_API_ENDPOINTS.DELETE(id));
    return {
      status: response.data.status,
      message: response.data.message,
    };
  }
}

export const emailTemplateService = new EmailTemplateService();
