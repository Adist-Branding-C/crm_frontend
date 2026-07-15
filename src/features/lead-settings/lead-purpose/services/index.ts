import axiosInstance from '../../../../api/axiosInstance';
import { LEAD_PURPOSE_API_ENDPOINTS } from '../constants/leadPurposeApiEndpoints';
import type { CreateLeadPurposePayload, UpdateLeadPurposePayload } from '../types/request';
import type {
  CreateLeadPurposeResponse,
  LeadPurposeResponse,
  LeadPurposeListResponse,
  DeleteLeadPurposeResponse,
} from '../types/response';

class LeadPurposeService {
  async createLeadPurpose(payload: CreateLeadPurposePayload): Promise<CreateLeadPurposeResponse> {
    const response = await axiosInstance.post<CreateLeadPurposeResponse>(LEAD_PURPOSE_API_ENDPOINTS.PURPOSES, payload);
    return response.data;
  }

  async getLeadPurposes(page = 1, limit = 10, search?: string, sortOrder?: 'ASC' | 'DESC'): Promise<LeadPurposeListResponse> {
    const params: Record<string, string | number> = { pageNumber: page, limit };
    if (search) params.search = search;
    if (sortOrder) params.sort_order = sortOrder;
    const response = await axiosInstance.get<LeadPurposeListResponse>(LEAD_PURPOSE_API_ENDPOINTS.PURPOSES, { params });
    return response.data;
  }

  async getLeadPurposeById(purposeId: string): Promise<LeadPurposeResponse> {
    const response = await axiosInstance.get<LeadPurposeResponse>(`${LEAD_PURPOSE_API_ENDPOINTS.PURPOSES}/${purposeId}`);
    return response.data;
  }

  async updateLeadPurpose(purposeId: string, payload: UpdateLeadPurposePayload): Promise<LeadPurposeResponse> {
    const response = await axiosInstance.patch<LeadPurposeResponse>(`${LEAD_PURPOSE_API_ENDPOINTS.PURPOSES}/${purposeId}`, payload);
    return response.data;
  }

  async deleteLeadPurpose(purposeId: string): Promise<DeleteLeadPurposeResponse> {
    const response = await axiosInstance.delete<DeleteLeadPurposeResponse>(`${LEAD_PURPOSE_API_ENDPOINTS.PURPOSES}/${purposeId}`);
    return response.data;
  }
}

export const leadPurposeService = new LeadPurposeService();
