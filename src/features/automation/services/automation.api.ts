import axiosInstance from '../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../shared/utils/serviceResponse.util';
import { QueryMapper } from '../../../shared/mappers/query.mapper';
import { AUTOMATION_API_ENDPOINTS } from '../constants';
import type { ApiResponse } from '../../../shared/types/common';
import type { AutomationListResponse } from '../types/response';
import type { AutomationRule } from '../types/interface';
import type { CreateAutomationPayload, GetAutomationsParams, UpdateAutomationPayload } from '../types/request';

/**
 * HTTP client for the Automation Rules API — communicates with the backend only.
 *
 * Used by:
 * - automationApiService singleton, consumed by useFetchAutomations (list) and
 *   useAutomationApi (create/update/toggle/delete).
 */
class AutomationApiService {
  async getAll(params: GetAutomationsParams): Promise<ApiResponse<AutomationListResponse>> {
    const response = await axiosInstance.get<ApiResponse<AutomationListResponse>>(
      AUTOMATION_API_ENDPOINTS.BASE,
      { params: QueryMapper.toQuery(params) },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getOne(id: string): Promise<ApiResponse<AutomationRule>> {
    const response = await axiosInstance.get<ApiResponse<AutomationRule>>(
      AUTOMATION_API_ENDPOINTS.BY_ID(id),
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async create(payload: CreateAutomationPayload): Promise<ApiResponse<{ id: string }>> {
    const response = await axiosInstance.post<ApiResponse<{ id: string }>>(
      AUTOMATION_API_ENDPOINTS.BASE,
      payload,
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async update(id: string, payload: UpdateAutomationPayload): Promise<ApiResponse<null>> {
    const response = await axiosInstance.patch<ApiResponse<null>>(
      AUTOMATION_API_ENDPOINTS.BY_ID(id),
      payload,
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async toggleStatus(id: string, isActive: boolean): Promise<ApiResponse<null>> {
    const response = await axiosInstance.patch<ApiResponse<null>>(
      AUTOMATION_API_ENDPOINTS.TOGGLE(id),
      { isActive },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async delete(id: string): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(
      AUTOMATION_API_ENDPOINTS.BY_ID(id),
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }
}

export const automationApiService = new AutomationApiService();
