import axiosInstance from '../../../../api/axiosInstance';
import { DEAL_TYPE_API_ENDPOINTS } from '../constants/dealTypeApiEndpoints';
import { DealTypeMapper } from '../mappers/dealType.mapper';
import type { DealTypeFormData, DealTypeQueryParams } from '../types/request';
import type { DealTypeListResponse, DealTypeResponse, DeleteDealTypeResponse } from '../types/response';

class DealTypeService {
  private toApiPayload(data: DealTypeFormData): { name: string; status: boolean } {
    return {
      name: data.name,
      status: String(data.status) === 'true',
    };
  }

  async getAllDealTypes(params: DealTypeQueryParams = {}): Promise<DealTypeListResponse> {
    const queryString = DealTypeMapper.toQueryParams(params);
    const url = queryString ? `${DEAL_TYPE_API_ENDPOINTS.GET_ALL}?${queryString}` : DEAL_TYPE_API_ENDPOINTS.GET_ALL;
    const response = await axiosInstance.get<DealTypeListResponse>(url);
    return response.data;
  }

  async createDealType(data: DealTypeFormData): Promise<DealTypeResponse> {
    const payload = this.toApiPayload(data);
    const response = await axiosInstance.post<DealTypeResponse>(DEAL_TYPE_API_ENDPOINTS.CREATE, payload);
    return response.data;
  }

  async updateDealType(id: number, data: DealTypeFormData): Promise<DealTypeResponse> {
    const payload = this.toApiPayload(data);
    const response = await axiosInstance.patch<DealTypeResponse>(DEAL_TYPE_API_ENDPOINTS.UPDATE(id), payload);
    return response.data;
  }

  async deleteDealType(id: number): Promise<DeleteDealTypeResponse> {
    const response = await axiosInstance.delete<DeleteDealTypeResponse>(DEAL_TYPE_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}

export const dealTypeService = new DealTypeService();
