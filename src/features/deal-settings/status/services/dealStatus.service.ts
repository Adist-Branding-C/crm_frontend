import axiosInstance from '../../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import { DEAL_STATUS_API_ENDPOINTS } from '../constants/dealStatusApiEndpoints';
import { DealStatusMapper } from '../mappers/dealStatus.mapper';
import type { DealStatusFormData, DealStatusQueryParams } from '../types/request';
import type { DealStatusListResponse, DealStatusResponse, DeleteDealStatusResponse } from '../types/response';

class DealStatusService {
  async getAllDealStatuses(params: DealStatusQueryParams = {}): Promise<DealStatusListResponse> {
    const queryString = DealStatusMapper.toQueryParams(params);
    const url = queryString ? `${DEAL_STATUS_API_ENDPOINTS.GET_ALL}?${queryString}` : DEAL_STATUS_API_ENDPOINTS.GET_ALL;

    const response = await axiosInstance.get<DealStatusListResponse>(url);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async createDealStatus(data: DealStatusFormData): Promise<DealStatusResponse> {
    const payload = DealStatusMapper.toApiPayload(data);
    const response = await axiosInstance.post<DealStatusResponse>(DEAL_STATUS_API_ENDPOINTS.CREATE, payload);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async updateDealStatus(id: number, data: DealStatusFormData): Promise<DealStatusResponse> {
    const payload = DealStatusMapper.toApiPayload(data);
    const response = await axiosInstance.patch<DealStatusResponse>(DEAL_STATUS_API_ENDPOINTS.UPDATE(id), payload);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async deleteDealStatus(id: number): Promise<DeleteDealStatusResponse> {
    const response = await axiosInstance.delete<DeleteDealStatusResponse>(DEAL_STATUS_API_ENDPOINTS.DELETE(id));
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
    });
  }
}

export const dealStatusService = new DealStatusService();
