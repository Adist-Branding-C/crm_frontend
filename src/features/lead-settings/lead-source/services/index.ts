import axiosInstance from '../../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import { LEAD_SOURCE_API_ENDPOINTS } from '../constants/leadSourceApiEndpoints';
import type { CreateLeadSourcePayload, UpdateLeadSourcePayload } from '../types/request';
import type {
  CreateLeadSourceResponse,
  LeadSourceResponse,
  LeadSourceListResponse,
  DeleteLeadSourceResponse,
} from '../types/response';

class LeadSourceService {
  async createLeadSource(payload: CreateLeadSourcePayload): Promise<CreateLeadSourceResponse> {
    const response = await axiosInstance.post<CreateLeadSourceResponse>(LEAD_SOURCE_API_ENDPOINTS.SOURCES, payload);
    return ServiceResponseUtil.normalize({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
      errors: response.data.errors,
      field: response.data.field,
    });
  }

  async getLeadSources(page = 1, limit = 10, search?: string, sortOrder?: 'ASC' | 'DESC'): Promise<LeadSourceListResponse> {
    const params: Record<string, string | number> = { pageNumber: page, limit };
    if (search) params.search = search;
    if (sortOrder) params.sort_order = sortOrder;
    const response = await axiosInstance.get<LeadSourceListResponse>(LEAD_SOURCE_API_ENDPOINTS.SOURCES, { params });
    return ServiceResponseUtil.normalize({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getLeadSourceById(sourceId: string): Promise<LeadSourceResponse> {
    const response = await axiosInstance.get<LeadSourceResponse>(`${LEAD_SOURCE_API_ENDPOINTS.SOURCES}/${sourceId}`);
    return ServiceResponseUtil.normalize({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async updateLeadSource(sourceId: string, payload: UpdateLeadSourcePayload): Promise<LeadSourceResponse> {
    const response = await axiosInstance.patch<LeadSourceResponse>(`${LEAD_SOURCE_API_ENDPOINTS.SOURCES}/${sourceId}`, payload);
    return ServiceResponseUtil.normalize({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
      errors: response.data.errors,
      field: response.data.field,
    });
  }

  async deleteLeadSource(sourceId: string): Promise<DeleteLeadSourceResponse> {
    const response = await axiosInstance.delete<DeleteLeadSourceResponse>(`${LEAD_SOURCE_API_ENDPOINTS.SOURCES}/${sourceId}`);
    return ServiceResponseUtil.normalize({
      status: response.data.status,
      message: response.data.message,
    });
  }
}

export const leadSourceService = new LeadSourceService();
