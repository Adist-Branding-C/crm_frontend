import axiosInstance from '../../../../api/axiosInstance';
import { LEAD_TYPE_API_ENDPOINTS } from '../constants/leadTypeApiEndpoints';
import type {
  CreateLeadTypePayload,
  CreateLeadTypeResponse,
  UpdateLeadTypePayload,
  LeadTypeResponse,
  LeadTypeListResponse,
  DeleteLeadTypeResponse,
} from '../types';

class LeadTypeService {
  async createLeadType(payload: CreateLeadTypePayload): Promise<CreateLeadTypeResponse> {
    const response = await axiosInstance.post<CreateLeadTypeResponse>(LEAD_TYPE_API_ENDPOINTS.TYPES, payload);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async getLeadTypes(page = 1, limit = 10, search?: string): Promise<LeadTypeListResponse> {
    const params: Record<string, string | number> = { pageNumber: page, limit };
    if (search) params.search = search;
    const response = await axiosInstance.get<LeadTypeListResponse>(LEAD_TYPE_API_ENDPOINTS.TYPES, { params });
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async getLeadTypeById(typeId: string): Promise<LeadTypeResponse> {
    const response = await axiosInstance.get<LeadTypeResponse>(`${LEAD_TYPE_API_ENDPOINTS.TYPES}/${typeId}`);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async updateLeadType(typeId: string, payload: UpdateLeadTypePayload): Promise<LeadTypeResponse> {
    const response = await axiosInstance.patch<LeadTypeResponse>(`${LEAD_TYPE_API_ENDPOINTS.TYPES}/${typeId}`, payload);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async deleteLeadType(typeId: string): Promise<DeleteLeadTypeResponse> {
    const response = await axiosInstance.delete<DeleteLeadTypeResponse>(`${LEAD_TYPE_API_ENDPOINTS.TYPES}/${typeId}`);
    return response.data;
  }
}

export const leadTypeService = new LeadTypeService();
