import axiosInstance from '../../../../api/axiosInstance';
import { WHATSAPP_TEMPLATE_API_ENDPOINTS } from '../constants/whatsappTemplateApiEndpoints';
import { WhatsappTemplateMapper } from '../mappers/whatsappTemplate.mapper';
import type { WhatsappTemplateFormData, WhatsappTemplateResponse } from '../types/whatsapp-template.types';

class WhatsappTemplateService {
  async getAllWhatsappTemplates(params: Record<string, string | number | undefined> = {}): Promise<WhatsappTemplateResponse> {
    const queryString = WhatsappTemplateMapper.toQueryParams(params);
    const url = queryString ? `${WHATSAPP_TEMPLATE_API_ENDPOINTS.GET_ALL}?${queryString}` : WHATSAPP_TEMPLATE_API_ENDPOINTS.GET_ALL;
    const response = await axiosInstance.get<WhatsappTemplateResponse>(url);
    return response.data;
  }

  async createWhatsappTemplate(data: WhatsappTemplateFormData): Promise<WhatsappTemplateResponse> {
    const response = await axiosInstance.post<WhatsappTemplateResponse>(WHATSAPP_TEMPLATE_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async updateWhatsappTemplate(id: number, data: WhatsappTemplateFormData): Promise<WhatsappTemplateResponse> {
    const response = await axiosInstance.patch<WhatsappTemplateResponse>(WHATSAPP_TEMPLATE_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async deleteWhatsappTemplate(id: number): Promise<Pick<WhatsappTemplateResponse, 'status' | 'message'>> {
    const response = await axiosInstance.delete<WhatsappTemplateResponse>(WHATSAPP_TEMPLATE_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}

export const whatsappTemplateService = new WhatsappTemplateService();
