import axiosInstance from '../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../shared/utils/serviceResponse.util';
import { PIPELINE_API_ENDPOINTS } from '../constants/pipelineApiEndpoints';
import type { ApiResponse } from '../../../shared/types/common';
import type { GetPipelineParams } from '../types/request';
import type {
  PipelineDealsResponseData,
  StatusDealsResponseData,
  PipelineLeadsResponseData,
  StatusLeadsResponseData,
  TasksResponseData,
  StatusTasksResponseData,
} from '../types/response';


class PipelineService {
  async getLeads(
    params: Partial<GetPipelineParams>,
  ): Promise<ApiResponse<PipelineLeadsResponseData>> {
    const response = await axiosInstance.get<
      ApiResponse<PipelineLeadsResponseData>
    >(PIPELINE_API_ENDPOINTS.LEADS, { params });
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getDeals(
    params: Partial<GetPipelineParams>,
  ): Promise<ApiResponse<PipelineDealsResponseData>> {
    const response = await axiosInstance.get<
      ApiResponse<PipelineDealsResponseData>
    >(PIPELINE_API_ENDPOINTS.DEALS, { params });
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getTasks(
    params: Partial<GetPipelineParams>,
  ): Promise<ApiResponse<TasksResponseData>> {
    const response = await axiosInstance.get<ApiResponse<TasksResponseData>>(
      PIPELINE_API_ENDPOINTS.TASKS,
      { params },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getStatusDeals(
    statusId: number,
    skip: number,
    limit: number,
  ): Promise<ApiResponse<StatusDealsResponseData>> {
    const response = await axiosInstance.get<
      ApiResponse<StatusDealsResponseData>
    >(PIPELINE_API_ENDPOINTS.STATUS_DEALS, {
      params: { statusId, skip, limit },
    });
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getStatusLeads(
    statusId: string,
    skip: number,
    limit: number,
  ): Promise<ApiResponse<StatusLeadsResponseData>> {
    const response = await axiosInstance.get<
      ApiResponse<StatusLeadsResponseData>
    >(PIPELINE_API_ENDPOINTS.STATUS_LEADS, {
      params: { statusId, skip, limit },
    });
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getStatusTasks(
    statusId: string,
    skip: number,
    limit: number,
  ): Promise<ApiResponse<StatusTasksResponseData>> {
    const response = await axiosInstance.get<
      ApiResponse<StatusTasksResponseData>
    >(PIPELINE_API_ENDPOINTS.STATUS_TASKS, {
      params: { statusId, skip, limit },
    });
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }
}

export const pipelineService = new PipelineService();
