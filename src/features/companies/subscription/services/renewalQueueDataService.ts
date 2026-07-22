import axiosInstance from '../../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import {
  RENEWAL_QUEUE_API_ENDPOINTS,
  queueByCompanyId,
  queueById,
  applyQueueNow,
} from '../constants/subscriptionApiEndpoints';
import type { ApiResponse } from '../../../../shared/types/common';
import type { RenewalQueueApiItem } from '../types/response';
import type { CreateRenewalQueuePayload, UpdateRenewalQueuePayload } from '../types/request';

/**
 * HTTP client for the subscription renewal-queue API - communicates with the backend only.
 *
 * Used by:
 * - useRenewalQueue hook (Company Subscription Management page)
 */
class RenewalQueueDataService {
  async getByCompanyId(companyId: string): Promise<ApiResponse<RenewalQueueApiItem>> {
    const response = await axiosInstance.get<ApiResponse<RenewalQueueApiItem>>(queueByCompanyId(companyId));
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async create(payload: CreateRenewalQueuePayload): Promise<ApiResponse<{ id: string }>> {
    const response = await axiosInstance.post<ApiResponse<{ id: string }>>(RENEWAL_QUEUE_API_ENDPOINTS.QUEUES, payload);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async update(id: string, payload: UpdateRenewalQueuePayload): Promise<ApiResponse<null>> {
    const response = await axiosInstance.patch<ApiResponse<null>>(queueById(id), payload);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(queueById(id));
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async applyNow(id: string): Promise<ApiResponse<null>> {
    const response = await axiosInstance.post<ApiResponse<null>>(applyQueueNow(id));
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }
}

export const renewalQueueDataService = new RenewalQueueDataService();
