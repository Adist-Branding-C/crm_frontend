import axiosInstance from '../../../api/axiosInstance';
import type { ApiResponse } from '../../../shared/types/common';
import type { TriggerConfig, TriggerType, ActionType, ActionConfig } from '../types';
import type {
  AutomationRuleApiItem,
  ExecutionLogApiItem,
  WebhookHistoryApiItem,
  WebhookEndpointApiItem,
  PaginatedApiResponse,
} from '../types/response';

export interface AutomationRuleActionPayload {
  actionType: ActionType;
  actionConfig: ActionConfig;
  executionOrder?: number;
  isActive?: boolean;
}

export interface AutomationRulePayload {
  name: string;
  description?: string;
  isActive?: boolean;
  triggerType: TriggerType;
  triggerConfig: TriggerConfig;
  actions?: AutomationRuleActionPayload[];
}

export interface GetAutomationRulesParams {
  pageNumber?: number;
  limit?: number;
  search?: string;
  triggerType?: TriggerType | '';
  isActive?: boolean | '';
}

class AutomationRulesApi {
  async getRules(params: GetAutomationRulesParams): Promise<ApiResponse<PaginatedApiResponse<AutomationRuleApiItem>>> {
    const query: Record<string, string | number> = {
      pageNumber: params.pageNumber ?? 1,
      limit: params.limit ?? 100,
    };
    if (params.search) query.search = params.search;
    if (params.triggerType) query.triggerType = params.triggerType;
    if (params.isActive !== '' && params.isActive !== undefined) query.isActive = String(params.isActive);

    const response = await axiosInstance.get('/automation-rules', { params: query });
    return response.data;
  }

  async getRule(id: number): Promise<ApiResponse<AutomationRuleApiItem>> {
    const response = await axiosInstance.get(`/automation-rules/${id}`);
    return response.data;
  }

  async createRule(payload: AutomationRulePayload): Promise<ApiResponse<{ id: number }>> {
    const response = await axiosInstance.post('/automation-rules', payload);
    return response.data;
  }

  async updateRule(id: number, payload: AutomationRulePayload): Promise<ApiResponse<null>> {
    const response = await axiosInstance.patch(`/automation-rules/${id}`, payload);
    return response.data;
  }

  async toggleRule(id: number): Promise<ApiResponse<{ isActive: boolean }>> {
    const response = await axiosInstance.patch(`/automation-rules/${id}/toggle`, {});
    return response.data;
  }

  async deleteRule(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete(`/automation-rules/${id}`);
    return response.data;
  }

  async getExecutionLogs(
    automationRuleId: number,
    params: { pageNumber?: number; limit?: number; status?: string; dateFrom?: string; dateTo?: string },
  ): Promise<ApiResponse<PaginatedApiResponse<ExecutionLogApiItem>>> {
    const query: Record<string, string | number> = {
      pageNumber: params.pageNumber ?? 1,
      limit: params.limit ?? 20,
    };
    if (params.status) query.status = params.status;
    if (params.dateFrom) query.dateFrom = params.dateFrom;
    if (params.dateTo) query.dateTo = params.dateTo;

    const response = await axiosInstance.get(`/automation-rules/${automationRuleId}/execution-logs`, { params: query });
    return response.data;
  }

  async getWebhookHistory(executionLogId: number): Promise<ApiResponse<WebhookHistoryApiItem[]>> {
    const response = await axiosInstance.get(`/execution-logs/${executionLogId}/webhook-history`);
    return response.data;
  }

  async retryExecutionLog(executionLogId: number): Promise<ApiResponse<{ status: string }>> {
    const response = await axiosInstance.post(`/execution-logs/${executionLogId}/retry`, {});
    return response.data;
  }

  async getWebhookEndpoints(): Promise<ApiResponse<WebhookEndpointApiItem[]>> {
    const response = await axiosInstance.get('/webhook-endpoints');
    return response.data;
  }

  async getWebhookHistoryList(params: {
    pageNumber?: number;
    limit?: number;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    webhookEndpointId?: number;
  }): Promise<ApiResponse<PaginatedApiResponse<WebhookHistoryApiItem>>> {
    const query: Record<string, string | number> = {
      pageNumber: params.pageNumber ?? 1,
      limit: params.limit ?? 20,
    };
    if (params.status) query.status = params.status;
    if (params.dateFrom) query.dateFrom = params.dateFrom;
    if (params.dateTo) query.dateTo = params.dateTo;
    if (params.webhookEndpointId) query.webhookEndpointId = params.webhookEndpointId;

    const response = await axiosInstance.get('/webhook-endpoints/history', { params: query });
    return response.data;
  }
}

export const automationRulesApi = new AutomationRulesApi();
