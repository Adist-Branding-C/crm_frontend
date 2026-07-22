import axiosInstance from '../../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
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

/**
 * HTTP client for the company Subscription API - communicates with the backend only.
 *
 * Used by:
 * - useCompanySubscription hook (Company Subscription Management page)
 */
class SubscriptionDataService {
  async getByCompanyId(companyId: string): Promise<ApiResponse<SubscriptionApiItem>> {
    const response = await axiosInstance.get<ApiResponse<SubscriptionApiItem>>(subscriptionByCompanyId(companyId));
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getHistoryByCompanyId(companyId: string): Promise<ApiResponse<SubscriptionHistoryApiItem[]>> {
    const response = await axiosInstance.get<ApiResponse<SubscriptionHistoryApiItem[]>>(subscriptionHistoryByCompanyId(companyId));
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async createSubscription(payload: CreateSubscriptionPayload): Promise<ApiResponse<{ id: string }>> {
    const response = await axiosInstance.post<ApiResponse<{ id: string }>>(SUBSCRIPTIONS_API_ENDPOINTS.SUBSCRIPTIONS, payload);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async updateStaffCount(id: string, payload: UpdateStaffCountPayload): Promise<ApiResponse<null>> {
    const response = await axiosInstance.patch<ApiResponse<null>>(subscriptionStaffCountById(id), payload);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async updateStatus(id: string, payload: UpdateSubscriptionStatusPayload): Promise<ApiResponse<null>> {
    const response = await axiosInstance.patch<ApiResponse<null>>(subscriptionStatusById(id), payload);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }
}

export const subscriptionDataService = new SubscriptionDataService();
