import axiosInstance from '../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../shared/utils/serviceResponse.util';
import { CAMPAIGN_API_ENDPOINTS } from '../constants';
import type { ApiResponse } from '../../../shared/types/common';
import type { AssignLeadsResult, CampaignLeadItem } from '../types/campaign-lead';
import type { CampaignLeadStatus } from '../../../shared/constants/enums';

/**
 * HTTP client for the campaign <-> lead assignment endpoints - communicates
 * with the backend only.
 *
 * Used by:
 * - useCampaignLeads (Assign Leads drawer's data layer).
 */
export class CampaignLeadsApiService {
  async getForCampaign(
    campaignId: string,
    params?: { pageNumber?: number; limit?: number; search?: string },
  ): Promise<ApiResponse<{ items: CampaignLeadItem[]; pagination: any }>> {
    const query: Record<string, string | number> = {};
    if (params?.pageNumber) query.pageNumber = params.pageNumber;
    if (params?.limit) query.limit = params.limit;
    if (params?.search) query.search = params.search;

    const response = await axiosInstance.get<ApiResponse<{ items: CampaignLeadItem[]; pagination: any }>>(
      CAMPAIGN_API_ENDPOINTS.ASSIGNED_LEADS(campaignId),
      { params: query },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async assignLeads(campaignId: string, leadIds: string[]): Promise<ApiResponse<AssignLeadsResult>> {
    const response = await axiosInstance.post<ApiResponse<AssignLeadsResult>>(
      CAMPAIGN_API_ENDPOINTS.LEADS(campaignId),
      { leadIds },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async updateLeadStatus(
    campaignId: string,
    leadId: string,
    status: CampaignLeadStatus,
  ): Promise<ApiResponse<CampaignLeadItem>> {
    const response = await axiosInstance.patch<ApiResponse<CampaignLeadItem>>(
      CAMPAIGN_API_ENDPOINTS.LEAD_STATUS(campaignId),
      { leadId, status },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async removeLead(campaignId: string, leadId: string): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(
      CAMPAIGN_API_ENDPOINTS.LEAD_BY_ID(campaignId, leadId),
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }
}

export const campaignLeadsApiService = new CampaignLeadsApiService();
