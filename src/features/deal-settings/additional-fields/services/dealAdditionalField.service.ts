import axiosInstance from '../../../../api/axiosInstance';
import { getErrorMessage } from '../../../../shared/utils/error';
import { DEAL_ADDITIONAL_FIELD_API_ENDPOINTS } from '../constants/dealAdditionalFieldApiEndpoints';
import { DealAdditionalFieldMapper } from '../mappers/dealAdditionalField.mapper';
import type { DealAdditionalFieldPayload, DealAdditionalFieldQueryParams } from '../types/request';
import type { DealAdditionalFieldListResponse, DealAdditionalFieldResponse, DeleteDealAdditionalFieldResponse } from '../types/response';

class DealAdditionalFieldService {
  async getAllDealAdditionalFields(params: DealAdditionalFieldQueryParams = {}): Promise<DealAdditionalFieldListResponse> {
    const queryString = DealAdditionalFieldMapper.toQueryParams(params);
    const url = queryString
      ? `${DEAL_ADDITIONAL_FIELD_API_ENDPOINTS.GET_ALL}?${queryString}`
      : DEAL_ADDITIONAL_FIELD_API_ENDPOINTS.GET_ALL;

    try {
      const response = await axiosInstance.get<DealAdditionalFieldListResponse>(url);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Network error. Please try again.'));
    }
  }

  async createDealAdditionalField(data: DealAdditionalFieldPayload): Promise<DealAdditionalFieldResponse> {
    try {
      const response = await axiosInstance.post<DealAdditionalFieldResponse>(DEAL_ADDITIONAL_FIELD_API_ENDPOINTS.CREATE, data);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Network error. Please try again.'));
    }
  }

  async updateDealAdditionalField(id: number, data: DealAdditionalFieldPayload): Promise<DealAdditionalFieldResponse> {
    try {
      const response = await axiosInstance.patch<DealAdditionalFieldResponse>(DEAL_ADDITIONAL_FIELD_API_ENDPOINTS.UPDATE(id), data);
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Network error. Please try again.'));
    }
  }

  async deleteDealAdditionalField(id: number): Promise<DeleteDealAdditionalFieldResponse> {
    try {
      const response = await axiosInstance.delete<DeleteDealAdditionalFieldResponse>(DEAL_ADDITIONAL_FIELD_API_ENDPOINTS.DELETE(id));
      return response.data;
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Network error. Please try again.'));
    }
  }
}

export const dealAdditionalFieldService = new DealAdditionalFieldService();
