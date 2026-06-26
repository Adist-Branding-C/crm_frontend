import axiosInstance from '../../../../api/axiosInstance';
import { normalizeFieldType, denormalizeFieldType } from '../utils/fieldType';
import { LEAD_ADDITIONAL_API_ENDPOINTS } from '../constants/leadAdditionalApiEndpoints';
import type {
  CreateLeadAdditionalPayload,
  CreateLeadAdditionalResponse,
  UpdateLeadAdditionalPayload,
  LeadAdditionalResponse,
  LeadAdditionalListResponse,
  DeleteLeadAdditionalResponse,
} from '../types';

class LeadAdditionalService {
  async create(payload: CreateLeadAdditionalPayload): Promise<CreateLeadAdditionalResponse> {
    const response = await axiosInstance.post<CreateLeadAdditionalResponse>(
      LEAD_ADDITIONAL_API_ENDPOINTS.ADDITIONAL_FIELDS,
      {
        ...payload,
        fieldType: normalizeFieldType(payload.fieldType),
      },
    );
    return response.data;
  }

  async getAll(page = 1, limit = 10, search?: string): Promise<LeadAdditionalListResponse> {
    const params: Record<string, string | number> = { pageNumber: page, limit };
    if (search) params.search = search;
    const response = await axiosInstance.get<LeadAdditionalListResponse>(LEAD_ADDITIONAL_API_ENDPOINTS.ADDITIONAL_FIELDS, { params });
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async getById(fieldId: string): Promise<LeadAdditionalResponse> {
    const response = await axiosInstance.get<LeadAdditionalResponse>(`${LEAD_ADDITIONAL_API_ENDPOINTS.ADDITIONAL_FIELDS}/${fieldId}`);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async update(fieldId: string, payload: UpdateLeadAdditionalPayload): Promise<{ status: boolean; message: string }> {
    const body: Record<string, unknown> = { ...payload };
    if (body.fieldType) {
      body.fieldType = normalizeFieldType(body.fieldType as string);
    }
    const response = await axiosInstance.patch<{ status: boolean; message: string }>(
      `${LEAD_ADDITIONAL_API_ENDPOINTS.ADDITIONAL_FIELDS}/${fieldId}`,
      body,
    );
    return response.data;
  }

  async delete(fieldId: string): Promise<DeleteLeadAdditionalResponse> {
    const response = await axiosInstance.delete<DeleteLeadAdditionalResponse>(`${LEAD_ADDITIONAL_API_ENDPOINTS.ADDITIONAL_FIELDS}/${fieldId}`);
    return response.data;
  }
}

export const leadAdditionalService = new LeadAdditionalService();
export { denormalizeFieldType };
