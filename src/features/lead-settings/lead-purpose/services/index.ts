import axiosInstance from '../../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
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
    return ServiceResponseUtil.normalize({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
      errors: response.data.errors,
      field: response.data.field,
    });
  }

  async getLeadPurposes(page = 1, limit = 10, search?: string): Promise<LeadPurposeListResponse> {
    const params: Record<string, string | number> = { pageNumber: page, limit };
    if (search) params.search = search;
    const response = await axiosInstance.get<LeadPurposeListResponse>(LEAD_PURPOSE_API_ENDPOINTS.PURPOSES, { params });
    return ServiceResponseUtil.normalize({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getLeadPurposeById(purposeId: string): Promise<LeadPurposeResponse> {
    const response = await axiosInstance.get<LeadPurposeResponse>(`${LEAD_PURPOSE_API_ENDPOINTS.PURPOSES}/${purposeId}`);
    return ServiceResponseUtil.normalize({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async updateLeadPurpose(purposeId: string, payload: UpdateLeadPurposePayload): Promise<LeadPurposeResponse> {
    const response = await axiosInstance.patch<LeadPurposeResponse>(`${LEAD_PURPOSE_API_ENDPOINTS.PURPOSES}/${purposeId}`, payload);
    return ServiceResponseUtil.normalize({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
      errors: response.data.errors,
      field: response.data.field,
    });
  }

  async deleteLeadPurpose(purposeId: string): Promise<DeleteLeadPurposeResponse> {
    const response = await axiosInstance.delete<DeleteLeadPurposeResponse>(`${LEAD_PURPOSE_API_ENDPOINTS.PURPOSES}/${purposeId}`);
    return ServiceResponseUtil.normalize({
      status: response.data.status,
      message: response.data.message,
    });
  }
}

export const leadPurposeService = new LeadPurposeService();
