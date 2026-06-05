import axiosInstance from '../../../../api/axiosInstance';
import { WHATSAPP_TEMPLATE_API_ENDPOINTS } from '../constants/whatsappTemplate.constants';
import type { WhatsappTemplateListResponse, WhatsappTemplateResponse, CreateWhatsappTemplateRequest, UpdateWhatsappTemplateRequest } from '../types/whatsappTemplate.types';

class WhatsappTemplateService {
  async getAllWhatsappTemplates(params: Record<string, string | number | boolean> = {}): Promise<WhatsappTemplateListResponse> {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    const url = queryParams.toString()
      ? `${WHATSAPP_TEMPLATE_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : WHATSAPP_TEMPLATE_API_ENDPOINTS.GET_ALL;

    const response = await axiosInstance.get<WhatsappTemplateListResponse>(url);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async createWhatsappTemplate(data: CreateWhatsappTemplateRequest): Promise<WhatsappTemplateResponse> {
    const response = await axiosInstance.post<WhatsappTemplateResponse>(WHATSAPP_TEMPLATE_API_ENDPOINTS.CREATE, data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async updateWhatsappTemplate(id: number, data: UpdateWhatsappTemplateRequest): Promise<WhatsappTemplateResponse> {
    const response = await axiosInstance.patch<WhatsappTemplateResponse>(WHATSAPP_TEMPLATE_API_ENDPOINTS.UPDATE(id), data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async deleteWhatsappTemplate(id: number): Promise<{ status: boolean; message: string }> {
    const response = await axiosInstance.delete<{ status: boolean; message: string }>(WHATSAPP_TEMPLATE_API_ENDPOINTS.DELETE(id));
    return {
      status: response.data.status,
      message: response.data.message,
    };
  }
}

export const whatsappTemplateService = new WhatsappTemplateService();
