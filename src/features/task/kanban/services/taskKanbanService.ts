import axiosInstance from '../../../../api/axiosInstance';
import type { TaskWorkflowItem } from '../../../task-settings/task-workflow/types/interface';
import { TaskWorkflowMapper } from '../../../task-settings/task-workflow/mappers/taskWorkflow.mapper';

const TASK_KANBAN_ENDPOINTS = {
  WORKFLOWS: '/task-workflows',
};

/**
 * Workflow list for the kanban board's workflow picker.
 *
 * Used by:
 * - useSelectedWorkflow
 *
 * Notes:
 * - Board data, load-more and stage moves moved to RTK Query (task/common/services/taskApi.ts).
 *   Workflows stay here because task-settings still creates/edits them through its own service,
 *   so caching them in RTK Query without that module invalidating would show stale workflows.
 */
export class TaskKanbanService {
  async getWorkflows(): Promise<TaskWorkflowItem[]> {
    const response = await axiosInstance.get(TASK_KANBAN_ENDPOINTS.WORKFLOWS);
    return TaskWorkflowMapper.toWorkflowList(response.data.data ?? []);
  }
}

export const taskKanbanService = new TaskKanbanService();
