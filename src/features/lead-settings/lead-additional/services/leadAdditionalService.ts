import axiosInstance from '../../../../api/axiosInstance';
import { normalizeFieldType } from '../utils/fieldType';
import { LEAD_ADDITIONAL_API_ENDPOINTS } from '../constants/leadAdditionalApiEndpoints';
import type { CreateLeadAdditionalPayload, UpdateLeadAdditionalPayload } from '../types/request';
import type {
  CreateLeadAdditionalResponse,
  LeadAdditionalResponse,
  LeadAdditionalListResponse,
  UpdateLeadAdditionalResponse,
  DeleteLeadAdditionalResponse,
} from '../types/response';

class LeadAdditionalService {
  async create(payload: CreateLeadAdditionalPayload): Promise<CreateLeadAdditionalResponse> {
    const response = await axiosInstance.post<CreateLeadAdditionalResponse>(
      LEAD_ADDITIONAL_API_ENDPOINTS.ADDITIONAL_FIELDS,
      {
        name: payload.name,
        fieldType: normalizeFieldType(payload.fieldType),
        isRequired: payload.isRequired,
        showInList: payload.showInList,
        showInFilter: payload.showInFilter,
        connectWithLeadPurpose: payload.connectWithLeadPurpose,
        purposeId: payload.purposeId,
        values: payload.values,
      },
    );
    return response.data;
  }

  async getAll(page = 1, limit = 10, search?: string, sortOrder?: 'ASC' | 'DESC'): Promise<LeadAdditionalListResponse> {
    const params: Record<string, string | number> = { pageNumber: page, limit };
    if (search) params.search = search;
    if (sortOrder) params.sort_order = sortOrder;
    const response = await axiosInstance.get<LeadAdditionalListResponse>(LEAD_ADDITIONAL_API_ENDPOINTS.ADDITIONAL_FIELDS, { params });
    return response.data;
  }

  async getById(fieldId: string): Promise<LeadAdditionalResponse> {
    const response = await axiosInstance.get<LeadAdditionalResponse>(`${LEAD_ADDITIONAL_API_ENDPOINTS.ADDITIONAL_FIELDS}/${fieldId}`);
    return response.data;
  }

  async update(fieldId: string, payload: UpdateLeadAdditionalPayload): Promise<UpdateLeadAdditionalResponse> {
    const response = await axiosInstance.patch<UpdateLeadAdditionalResponse>(
      `${LEAD_ADDITIONAL_API_ENDPOINTS.ADDITIONAL_FIELDS}/${fieldId}`,
      {
        name: payload.name,
        fieldType: payload.fieldType ? normalizeFieldType(payload.fieldType) : undefined,
        isRequired: payload.isRequired,
        showInList: payload.showInList,
        showInFilter: payload.showInFilter,
        connectWithLeadPurpose: payload.connectWithLeadPurpose,
        purposeId: payload.purposeId,
        values: payload.values,
      },
    );
    return response.data;
  }

  async delete(fieldId: string): Promise<DeleteLeadAdditionalResponse> {
    const response = await axiosInstance.delete<DeleteLeadAdditionalResponse>(`${LEAD_ADDITIONAL_API_ENDPOINTS.ADDITIONAL_FIELDS}/${fieldId}`);
    return response.data;
  }
}

export const leadAdditionalService = new LeadAdditionalService();
