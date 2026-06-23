import axiosInstance from '../../../api/axiosInstance';
import { CAMPAIGN_API_ENDPOINTS, STAFF_API_ENDPOINTS } from '../constants/campaignApiEndpoints';
import type { GetCampaignsParams, CreateCampaignPayload, UpdateCampaignPayload } from '../types/campaign.types';
import type { Campaign } from '../types/campaign.types';
import { computeSlNo } from '../utils/campaign.utils';

class CampaignService {
  getAll(params: GetCampaignsParams) {
    const cleanParams: Record<string, unknown> = {
      pageNumber: params.pageNumber,
      limit: params.limit,
    };
    if (params.search) cleanParams.search = params.search;
    if (params.type) cleanParams.type = params.type;
    if (params.createdBy) cleanParams.createdBy = params.createdBy;
    if (params.sortBy) cleanParams.sortBy = params.sortBy;
    if (params.sortOrder) cleanParams.sortOrder = params.sortOrder;
    if (params.startDate) cleanParams.startDate = params.startDate;
    if (params.endDate) cleanParams.endDate = params.endDate;
    return axiosInstance.get(CAMPAIGN_API_ENDPOINTS.BASE, { params: cleanParams });
  }

  getById(id: string) {
    return axiosInstance.get(CAMPAIGN_API_ENDPOINTS.BY_ID(id));
  }

  create(payload: CreateCampaignPayload) {
    return axiosInstance.post(CAMPAIGN_API_ENDPOINTS.BASE, payload);
  }

  update(id: string, payload: UpdateCampaignPayload) {
    return axiosInstance.patch(CAMPAIGN_API_ENDPOINTS.BY_ID(id), payload);
  }

  delete(id: string) {
    return axiosInstance.delete(CAMPAIGN_API_ENDPOINTS.BY_ID(id));
  }

  export(params?: GetCampaignsParams) {
    return axiosInstance.get(CAMPAIGN_API_ENDPOINTS.EXPORT, { params, responseType: 'blob' });
  }

  getAgents() {
    return axiosInstance.get(STAFF_API_ENDPOINTS.AGENTS);
  }

  transformResponse(
    data: { status: boolean; data?: { items: Campaign[]; pagination: { total: number; total_pages: number } } },
    pageNumber: number,
    limit: number
  ): { campaigns: Campaign[]; totalItems: number } {
    if (data.status && data.data) {
      return {
        campaigns: data.data.items.map((item, idx) => ({
          ...item,
          slNo: computeSlNo(idx, pageNumber, limit),
        })),
        totalItems: data.data.pagination?.total ?? 0,
      };
    }
    return { campaigns: [], totalItems: 0 };
  }
}

export const campaignService = new CampaignService();
