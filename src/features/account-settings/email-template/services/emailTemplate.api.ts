import axiosInstance from '../../../../api/axiosInstance';
import { ApiResponse } from '../../../../shared/types/common';
import { EMAIL_TEMPLATE_API_ENDPOINTS } from '../constants';
import type { EmailTemplateItem, EmailTemplateFormData } from '../types';

export class EmailTemplateApiService {
  async fetchAll(params: Record<string, string | number | undefined> = {}): Promise<ApiResponse<{ items: EmailTemplateItem[]; total?: number }>> {
    const response = await axiosInstance.get<ApiResponse<{ items: EmailTemplateItem[]; total?: number }>>(EMAIL_TEMPLATE_API_ENDPOINTS.GET_ALL, { params });
    return response.data;
  }

  async create(data: EmailTemplateFormData): Promise<ApiResponse<EmailTemplateItem>> {
    const response = await axiosInstance.post<ApiResponse<EmailTemplateItem>>(EMAIL_TEMPLATE_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async update(id: number, data: EmailTemplateFormData): Promise<ApiResponse<EmailTemplateItem>> {
    const response = await axiosInstance.patch<ApiResponse<EmailTemplateItem>>(EMAIL_TEMPLATE_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(EMAIL_TEMPLATE_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}
