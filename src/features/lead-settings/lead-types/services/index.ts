import axiosInstance from '../../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import { LEAD_TYPE_API_ENDPOINTS } from '../constants/leadTypeApiEndpoints';
import type { CreateLeadTypePayload, UpdateLeadTypePayload } from '../types/request';
import type {
  CreateLeadTypeResponse,
  LeadTypeResponse,
  LeadTypeListResponse,
  DeleteLeadTypeResponse,
} from '../types/response';

class LeadTypeService {
  async createLeadType(payload: CreateLeadTypePayload): Promise<CreateLeadTypeResponse> {
    const response = await axiosInstance.post<CreateLeadTypeResponse>(LEAD_TYPE_API_ENDPOINTS.TYPES, payload);
    return ServiceResponseUtil.normalize({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
      errors: response.data.errors,
      field: response.data.field,
    });
  }

  async getLeadTypes(page = 1, limit = 10, search?: string, sortOrder?: 'ASC' | 'DESC'): Promise<LeadTypeListResponse> {
    const params: Record<string, string | number> = { pageNumber: page, limit };
    if (search) params.search = search;
    if (sortOrder) params.sort_order = sortOrder;
    const response = await axiosInstance.get<LeadTypeListResponse>(LEAD_TYPE_API_ENDPOINTS.TYPES, { params });
    return ServiceResponseUtil.normalize({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async updateLeadType(typeId: string, payload: UpdateLeadTypePayload): Promise<LeadTypeResponse> {
    const response = await axiosInstance.patch<LeadTypeResponse>(`${LEAD_TYPE_API_ENDPOINTS.TYPES}/${typeId}`, payload);
    return ServiceResponseUtil.normalize({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
      errors: response.data.errors,
      field: response.data.field,
    });
  }

  async deleteLeadType(typeId: string): Promise<DeleteLeadTypeResponse> {
    const response = await axiosInstance.delete<DeleteLeadTypeResponse>(`${LEAD_TYPE_API_ENDPOINTS.TYPES}/${typeId}`);
    return ServiceResponseUtil.normalize({
      status: response.data.status,
      message: response.data.message,
    });
  }
}

export const leadTypeService = new LeadTypeService();
