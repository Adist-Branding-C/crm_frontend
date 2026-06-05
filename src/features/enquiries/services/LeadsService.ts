import axiosInstance from '../../../api/axiosInstance';
import { LEADS_API_ENDPOINTS } from '../constants/leadApiEndpoints';
import type {
  GetLeadsResponse,
  GetSingleLeadResponse,
  CreateLeadResponse,
  UpdateLeadResponse,
  DeleteLeadResponse,
} from '../types/lead.types';

class LeadsService {
  async getLeads(query: Record<string, unknown>): Promise<GetLeadsResponse> {
    const response = await axiosInstance.get<GetLeadsResponse>(LEADS_API_ENDPOINTS.LIST, { params: query });
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async getSingleLead(id: string): Promise<GetSingleLeadResponse> {
    const response = await axiosInstance.get<GetSingleLeadResponse>(LEADS_API_ENDPOINTS.GET(id));
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async addLead(data: Record<string, unknown>): Promise<CreateLeadResponse> {
    const response = await axiosInstance.post<CreateLeadResponse>(LEADS_API_ENDPOINTS.CREATE, data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async updateLead(id: string, data: Record<string, unknown>): Promise<UpdateLeadResponse> {
    const response = await axiosInstance.patch<UpdateLeadResponse>(LEADS_API_ENDPOINTS.UPDATE(id), data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async deleteLead(id: string): Promise<DeleteLeadResponse> {
    const response = await axiosInstance.delete<DeleteLeadResponse>(LEADS_API_ENDPOINTS.DELETE(id));
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }
}

export const leadsService = new LeadsService();
