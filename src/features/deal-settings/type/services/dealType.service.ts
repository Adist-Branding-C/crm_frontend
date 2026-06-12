import axiosInstance from '../../../../api/axiosInstance';
import { DEAL_TYPE_API_ENDPOINTS } from '../constants/dealTypeApiEndpoints';
import type { DealTypeFormData, DealTypeResponse } from '../types/deal-type.types';

class DealTypeService {
  async getAllDealTypes(params: Record<string, string | number | undefined> = {}): Promise<DealTypeResponse> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });
    const url = queryParams.toString()
      ? `${DEAL_TYPE_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : DEAL_TYPE_API_ENDPOINTS.GET_ALL;
    const response = await axiosInstance.get<DealTypeResponse>(url);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async createDealType(data: DealTypeFormData): Promise<DealTypeResponse> {
    const response = await axiosInstance.post<DealTypeResponse>(DEAL_TYPE_API_ENDPOINTS.CREATE, data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async updateDealType(id: number, data: DealTypeFormData): Promise<DealTypeResponse> {
    const response = await axiosInstance.patch<DealTypeResponse>(DEAL_TYPE_API_ENDPOINTS.UPDATE(id), data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async deleteDealType(id: number): Promise<Pick<DealTypeResponse, 'status' | 'message'>> {
    const response = await axiosInstance.delete<DealTypeResponse>(DEAL_TYPE_API_ENDPOINTS.DELETE(id));
    return {
      status: response.data.status,
      message: response.data.message,
    };
  }
}

export const dealTypeService = new DealTypeService();
