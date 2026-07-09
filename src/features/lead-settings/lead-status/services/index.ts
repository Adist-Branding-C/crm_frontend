import axiosInstance from '../../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
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
    return ServiceResponseUtil.normalize({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
      errors: response.data.errors,
      field: response.data.field,
    });
  }

  async getLeadStatuses(page = 1, limit = 10, search?: string): Promise<LeadStatusListResponse> {
    const params: Record<string, string | number> = { pageNumber: page, limit };
    if (search) params.search = search;
    const response = await axiosInstance.get<LeadStatusListResponse>(LEAD_STATUS_API_ENDPOINTS.STATUSES, { params });
    return ServiceResponseUtil.normalize({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getLeadStatusById(statusId: string): Promise<LeadStatusResponse> {
    const response = await axiosInstance.get<LeadStatusResponse>(`${LEAD_STATUS_API_ENDPOINTS.STATUSES}/${statusId}`);
    return ServiceResponseUtil.normalize({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async updateLeadStatus(statusId: string, payload: UpdateLeadStatusPayload): Promise<LeadStatusResponse> {
    const response = await axiosInstance.patch<LeadStatusResponse>(`${LEAD_STATUS_API_ENDPOINTS.STATUSES}/${statusId}`, payload);
    return ServiceResponseUtil.normalize({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
      errors: response.data.errors,
      field: response.data.field,
    });
  }

  async deleteLeadStatus(statusId: string): Promise<DeleteLeadStatusResponse> {
    const response = await axiosInstance.delete<DeleteLeadStatusResponse>(`${LEAD_STATUS_API_ENDPOINTS.STATUSES}/${statusId}`);
    return ServiceResponseUtil.normalize({
      status: response.data.status,
      message: response.data.message,
    });
  }
}

export const leadStatusService = new LeadStatusService();
