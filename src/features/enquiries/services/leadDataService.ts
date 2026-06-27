import axiosInstance from '../../../api/axiosInstance';
import { LEAD_API_ENDPOINTS } from '../constants/leadApiEndpoints';
import type { LeadListResponse, CreateLeadResponse, CreateLeadPayload, UpdateLeadPayload, ApiResponse } from '../types';

class LeadDataService {
  async getLeads(params: Record<string, string | number>): Promise<LeadListResponse> {
    const response = await axiosInstance.get<LeadListResponse>(LEAD_API_ENDPOINTS.LEADS, { params });
    return response.data;
  }

  async createLead(payload: CreateLeadPayload): Promise<CreateLeadResponse> {
    const response = await axiosInstance.post<CreateLeadResponse>(LEAD_API_ENDPOINTS.LEADS, payload);
    return response.data;
  }

  async deleteLead(id: number): Promise<ApiResponse> {
    const response = await axiosInstance.delete<ApiResponse>(`${LEAD_API_ENDPOINTS.LEADS}/${id}`);
    return response.data;
  }

  async updateLead(id: number, payload: UpdateLeadPayload): Promise<ApiResponse> {
    const response = await axiosInstance.put<ApiResponse>(`${LEAD_API_ENDPOINTS.LEADS}/${id}`, payload);
    return response.data;
  }
}

export const leadDataService = new LeadDataService();
