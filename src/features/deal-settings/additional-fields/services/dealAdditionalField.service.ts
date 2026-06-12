import axiosInstance from '../../../../api/axiosInstance';
import { DEAL_ADDITIONAL_FIELD_API_ENDPOINTS } from '../constants/dealAdditionalFieldApiEndpoints';
import type { DealAdditionalFieldPayload } from '../types/deal-additional-field.types';

class DealAdditionalFieldService {
  async getAllDealAdditionalFields(params: Record<string, string | number | undefined> = {}) {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });
    const url = queryParams.toString()
      ? `${DEAL_ADDITIONAL_FIELD_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : DEAL_ADDITIONAL_FIELD_API_ENDPOINTS.GET_ALL;
    const response = await axiosInstance.get(url);
    return response.data;
  }

  async createDealAdditionalField(data: DealAdditionalFieldPayload) {
    const response = await axiosInstance.post(DEAL_ADDITIONAL_FIELD_API_ENDPOINTS.CREATE, data);
    return response.data;
  }

  async updateDealAdditionalField(id: number, data: DealAdditionalFieldPayload) {
    const response = await axiosInstance.patch(DEAL_ADDITIONAL_FIELD_API_ENDPOINTS.UPDATE(id), data);
    return response.data;
  }

  async deleteDealAdditionalField(id: number) {
    const response = await axiosInstance.delete(DEAL_ADDITIONAL_FIELD_API_ENDPOINTS.DELETE(id));
    return response.data;
  }
}

export const dealAdditionalFieldService = new DealAdditionalFieldService();
