import axiosInstance from '../../../../api/axiosInstance';
import { DEAL_STATUS_API_ENDPOINTS } from '../constants/dealStatusApiEndpoints';
import type { DealStatusFormData, DealStatusResponse } from '../types/deal-status.types';

class DealStatusService {
  async getAllDealStatuses(params: Record<string, string | number | undefined> = {}): Promise<DealStatusResponse> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });
    const url = queryParams.toString()
      ? `${DEAL_STATUS_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : DEAL_STATUS_API_ENDPOINTS.GET_ALL;
    const response = await axiosInstance.get<DealStatusResponse>(url);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async createDealStatus(data: DealStatusFormData): Promise<DealStatusResponse> {
    const response = await axiosInstance.post<DealStatusResponse>(DEAL_STATUS_API_ENDPOINTS.CREATE, data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async updateDealStatus(id: number, data: DealStatusFormData): Promise<DealStatusResponse> {
    const response = await axiosInstance.patch<DealStatusResponse>(DEAL_STATUS_API_ENDPOINTS.UPDATE(id), data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async deleteDealStatus(id: number): Promise<Pick<DealStatusResponse, 'status' | 'message'>> {
    const response = await axiosInstance.delete<DealStatusResponse>(DEAL_STATUS_API_ENDPOINTS.DELETE(id));
    return {
      status: response.data.status,
      message: response.data.message,
    };
  }
}

export const dealStatusService = new DealStatusService();
