import axiosInstance from '../../../api/axiosInstance';
import { MAIL_CONFIG_API_ENDPOINTS } from '../constants';
import type { MailConfigFormData, MailConfigListResponse, MailConfigMutationResponse } from '../types';

function toApiPayload(data: MailConfigFormData) {
  return {
    driver: data.driver,
    host: data.host,
    port: Number(data.port),
    encryption: data.encryption,
    username: data.username,
    password: data.password,
    fromEmail: data.fromEmail,
    fromName: data.fromName,
    isActive: data.isActive,
  };
}

class MailConfigService {
  async getAll(params: Record<string, string | number | undefined> = {}): Promise<MailConfigListResponse> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    const url = queryParams.toString()
      ? `${MAIL_CONFIG_API_ENDPOINTS.BASE}?${queryParams.toString()}`
      : MAIL_CONFIG_API_ENDPOINTS.BASE;

    const response = await axiosInstance.get<MailConfigListResponse>(url);
    return response.data;
  }

  async createMailConfig(data: MailConfigFormData): Promise<MailConfigMutationResponse> {
    const response = await axiosInstance.post<MailConfigMutationResponse>(MAIL_CONFIG_API_ENDPOINTS.BASE, toApiPayload(data));
    return response.data;
  }

  async updateMailConfig(id: string, data: MailConfigFormData): Promise<MailConfigMutationResponse> {
    const response = await axiosInstance.patch<MailConfigMutationResponse>(MAIL_CONFIG_API_ENDPOINTS.BY_ID(id), toApiPayload(data));
    return response.data;
  }

  async deleteMailConfig(id: string): Promise<MailConfigMutationResponse> {
    const response = await axiosInstance.delete<MailConfigMutationResponse>(MAIL_CONFIG_API_ENDPOINTS.BY_ID(id));
    return response.data;
  }
}

export const mailConfigService = new MailConfigService();
