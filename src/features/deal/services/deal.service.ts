import axiosInstance from '../../../api/axiosInstance';
import { QueryMapper } from '../../../shared/mappers/query.mapper';
import { DEAL_API_ENDPOINTS } from '../constants/dealApiEndpoints';
import type { DealFormData } from '../types/interface';
import type { GetDealsParams } from '../types/request';

class DealService {
  async getAllDeals(params: GetDealsParams) {
    const response = await axiosInstance.get(DEAL_API_ENDPOINTS.GET_ALL, {
      params: QueryMapper.toQuery(params),
    });
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async getDealById(dealId: string) {
    const response = await axiosInstance.get(DEAL_API_ENDPOINTS.GET_BY_ID(dealId));
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async createDeal(payload: DealFormData) {
    const response = await axiosInstance.post(DEAL_API_ENDPOINTS.CREATE, payload);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async updateDeal(dealId: string, payload: Partial<DealFormData>) {
    const response = await axiosInstance.patch(DEAL_API_ENDPOINTS.UPDATE(dealId), payload);
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async deleteDeal(dealId: string) {
    const response = await axiosInstance.delete(DEAL_API_ENDPOINTS.DELETE(dealId));
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async getDealStages(params: Record<string, string | number> = {}) {
    const response = await axiosInstance.get(DEAL_API_ENDPOINTS.GET_STAGES, {
      params: QueryMapper.toQuery(params),
    });
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }

  async getDealDropdown(params: Record<string, string | number> = {}) {
    const response = await axiosInstance.get(DEAL_API_ENDPOINTS.GET_DROPDOWN, {
      params: QueryMapper.toQuery(params),
    });
    return {
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    };
  }
}

export const dealService = new DealService();
