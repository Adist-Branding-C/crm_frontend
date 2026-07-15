import axiosInstance from '../../../api/axiosInstance';
import type { LeadsGroupedResponse, DealsResponse, TasksResponse, StatusDealsResponse, StatusLeadsResponse, StatusTasksResponse } from '../types/pipeline.types';
import { PIPELINE_API_ENDPOINTS } from '../constants/pipelineApiEndpoints';

class PipelineService {
  async getLeads(params?: Record<string, string>): Promise<LeadsGroupedResponse> {
    const response = await axiosInstance.get<LeadsGroupedResponse>(PIPELINE_API_ENDPOINTS.LEADS, { params });
    return response.data;
  }

  async getDeals(params?: Record<string, string>): Promise<DealsResponse> {
    const response = await axiosInstance.get<DealsResponse>(PIPELINE_API_ENDPOINTS.DEALS, { params });
    return response.data;
  }

  async getTasks(params?: Record<string, string>): Promise<TasksResponse> {
    const response = await axiosInstance.get<TasksResponse>(PIPELINE_API_ENDPOINTS.TASKS, { params });
    return response.data;
  }

  async getStatusDeals(statusId: number, skip: number, limit: number): Promise<StatusDealsResponse> {
    const response = await axiosInstance.get<StatusDealsResponse>(PIPELINE_API_ENDPOINTS.STATUS_DEALS, {
      params: { statusId, skip, limit },
    });
    return response.data;
  }

  async getStatusLeads(statusId: number, skip: number, limit: number): Promise<StatusLeadsResponse> {
    const response = await axiosInstance.get<StatusLeadsResponse>(PIPELINE_API_ENDPOINTS.STATUS_LEADS, {
      params: { statusId, skip, limit },
    });
    return response.data;
  }

  async getStatusTasks(statusId: string, skip: number, limit: number): Promise<StatusTasksResponse> {
    const response = await axiosInstance.get<StatusTasksResponse>(PIPELINE_API_ENDPOINTS.STATUS_TASKS, {
      params: { statusId, skip, limit },
    });
    return response.data;
  }
}

export const pipelineService = new PipelineService();
