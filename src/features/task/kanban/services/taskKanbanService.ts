import axiosInstance from '../../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import type { ApiResponse, PaginationMeta } from '../../../../shared/types/common';
import type { TaskKanbanStage, TaskKanbanResponse, TaskKanbanTask } from '../types/kanban.types';
import type { TaskWorkflowItem } from '../../../task-settings/task-workflow/types/interface';
import { TaskWorkflowMapper } from '../../../task-settings/task-workflow/mappers/taskWorkflow.mapper';
import { TaskKanbanMapper } from '../mappers/taskKanban.mapper';

const TASK_KANBAN_ENDPOINTS = {
  KANBAN: '/tasks/kanban',
  MOVE_STAGE: (taskId: number) => `/tasks/${taskId}/stage`,
  WORKFLOWS: '/task-workflows',
};

export class TaskKanbanService {
  async getKanban(workflowId: string, taskType?: string): Promise<TaskKanbanStage[]> {
    const params: Record<string, string> = { workflowId };
    if (taskType) params.type = taskType;
    const response = await axiosInstance.get<TaskKanbanResponse>(
      TASK_KANBAN_ENDPOINTS.KANBAN,
      { params },
    );
    return TaskKanbanMapper.toStages(response.data?.data?.stages);
  }

  async loadMoreStage(
    workflowId: string,
    stageId: string,
    pageNumber: number,
    limit: number,
    taskType?: string,
  ): Promise<{ stageId: string; items: TaskKanbanTask[]; pagination: PaginationMeta }> {
    const params: Record<string, string | number> = { workflowId, pageNumber, limit };
    if (taskType) params.type = taskType;
    const response = await axiosInstance.get<TaskKanbanResponse>(
      TASK_KANBAN_ENDPOINTS.KANBAN,
      { params },
    );
    const stages = TaskKanbanMapper.toStages(response.data?.data?.stages);
    const stage = stages.find((s) => s.stageId === String(stageId));
    if (!stage) throw new Error('Stage not found');
    return { stageId: stage.stageId, items: stage.items, pagination: stage.pagination };
  }

  async moveTask(taskId: number, stageId: string): Promise<ApiResponse<null>> {
    const response = await axiosInstance.patch<ApiResponse<null>>(
      TASK_KANBAN_ENDPOINTS.MOVE_STAGE(taskId),
      { stageId },
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getWorkflows(): Promise<TaskWorkflowItem[]> {
    const response = await axiosInstance.get(TASK_KANBAN_ENDPOINTS.WORKFLOWS);
    return TaskWorkflowMapper.toWorkflowList(response.data.data ?? []);
  }
}

export const taskKanbanService = new TaskKanbanService();
