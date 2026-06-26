import axiosInstance from '../../../../api/axiosInstance';
import { EMAIL_TEMPLATE_API_ENDPOINTS } from '../constants/emailTemplateApiEndpoints';
import type { EmailTemplateFormData, EmailTemplateResponse, DeleteEmailTemplateResponse } from '../types/emailTemplate.types';

class EmailTemplateService {
  async getAllEmailTemplates(params: Record<string, string | number | undefined> = {}): Promise<EmailTemplateResponse> {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    const url = queryParams.toString()
      ? `${EMAIL_TEMPLATE_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : EMAIL_TEMPLATE_API_ENDPOINTS.GET_ALL;

    const response = await axiosInstance.get<EmailTemplateResponse>(url);
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
      errors: response.data.errors,
      field: response.data.field,
    };
  }

  async updateEmailTemplate(id: number, data: EmailTemplateFormData): Promise<EmailTemplateResponse> {
    const response = await axiosInstance.patch<EmailTemplateResponse>(EMAIL_TEMPLATE_API_ENDPOINTS.UPDATE(id), data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
      errors: response.data.errors,
      field: response.data.field,
    };
  }

  async deleteEmailTemplate(id: number): Promise<DeleteEmailTemplateResponse> {
    const response = await axiosInstance.delete<DeleteEmailTemplateResponse>(EMAIL_TEMPLATE_API_ENDPOINTS.DELETE(id));
    return {
      status: response.data.status,
      message: response.data.message,
    };
  }
}

export const emailTemplateService = new EmailTemplateService();
