import axiosInstance from '../../../../api/axiosInstance';
import { LEAD_SOURCE_API_ENDPOINTS } from '../constants/leadSourceApiEndpoints';
import type {
  CreateLeadSourcePayload,
  CreateLeadSourceResponse,
  UpdateLeadSourcePayload,
  LeadSourceResponse,
  LeadSourceListResponse,
  DeleteLeadSourceResponse,
} from '../types';

class LeadSourceService {
  async createLeadSource(payload: CreateLeadSourcePayload): Promise<CreateLeadSourceResponse> {
    const response = await axiosInstance.post<CreateLeadSourceResponse>(LEAD_SOURCE_API_ENDPOINTS.SOURCES, payload);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async getLeadSources(page = 1, limit = 10, search?: string): Promise<LeadSourceListResponse> {
    const params: Record<string, string | number> = { page, limit };
    if (search) params.search = search;
    const response = await axiosInstance.get<LeadSourceListResponse>(LEAD_SOURCE_API_ENDPOINTS.SOURCES, { params });
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async getLeadSourceById(sourceId: string): Promise<LeadSourceResponse> {
    const response = await axiosInstance.get<LeadSourceResponse>(`${LEAD_SOURCE_API_ENDPOINTS.SOURCES}/${sourceId}`);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async updateLeadSource(sourceId: string, payload: UpdateLeadSourcePayload): Promise<LeadSourceResponse> {
    const response = await axiosInstance.patch<LeadSourceResponse>(`${LEAD_SOURCE_API_ENDPOINTS.SOURCES}/${sourceId}`, payload);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async deleteLeadSource(sourceId: string): Promise<DeleteLeadSourceResponse> {
    const response = await axiosInstance.delete<DeleteLeadSourceResponse>(`${LEAD_SOURCE_API_ENDPOINTS.SOURCES}/${sourceId}`);
    return response.data;
  }
}

export const leadSourceService = new LeadSourceService();
