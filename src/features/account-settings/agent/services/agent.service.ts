import axiosInstance from '../../../../api/axiosInstance';
import { AGENT_API_ENDPOINTS } from '../constants/agentApiEndpoints';
import type { AgentFormData, AgentResponse } from '../types/agent.types';

class AgentService {
  async getAllAgents(params: Record<string, string | number | undefined> = {}): Promise<AgentResponse> {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    const url = queryParams.toString()
      ? `${AGENT_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : AGENT_API_ENDPOINTS.GET_ALL;

    const response = await axiosInstance.get<AgentResponse>(url);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async createAgent(data: Omit<AgentFormData, 'confirmPassword'>): Promise<AgentResponse> {
    const { phone, ...rest } = data;
    const payload = { ...rest, phone_number: phone };
    const response = await axiosInstance.post<AgentResponse>(AGENT_API_ENDPOINTS.CREATE, payload);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async updateAgent(staffId: string, data: Omit<AgentFormData, 'password' | 'confirmPassword'>): Promise<AgentResponse> {
    const { phone, ...rest } = data;
    const payload = { ...rest, phone_number: phone };
    const response = await axiosInstance.patch<AgentResponse>(AGENT_API_ENDPOINTS.UPDATE(staffId), payload);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async deleteAgent(staffId: string): Promise<Pick<AgentResponse, 'status' | 'message'>> {
    const response = await axiosInstance.delete<AgentResponse>(AGENT_API_ENDPOINTS.DELETE(staffId));
    return {
      status: response.data.status,
      message: response.data.message,
    };
  }
}

export const agentService = new AgentService();
