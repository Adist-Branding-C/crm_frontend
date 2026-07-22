import axiosInstance from '../../../../api/axiosInstance';
import { EMAIL_TEMPLATE_API_ENDPOINTS } from '../constants/emailTemplateApiEndpoints';
import { EmailTemplateMapper } from '../mappers/emailTemplate.mapper';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import type { EmailTemplateFormData, EmailTemplateResponse, DeleteEmailTemplateResponse } from '../types/emailTemplate.types';

class EmailTemplateService {
  async getAllEmailTemplates(params: Record<string, string | number | undefined> = {}): Promise<EmailTemplateResponse> {
    const queryString = EmailTemplateMapper.toQueryParams(params);
    const url = queryString
      ? `${EMAIL_TEMPLATE_API_ENDPOINTS.GET_ALL}?${queryString}`
      : EMAIL_TEMPLATE_API_ENDPOINTS.GET_ALL;

    const response = await axiosInstance.get<EmailTemplateResponse>(url);
    return ServiceResponseUtil.normalize(response.data);
  }

  async createEmailTemplate(data: EmailTemplateFormData): Promise<EmailTemplateResponse> {
    const { templateName, subject, content, status } = data;
    const payload = { templateName, subject, content, status };
    const response = await axiosInstance.post<EmailTemplateResponse>(EMAIL_TEMPLATE_API_ENDPOINTS.CREATE, payload);
    return ServiceResponseUtil.normalize(response.data);
  }

  async updateEmailTemplate(id: number, data: EmailTemplateFormData): Promise<EmailTemplateResponse> {
    const { templateName, subject, content, status } = data;
    const payload = { templateName, subject, content, status };
    const response = await axiosInstance.patch<EmailTemplateResponse>(EMAIL_TEMPLATE_API_ENDPOINTS.UPDATE(id), payload);
    return ServiceResponseUtil.normalize(response.data);
  }

  async deleteEmailTemplate(id: number): Promise<DeleteEmailTemplateResponse> {
    const response = await axiosInstance.delete<DeleteEmailTemplateResponse>(EMAIL_TEMPLATE_API_ENDPOINTS.DELETE(id));
    return ServiceResponseUtil.normalize(response.data);
  }
}

export const emailTemplateService = new EmailTemplateService();
