import axiosInstance from '../../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import { TASK_WORKFLOW_API_ENDPOINTS } from '../constants/index';
import { TaskWorkflowMapper } from '../mappers/taskWorkflow.mapper';
import type { TaskStageFormData } from '../types/request';
import type {
  TaskWorkflowListResponse,
  TaskWorkflowDetailResponse,
  TaskWorkflowCreatedResponse,
  TaskWorkflowSimpleResponse,
} from '../types/response';
import type { TaskWorkflowItem, TaskWorkflowDetail } from '../types/interface';

export class TaskWorkflowService {
  async getAllWorkflows(): Promise<TaskWorkflowItem[]> {
    const response = await axiosInstance.get<TaskWorkflowListResponse>(
      TASK_WORKFLOW_API_ENDPOINTS.GET_ALL,
    );
    return TaskWorkflowMapper.toWorkflowList(response.data.data ?? []);
  }

  async getDefaultWorkflow(): Promise<TaskWorkflowItem | null> {
    try {
      const response = await axiosInstance.get<TaskWorkflowListResponse>(
        TASK_WORKFLOW_API_ENDPOINTS.GET_DEFAULT,
      );
      const data = response.data.data;
      if (Array.isArray(data) && data.length > 0) {
        return TaskWorkflowMapper.toWorkflow(data[0]);
      }
      return null;
    } catch {
      return null;
    }
  }

  async getWorkflow(id: number): Promise<TaskWorkflowDetail> {
    const response = await axiosInstance.get<TaskWorkflowDetailResponse>(
      TASK_WORKFLOW_API_ENDPOINTS.GET_ONE(id),
    );
    return TaskWorkflowMapper.toWorkflowDetail(response.data.data);
  }

  async createWorkflow(name: string): Promise<TaskWorkflowCreatedResponse> {
    const response = await axiosInstance.post<TaskWorkflowCreatedResponse>(
      TASK_WORKFLOW_API_ENDPOINTS.CREATE,
      { name },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async setDefaultWorkflow(id: number): Promise<TaskWorkflowSimpleResponse> {
    const response = await axiosInstance.patch<TaskWorkflowSimpleResponse>(
      TASK_WORKFLOW_API_ENDPOINTS.SET_DEFAULT(id),
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
    });
  }

  async deleteWorkflow(id: number): Promise<TaskWorkflowSimpleResponse> {
    const response = await axiosInstance.delete<TaskWorkflowSimpleResponse>(
      TASK_WORKFLOW_API_ENDPOINTS.DELETE(id),
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
    });
  }

  async createStage(workflowId: number, values: TaskStageFormData): Promise<TaskWorkflowCreatedResponse> {
    const payload = TaskWorkflowMapper.toCreateStagePayload(values);
    const response = await axiosInstance.post<TaskWorkflowCreatedResponse>(
      TASK_WORKFLOW_API_ENDPOINTS.STAGES(workflowId),
      payload,
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async updateStage(
    workflowId: number,
    stageId: number,
    values: TaskStageFormData,
    sortOrder: number,
  ): Promise<TaskWorkflowSimpleResponse> {
    const payload = TaskWorkflowMapper.toUpdateStagePayload(values, sortOrder);
    const response = await axiosInstance.patch<TaskWorkflowSimpleResponse>(
      TASK_WORKFLOW_API_ENDPOINTS.STAGE(workflowId, stageId),
      payload,
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
    });
  }

  async reorderStage(workflowId: number, stageId: number, sortOrder: number): Promise<TaskWorkflowSimpleResponse> {
    const response = await axiosInstance.patch<TaskWorkflowSimpleResponse>(
      TASK_WORKFLOW_API_ENDPOINTS.STAGE(workflowId, stageId),
      { sortOrder },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
    });
  }

  async updateStagePosition(
    workflowId: number,
    stageId: number,
    positionX: number,
    positionY: number,
  ): Promise<TaskWorkflowSimpleResponse> {
    const response = await axiosInstance.patch<TaskWorkflowSimpleResponse>(
      TASK_WORKFLOW_API_ENDPOINTS.STAGE(workflowId, stageId),
      { positionX, positionY },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
    });
  }

  async deleteStage(workflowId: number, stageId: number): Promise<TaskWorkflowSimpleResponse> {
    const response = await axiosInstance.delete<TaskWorkflowSimpleResponse>(
      TASK_WORKFLOW_API_ENDPOINTS.STAGE(workflowId, stageId),
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
    });
  }
}

export const taskWorkflowService = new TaskWorkflowService();
