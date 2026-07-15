import axiosInstance from '../../../../api/axiosInstance';
import { LEAD_STATUS_API_ENDPOINTS } from '../constants/leadStatusApiEndpoints';
import type { CreateLeadStatusPayload, UpdateLeadStatusPayload } from '../types/request';
import type {
  CreateLeadStatusResponse,
  LeadStatusResponse,
  LeadStatusListResponse,
  DeleteLeadStatusResponse,
} from '../types/response';

class LeadStatusService {
  async createLeadStatus(payload: CreateLeadStatusPayload): Promise<CreateLeadStatusResponse> {
    const response = await axiosInstance.post<CreateLeadStatusResponse>(LEAD_STATUS_API_ENDPOINTS.STATUSES, payload);
    return response.data;
  }

  async getLeadStatuses(page = 1, limit = 10, search?: string, sortOrder?: 'ASC' | 'DESC'): Promise<LeadStatusListResponse> {
    const params: Record<string, string | number> = { pageNumber: page, limit };
    if (search) params.search = search;
    if (sortOrder) params.sort_order = sortOrder;
    const response = await axiosInstance.get<LeadStatusListResponse>(LEAD_STATUS_API_ENDPOINTS.STATUSES, { params });
    return response.data;
  }

  async getLeadStatusById(statusId: string): Promise<LeadStatusResponse> {
    const response = await axiosInstance.get<LeadStatusResponse>(`${LEAD_STATUS_API_ENDPOINTS.STATUSES}/${statusId}`);
    return response.data;
  }

  async updateLeadStatus(statusId: string, payload: UpdateLeadStatusPayload): Promise<LeadStatusResponse> {
    const response = await axiosInstance.patch<LeadStatusResponse>(`${LEAD_STATUS_API_ENDPOINTS.STATUSES}/${statusId}`, payload);
    return response.data;
  }

  async deleteLeadStatus(statusId: string): Promise<DeleteLeadStatusResponse> {
    const response = await axiosInstance.delete<DeleteLeadStatusResponse>(`${LEAD_STATUS_API_ENDPOINTS.STATUSES}/${statusId}`);
    return response.data;
  }
}

export const leadStatusService = new LeadStatusService();
