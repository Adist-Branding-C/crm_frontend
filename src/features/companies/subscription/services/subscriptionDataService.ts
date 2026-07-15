import axiosInstance from '../../../../api/axiosInstance';
import {
  SUBSCRIPTIONS_API_ENDPOINTS,
  subscriptionByCompanyId,
  subscriptionHistoryByCompanyId,
  subscriptionStaffCountById,
  subscriptionStatusById,
} from '../constants/subscriptionApiEndpoints';
import type { ApiResponse } from '../../../../shared/types/common';
import type { SubscriptionApiItem, SubscriptionHistoryApiItem } from '../types/response';
import type { CreateSubscriptionPayload, UpdateStaffCountPayload, UpdateSubscriptionStatusPayload } from '../types/request';

class SubscriptionDataService {
  async getByCompanyId(companyId: string): Promise<ApiResponse<SubscriptionApiItem>> {
    const response = await axiosInstance.get<ApiResponse<SubscriptionApiItem>>(subscriptionByCompanyId(companyId));
    return response.data;
  }

  async getHistoryByCompanyId(companyId: string): Promise<ApiResponse<SubscriptionHistoryApiItem[]>> {
    const response = await axiosInstance.get<ApiResponse<SubscriptionHistoryApiItem[]>>(subscriptionHistoryByCompanyId(companyId));
    return response.data;
  }

  async createSubscription(payload: CreateSubscriptionPayload): Promise<ApiResponse<{ id: string }>> {
    const response = await axiosInstance.post<ApiResponse<{ id: string }>>(SUBSCRIPTIONS_API_ENDPOINTS.SUBSCRIPTIONS, payload);
    return response.data;
  }

  async updateStaffCount(id: string, payload: UpdateStaffCountPayload): Promise<ApiResponse<null>> {
    const response = await axiosInstance.patch<ApiResponse<null>>(subscriptionStaffCountById(id), payload);
    return response.data;
  }

  async updateStatus(id: string, payload: UpdateSubscriptionStatusPayload): Promise<ApiResponse<null>> {
    const response = await axiosInstance.patch<ApiResponse<null>>(subscriptionStatusById(id), payload);
    return response.data;
  }
}

export const subscriptionDataService = new SubscriptionDataService();
