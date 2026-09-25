import axiosInstance from '../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../shared/utils/serviceResponse.util';
import { LEAD_PIPELINE_API_ENDPOINTS } from '../constants/leadPipelineApiEndpoints';
import { LeadPipelineMapper } from '../mappers/leadPipeline.mapper';
import type { LeadStageFormData, CreateTransitionPayload } from '../types/request';
import type {
  LeadPipelineListResponse,
  LeadPipelineDetailResponse,
  CreatedPipelineResponse,
  CreatedStageResponse,
  CreatedTransitionResponse,
  SimpleResponse,
} from '../types/response';
import type { LeadPipelineItem, LeadPipelineDetail } from '../types/interface';


class LeadPipelineService {
  async getAllPipelines(): Promise<LeadPipelineItem[]> {
    const response = await axiosInstance.get<LeadPipelineListResponse>(
      LEAD_PIPELINE_API_ENDPOINTS.GET_ALL,
    );
    return LeadPipelineMapper.toPipelineList(response.data.data ?? []);
  }

  async getPipeline(id: number): Promise<LeadPipelineDetail> {
    const response = await axiosInstance.get<LeadPipelineDetailResponse>(
      LEAD_PIPELINE_API_ENDPOINTS.GET_ONE(id),
    );
    return LeadPipelineMapper.toPipelineDetail(response.data.data);
  }

  async createPipeline(name: string): Promise<CreatedPipelineResponse> {
    const response = await axiosInstance.post<CreatedPipelineResponse>(
      LEAD_PIPELINE_API_ENDPOINTS.CREATE,
      { name },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async setDefaultPipeline(id: number): Promise<SimpleResponse> {
    const response = await axiosInstance.patch<SimpleResponse>(
      LEAD_PIPELINE_API_ENDPOINTS.SET_DEFAULT(id),
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
    });
  }

  async deletePipeline(id: number): Promise<SimpleResponse> {
    const response = await axiosInstance.delete<SimpleResponse>(
      LEAD_PIPELINE_API_ENDPOINTS.DELETE(id),
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
    });
  }

  async createStage(pipelineId: number, values: LeadStageFormData): Promise<CreatedStageResponse> {
    const payload = LeadPipelineMapper.toCreateStagePayload(values);
    const response = await axiosInstance.post<CreatedStageResponse>(
      LEAD_PIPELINE_API_ENDPOINTS.STAGES(pipelineId),
      payload,
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async updateStage(
    pipelineId: number,
    statusId: string,
    values: LeadStageFormData,
  ): Promise<SimpleResponse> {
    const payload = LeadPipelineMapper.toUpdateStagePayload(values);
    const response = await axiosInstance.patch<SimpleResponse>(
      LEAD_PIPELINE_API_ENDPOINTS.STAGE(pipelineId, statusId),
      payload,
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
    });
  }

  async updateStagePosition(
    pipelineId: number,
    statusId: string,
    x: number,
    y: number,
  ): Promise<SimpleResponse> {
    const payload = LeadPipelineMapper.toPositionPayload(x, y);
    const response = await axiosInstance.patch<SimpleResponse>(
      LEAD_PIPELINE_API_ENDPOINTS.STAGE(pipelineId, statusId),
      payload,
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
    });
  }

  async reorderStage(
    pipelineId: number,
    statusId: string,
    sortOrder: number,
  ): Promise<SimpleResponse> {
    const response = await axiosInstance.patch<SimpleResponse>(
      LEAD_PIPELINE_API_ENDPOINTS.STAGE(pipelineId, statusId),
      { sortOrder },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
    });
  }

  async deleteStage(
    pipelineId: number,
    statusId: string,
    reassignToStatusId?: string,
  ): Promise<SimpleResponse> {
    const response = await axiosInstance.delete<SimpleResponse>(
      LEAD_PIPELINE_API_ENDPOINTS.STAGE(pipelineId, statusId),
      { data: reassignToStatusId !== undefined ? { reassignToStatusId } : {} },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
    });
  }

  async createTransition(
    pipelineId: number,
    payload: CreateTransitionPayload,
  ): Promise<CreatedTransitionResponse> {
    const response = await axiosInstance.post<CreatedTransitionResponse>(
      LEAD_PIPELINE_API_ENDPOINTS.TRANSITIONS(pipelineId),
      payload,
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async deleteTransition(pipelineId: number, transitionId: number): Promise<SimpleResponse> {
    const response = await axiosInstance.delete<SimpleResponse>(
      LEAD_PIPELINE_API_ENDPOINTS.TRANSITION(pipelineId, transitionId),
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
    });
  }
}

export const leadPipelineService = new LeadPipelineService();
