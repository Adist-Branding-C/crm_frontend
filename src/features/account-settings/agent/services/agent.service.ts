import axiosInstance from '../../../../api/axiosInstance';
import { AGENT_API_ENDPOINTS } from '../constants/agentApiEndpoints';
import { buildQueryParams } from '../../../../shared/utils/queryParams.util';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import { sanitizePhoneDigits } from '../../../../shared/utils/phone.util';
import type { AgentFormData, AgentResponse, GetAllAgentsParams, GetAllAgentsResponse, AgentListData, GetStaffMeResponse } from '../types/agent.types';

class AgentService {
  async getAllAgents(params: GetAllAgentsParams = {}): Promise<GetAllAgentsResponse> {
    const { pageNumber, limit, search } = params;
    const queryString = buildQueryParams({ pageNumber, limit, search });
    const url = queryString ? `${AGENT_API_ENDPOINTS.GET_ALL}?${queryString}` : AGENT_API_ENDPOINTS.GET_ALL;

    const response = await axiosInstance.get<GetAllAgentsResponse>(url);
    return ServiceResponseUtil.normalize<AgentListData>({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async createAgent(data: Omit<AgentFormData, 'confirmPassword'>): Promise<AgentResponse> {
    const { fullName, email, phone, password, designationId, status } = data;
    const payload = {
      fullName,
      email: email.trim(),
      phone_number: sanitizePhoneDigits(phone),
      password,
      designationId,
      status,
    };
    const response = await axiosInstance.post<AgentResponse>(AGENT_API_ENDPOINTS.CREATE, payload);
    return ServiceResponseUtil.normalize({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
      errors: response.data.errors,
      field: response.data.field,
    });
  }

  async updateAgent(staffId: string, data: Omit<AgentFormData, 'password' | 'confirmPassword'>): Promise<AgentResponse> {
    const { fullName, email, phone, designationId, status } = data;
    const payload = {
      fullName,
      email: email.trim(),
      phone_number: sanitizePhoneDigits(phone),
      designationId,
      status,
    };
    const response = await axiosInstance.patch<AgentResponse>(AGENT_API_ENDPOINTS.UPDATE(staffId), payload);
    return ServiceResponseUtil.normalize({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
      errors: response.data.errors,
      field: response.data.field,
    });
  }

  async deleteAgent(staffId: string): Promise<Pick<AgentResponse, 'status' | 'message'>> {
    const response = await axiosInstance.delete<AgentResponse>(AGENT_API_ENDPOINTS.DELETE(staffId));
    return ServiceResponseUtil.normalize({
      status: response.data.status,
      message: response.data.message,
    });
  }

  async getMe(): Promise<GetStaffMeResponse> {
    const response = await axiosInstance.get<GetStaffMeResponse>(AGENT_API_ENDPOINTS.ME);
    return response.data;
  }
}

export const agentService = new AgentService();
