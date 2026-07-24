import axiosInstance from '../../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
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
      return ServiceResponseUtil.successResponse({
        status: response.data.status,
        message: response.data.message,
        data: response.data.data,
      });
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Network error. Please try again.'));
    }
  }

  async createDealAdditionalField(data: DealAdditionalFieldPayload): Promise<DealAdditionalFieldResponse> {
    try {
      const response = await axiosInstance.post<DealAdditionalFieldResponse>(DEAL_ADDITIONAL_FIELD_API_ENDPOINTS.CREATE, data);
      return ServiceResponseUtil.successResponse({
        status: response.data.status,
        message: response.data.message,
        data: response.data.data,
      });
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Network error. Please try again.'));
    }
  }

  async updateDealAdditionalField(id: string, data: DealAdditionalFieldPayload): Promise<DealAdditionalFieldResponse> {
    try {
      const response = await axiosInstance.patch<DealAdditionalFieldResponse>(DEAL_ADDITIONAL_FIELD_API_ENDPOINTS.UPDATE(id), data);
      return ServiceResponseUtil.successResponse({
        status: response.data.status,
        message: response.data.message,
        data: response.data.data,
      });
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Network error. Please try again.'));
    }
  }

  async deleteDealAdditionalField(id: string): Promise<DeleteDealAdditionalFieldResponse> {
    try {
      const response = await axiosInstance.delete<DeleteDealAdditionalFieldResponse>(DEAL_ADDITIONAL_FIELD_API_ENDPOINTS.DELETE(id));
      return ServiceResponseUtil.successResponse({
        status: response.data.status,
        message: response.data.message,
      });
    } catch (error) {
      throw new Error(getErrorMessage(error, 'Network error. Please try again.'));
    }
  }
}

export const dealAdditionalFieldService = new DealAdditionalFieldService();
