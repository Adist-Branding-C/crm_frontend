import axiosInstance from '../../../../api/axiosInstance';
import { AGENT_API_ENDPOINTS } from '../constants/agentApiEndpoints';

class AgentService {
  async getAllAgents(params = {}) {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value);
      }
    });

    const url = queryParams.toString()
      ? `${AGENT_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : AGENT_API_ENDPOINTS.GET_ALL;

    const response = await axiosInstance.get(url);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async createAgent(data) {
    const response = await axiosInstance.post(AGENT_API_ENDPOINTS.CREATE, data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async updateAgent(id, data) {
    const response = await axiosInstance.patch(AGENT_API_ENDPOINTS.UPDATE(id), data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async deleteAgent(id) {
    const response = await axiosInstance.delete(AGENT_API_ENDPOINTS.DELETE(id));
    return {
      status: response.data.status,
      message: response.data.message,
    };
  }
}

export const agentService = new AgentService();
