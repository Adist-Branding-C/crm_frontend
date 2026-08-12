import axiosInstance from '../../../api/axiosInstance';
import type { ApiResponse } from '../../../shared/types/common';
import { FACEBOOK_API_ENDPOINTS } from '../constants/facebookApiEndpoints';
import type {
  CreateWorkflowPayload,
  FacebookConnection,
  FacebookFormSummary,
  FacebookLeadEvent,
  FacebookPageSummary,
  MappingOptions,
  OAuthCallbackResult,
  UpdateWorkflowPayload,
  Workflow,
} from '../types';
import type { PaginatedLeadsResponse } from '../types/response';

export interface GetLeadsParams {
  status?: string | undefined;
  workflowId?: string | undefined;
  from?: string | undefined;
  to?: string | undefined;
  pageNumber?: number;
  limit?: number;
}

class FacebookApi {
  async handleOAuthCallback(code: string): Promise<ApiResponse<OAuthCallbackResult>> {
    const response = await axiosInstance.post(FACEBOOK_API_ENDPOINTS.OAUTH_CALLBACK, { code });
    return response.data;
  }

  async listConnections(): Promise<ApiResponse<FacebookConnection[]>> {
    const response = await axiosInstance.get(FACEBOOK_API_ENDPOINTS.CONNECTIONS);
    return response.data;
  }

  async disconnect(connectionId: string): Promise<ApiResponse<{ disconnected: boolean; workflowsDeactivated: number }>> {
    const response = await axiosInstance.delete(FACEBOOK_API_ENDPOINTS.CONNECTIONS + `/${connectionId}`);
    return response.data;
  }

  async listPages(connectionId: string): Promise<ApiResponse<FacebookPageSummary[]>> {
    const response = await axiosInstance.get(FACEBOOK_API_ENDPOINTS.CONNECTION_PAGES(connectionId));
    return response.data;
  }

  async listForms(pageId: string, connectionId: string): Promise<ApiResponse<FacebookFormSummary[]>> {
    const response = await axiosInstance.get(FACEBOOK_API_ENDPOINTS.PAGE_FORMS(pageId), { params: { connectionId } });
    return response.data;
  }

  async getMappingOptions(): Promise<ApiResponse<MappingOptions>> {
    const response = await axiosInstance.get(FACEBOOK_API_ENDPOINTS.MAPPING_OPTIONS);
    return response.data;
  }

  async listWorkflows(): Promise<ApiResponse<Workflow[]>> {
    const response = await axiosInstance.get(FACEBOOK_API_ENDPOINTS.WORKFLOWS);
    return response.data;
  }

  async getWorkflow(id: string): Promise<ApiResponse<Workflow>> {
    const response = await axiosInstance.get(FACEBOOK_API_ENDPOINTS.WORKFLOW_BY_ID(id));
    return response.data;
  }

  async createWorkflow(payload: CreateWorkflowPayload): Promise<ApiResponse<{ workflowId: string; status: string; subscriptionWarning?: string }>> {
    const response = await axiosInstance.post(FACEBOOK_API_ENDPOINTS.WORKFLOWS, payload);
    return response.data;
  }

  async updateWorkflow(
    id: string,
    payload: UpdateWorkflowPayload,
  ): Promise<ApiResponse<{ workflowId: string; status: string; subscriptionWarning?: string }>> {
    const response = await axiosInstance.patch(FACEBOOK_API_ENDPOINTS.WORKFLOW_BY_ID(id), payload);
    return response.data;
  }

  async deleteWorkflow(id: string): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete(FACEBOOK_API_ENDPOINTS.WORKFLOW_BY_ID(id));
    return response.data;
  }

  async getLeads(params: GetLeadsParams): Promise<ApiResponse<PaginatedLeadsResponse<FacebookLeadEvent>>> {
    const response = await axiosInstance.get(FACEBOOK_API_ENDPOINTS.LEADS, { params });
    return response.data;
  }

  async getLead(id: string): Promise<ApiResponse<FacebookLeadEvent>> {
    const response = await axiosInstance.get(FACEBOOK_API_ENDPOINTS.LEAD_BY_ID(id));
    return response.data;
  }
}

export const facebookApi = new FacebookApi();
