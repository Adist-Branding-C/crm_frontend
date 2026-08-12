import axiosInstance from '../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../shared/utils/serviceResponse.util';
import { QueryMapper } from '../../../shared/mappers/query.mapper';
import { LEAD_API_ENDPOINTS } from '../constants/leadApiEndpoints';
import type { ApiResponse } from '../../../shared/types/common';
import type { LeadListData, CreateLeadData, LeadSearchData } from '../types/response';
import type { CreateLeadPayload, UpdateLeadPayload, GetLeadsParams } from '../types/request';

/**
 * HTTP client for the Lead API - communicates with the backend only.
 *
 * Used by:
 * - leadDataService singleton, consumed by useLeadListData (list/refresh), useLeadDeleteConfirm
 *   (delete), useLeadBulkActions (bulk status/staff update, bulk delete), AddLeadDrawer
 *   (create/update), and useGlobalLeadSearch (TopNav quick search).
 */
class LeadDataService {
  async getLeads(params: GetLeadsParams): Promise<ApiResponse<LeadListData>> {
    const response = await axiosInstance.get<ApiResponse<LeadListData>>(LEAD_API_ENDPOINTS.LEADS, {
      params: QueryMapper.toQuery(params),
    });
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async createLead(payload: CreateLeadPayload): Promise<ApiResponse<CreateLeadData>> {
    const response = await axiosInstance.post<ApiResponse<CreateLeadData>>(LEAD_API_ENDPOINTS.LEADS, payload);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async deleteLead(leadId: string): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(`${LEAD_API_ENDPOINTS.LEADS}/${leadId}`);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async updateLead(leadId: string, payload: UpdateLeadPayload): Promise<ApiResponse<null>> {
    const response = await axiosInstance.patch<ApiResponse<null>>(`${LEAD_API_ENDPOINTS.LEADS}/${leadId}`, payload);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getDeletedLeads(params: GetLeadsParams): Promise<ApiResponse<LeadListData>> {
    const response = await axiosInstance.get<ApiResponse<LeadListData>>(LEAD_API_ENDPOINTS.LEADS_DELETED, {
      params: QueryMapper.toQuery(params),
    });
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async restoreLead(leadId: string): Promise<ApiResponse<null>> {
    const response = await axiosInstance.patch<ApiResponse<null>>(`${LEAD_API_ENDPOINTS.LEADS}/${leadId}/restore`);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async searchLeads(q: string, limit?: number): Promise<ApiResponse<LeadSearchData>> {
    const response = await axiosInstance.get<ApiResponse<LeadSearchData>>(`${LEAD_API_ENDPOINTS.LEADS}/search`, {
      params: { q, limit },
    });
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }
}

export const leadDataService = new LeadDataService();
