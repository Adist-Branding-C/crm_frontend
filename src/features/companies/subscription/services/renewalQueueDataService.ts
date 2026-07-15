import axiosInstance from '../../../../api/axiosInstance';
import {
  RENEWAL_QUEUE_API_ENDPOINTS,
  queueByCompanyId,
  queueById,
  applyQueueNow,
} from '../constants/subscriptionApiEndpoints';
import type { ApiResponse } from '../../../../shared/types/common';
import type { RenewalQueueApiItem } from '../types/response';
import type { CreateRenewalQueuePayload, UpdateRenewalQueuePayload } from '../types/request';

class RenewalQueueDataService {
  async getByCompanyId(companyId: string): Promise<ApiResponse<RenewalQueueApiItem>> {
    const response = await axiosInstance.get<ApiResponse<RenewalQueueApiItem>>(queueByCompanyId(companyId));
    return response.data;
  }

  async create(payload: CreateRenewalQueuePayload): Promise<ApiResponse<{ id: string }>> {
    const response = await axiosInstance.post<ApiResponse<{ id: string }>>(RENEWAL_QUEUE_API_ENDPOINTS.QUEUES, payload);
    return response.data;
  }

  async update(id: string, payload: UpdateRenewalQueuePayload): Promise<ApiResponse<null>> {
    const response = await axiosInstance.patch<ApiResponse<null>>(queueById(id), payload);
    return response.data;
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(queueById(id));
    return response.data;
  }

  async applyNow(id: string): Promise<ApiResponse<null>> {
    const response = await axiosInstance.post<ApiResponse<null>>(applyQueueNow(id));
    return response.data;
  }
}

export const renewalQueueDataService = new RenewalQueueDataService();
