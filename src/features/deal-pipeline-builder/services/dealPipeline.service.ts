import axiosInstance from '../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../shared/utils/serviceResponse.util';
import { DEAL_PIPELINE_API_ENDPOINTS } from '../constants/dealPipelineApiEndpoints';
import { DealPipelineMapper } from '../mappers/dealPipeline.mapper';
import type { DealStageFormData, CreateTransitionPayload } from '../types/request';
import type {
  DealPipelineListResponse,
  DealPipelineDetailResponse,
  CreatedResponse,
  SimpleResponse,
} from '../types/response';
import type { DealPipelineItem, DealPipelineDetail } from '../types/interface';

class DealPipelineService {
  async getAllPipelines(): Promise<DealPipelineItem[]> {
    const response = await axiosInstance.get<DealPipelineListResponse>(
      DEAL_PIPELINE_API_ENDPOINTS.GET_ALL,
    );
    return DealPipelineMapper.toPipelineList(response.data.data ?? []);
  }

  async getPipeline(id: number): Promise<DealPipelineDetail> {
    const response = await axiosInstance.get<DealPipelineDetailResponse>(
      DEAL_PIPELINE_API_ENDPOINTS.GET_ONE(id),
    );
    return DealPipelineMapper.toPipelineDetail(response.data.data);
  }

  async createPipeline(name: string): Promise<CreatedResponse> {
    const response = await axiosInstance.post<CreatedResponse>(
      DEAL_PIPELINE_API_ENDPOINTS.CREATE,
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
      DEAL_PIPELINE_API_ENDPOINTS.SET_DEFAULT(id),
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
    });
  }

  async activatePipeline(id: number): Promise<SimpleResponse> {
    const response = await axiosInstance.post<SimpleResponse>(
      DEAL_PIPELINE_API_ENDPOINTS.ACTIVATE(id),
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
    });
  }

  async deletePipeline(id: number): Promise<SimpleResponse> {
    const response = await axiosInstance.delete<SimpleResponse>(
      DEAL_PIPELINE_API_ENDPOINTS.DELETE(id),
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
    });
  }

  async createStage(pipelineId: number, values: DealStageFormData): Promise<CreatedResponse> {
    const payload = DealPipelineMapper.toCreateStagePayload(values);
    const response = await axiosInstance.post<CreatedResponse>(
      DEAL_PIPELINE_API_ENDPOINTS.STAGES(pipelineId),
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
    stageId: number,
    values: DealStageFormData,
  ): Promise<SimpleResponse> {
    const payload = DealPipelineMapper.toUpdateStagePayload(values);
    const response = await axiosInstance.patch<SimpleResponse>(
      DEAL_PIPELINE_API_ENDPOINTS.STAGE(pipelineId, stageId),
      payload,
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
    });
  }

  async updateStagePosition(
    pipelineId: number,
    stageId: number,
    x: number,
    y: number,
  ): Promise<SimpleResponse> {
    const payload = DealPipelineMapper.toPositionPayload(x, y);
    const response = await axiosInstance.patch<SimpleResponse>(
      DEAL_PIPELINE_API_ENDPOINTS.STAGE(pipelineId, stageId),
      payload,
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
    });
  }

  async reorderStage(
    pipelineId: number,
    stageId: number,
    sortOrder: number,
  ): Promise<SimpleResponse> {
    const response = await axiosInstance.patch<SimpleResponse>(
      DEAL_PIPELINE_API_ENDPOINTS.STAGE(pipelineId, stageId),
      { sortOrder },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
    });
  }

  async deleteStage(
    pipelineId: number,
    stageId: number,
    reassignToStageId?: number,
  ): Promise<SimpleResponse> {
    const response = await axiosInstance.delete<SimpleResponse>(
      DEAL_PIPELINE_API_ENDPOINTS.STAGE(pipelineId, stageId),
      { data: reassignToStageId !== undefined ? { reassignToStageId } : {} },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
    });
  }

  async createTransition(
    pipelineId: number,
    payload: CreateTransitionPayload,
  ): Promise<CreatedResponse> {
    const response = await axiosInstance.post<CreatedResponse>(
      DEAL_PIPELINE_API_ENDPOINTS.TRANSITIONS(pipelineId),
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
      DEAL_PIPELINE_API_ENDPOINTS.TRANSITION(pipelineId, transitionId),
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
    });
  }
}

export const dealPipelineService = new DealPipelineService();
