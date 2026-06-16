import axiosInstance from '../../../api/axiosInstance';
import { DEAL_API_ENDPOINTS } from '../constants/dealApiEndpoints';
import type { DealFormData, DealResponse } from '../types';

class DealService {
  async getAllDeals(params: Record<string, string | number | undefined> = {}): Promise<DealResponse> {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    const url = queryParams.toString()
      ? `${DEAL_API_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
      : DEAL_API_ENDPOINTS.GET_ALL;

    const response = await axiosInstance.get<DealResponse>(url);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async getDealById(dealId: string): Promise<DealResponse> {
    const response = await axiosInstance.get<DealResponse>(DEAL_API_ENDPOINTS.GET_BY_ID(dealId));
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async createDeal(data: DealFormData): Promise<DealResponse> {
    const response = await axiosInstance.post<DealResponse>(DEAL_API_ENDPOINTS.CREATE, data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async updateDeal(dealId: string, data: Partial<DealFormData>): Promise<DealResponse> {
    const response = await axiosInstance.patch<DealResponse>(DEAL_API_ENDPOINTS.UPDATE(dealId), data);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async deleteDeal(dealId: string): Promise<Pick<DealResponse, 'status' | 'message'>> {
    const response = await axiosInstance.delete<DealResponse>(DEAL_API_ENDPOINTS.DELETE(dealId));
    return {
      status: response.data.status,
      message: response.data.message,
    };
  }

  async getDealStages(params: Record<string, string | number | undefined> = {}): Promise<DealResponse> {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    const url = queryParams.toString()
      ? `${DEAL_API_ENDPOINTS.GET_STAGES}?${queryParams.toString()}`
      : DEAL_API_ENDPOINTS.GET_STAGES;

    const response = await axiosInstance.get<DealResponse>(url);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async getDealDropdown(params: Record<string, string | number | undefined> = {}): Promise<DealResponse> {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, String(value));
      }
    });

    const url = queryParams.toString()
      ? `${DEAL_API_ENDPOINTS.GET_DROPDOWN}?${queryParams.toString()}`
      : DEAL_API_ENDPOINTS.GET_DROPDOWN;

    const response = await axiosInstance.get<DealResponse>(url);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }
}

export const dealService = new DealService();
