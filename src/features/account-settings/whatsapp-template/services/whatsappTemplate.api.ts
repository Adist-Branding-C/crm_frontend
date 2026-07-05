import axiosInstance from '../../../../api/axiosInstance';
import { ApiResponse } from '../../../../shared/types/common';
import { WHATSAPP_TEMPLATE_API_ENDPOINTS } from '../constants';
import type { WhatsappTemplateItem, WhatsappTemplateFormData } from '../types';

export class WhatsappTemplateApiService {
  async fetchAll(params: Record<string, string | number | undefined> = {}): Promise<ApiResponse<{ items: WhatsappTemplateItem[]; total?: number }>> {
    const response = await axiosInstance.get<ApiResponse<{ items: WhatsappTemplateItem[]; total?: number }>>(WHATSAPP_TEMPLATE_API_ENDPOINTS.GET_ALL, { params });
    return response.data;
  }

  async create(data: WhatsappTemplateFormData): Promise<ApiResponse<WhatsappTemplateItem>> {
    const response = await axiosInstance.post<ApiResponse<WhatsappTemplateItem>>(WHATSAPP_TEMPLATE_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async update(id: number, data: WhatsappTemplateFormData): Promise<ApiResponse<WhatsappTemplateItem>> {
    const response = await axiosInstance.patch<ApiResponse<WhatsappTemplateItem>>(WHATSAPP_TEMPLATE_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(WHATSAPP_TEMPLATE_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}
