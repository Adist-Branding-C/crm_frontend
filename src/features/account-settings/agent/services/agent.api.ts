import axiosInstance from '../../../../api/axiosInstance';
import { ApiResponse } from '../../../../shared/types/common';
import { AGENT_API_ENDPOINTS } from '../constants';
import type { AgentItem, AgentFormData } from '../types';

export class AgentApiService {
  async fetchAll(params: Record<string, string | number | undefined> = {}): Promise<ApiResponse<{ items: AgentItem[]; pagination?: { total: number } }>> {
    const response = await axiosInstance.get<ApiResponse<{ items: AgentItem[]; pagination?: { total: number } }>>(AGENT_API_ENDPOINTS.GET_ALL, { params });
    return response.data;
  }

  private sanitizePhone(phone: string): string {
    return phone.replace(/\D/g, '').slice(0, 10);
  }

  async create(data: Omit<AgentFormData, 'confirmPassword'>): Promise<ApiResponse<AgentItem>> {
    const { phone, ...rest } = data;
    const payload = { ...rest, phone_number: this.sanitizePhone(phone), email: rest.email.trim() };
    const response = await axiosInstance.post<ApiResponse<AgentItem>>(AGENT_API_ENDPOINTS.CREATE, payload);
    return response.data;
  }

  async update(staffId: string, data: Omit<AgentFormData, 'password' | 'confirmPassword'>): Promise<ApiResponse<AgentItem>> {
    const { phone, ...rest } = data;
    const payload = { ...rest, phone_number: this.sanitizePhone(phone), email: rest.email.trim() };
    const response = await axiosInstance.patch<ApiResponse<AgentItem>>(AGENT_API_ENDPOINTS.UPDATE(staffId), payload);
    return response.data;
  }

  async delete(staffId: string): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(AGENT_API_ENDPOINTS.DELETE(staffId));
    return response.data;
  }
}
