import axiosInstance from '../../../api/axiosInstance';
import { QueryMapper } from '../../../shared/mappers/query.mapper';
import { LEAD_API_ENDPOINTS } from '../constants/leadApiEndpoints';
import type { ApiResponse } from '../../../shared/types/common';
import type { LeadListData, CreateLeadData } from '../types/response';
import type { CreateLeadPayload, UpdateLeadPayload, GetLeadsParams } from '../types/request';

class LeadDataService {
  async getLeads(params: GetLeadsParams): Promise<ApiResponse<LeadListData>> {
    const response = await axiosInstance.get<ApiResponse<LeadListData>>(LEAD_API_ENDPOINTS.LEADS, {
      params: QueryMapper.toQuery(params),
    });
    return response.data;
  }

  async createLead(payload: CreateLeadPayload): Promise<ApiResponse<CreateLeadData>> {
    const response = await axiosInstance.post<ApiResponse<CreateLeadData>>(LEAD_API_ENDPOINTS.LEADS, payload);
    return response.data;
  }

  async deleteLead(leadId: string): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(`${LEAD_API_ENDPOINTS.LEADS}/${leadId}`);
    return response.data;
  }

  async updateLead(leadId: string, payload: UpdateLeadPayload): Promise<ApiResponse<null>> {
    const response = await axiosInstance.patch<ApiResponse<null>>(`${LEAD_API_ENDPOINTS.LEADS}/${leadId}`, payload);
    return response.data;
  }
}

export const leadDataService = new LeadDataService();
