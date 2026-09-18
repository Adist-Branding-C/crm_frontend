import axiosInstance from '../../../../api/axiosInstance';
import { ServiceResponseUtil } from '../../../../shared/utils/serviceResponse.util';
import { QueryMapper } from '../../../../shared/mappers/query.mapper';
import type { ApiResponse } from '../../../../shared/types/common';
import type { TaskListParams } from '../types/listParams';
import { RepeatType } from '../constants/taskEnums';
import type { UnifiedTaskItem, UnifiedTaskPayload } from '../types/unifiedTask.types';

/**
 * Unified task data service driving the consolidated Tasks module (table,
 * kanban, single add/edit drawer) across all four task types.
 *
 * Used by:
 * - useTableData on the unified TaskPage, kanban services
 * - UseUnifiedTaskDrawer, useTaskCrud (via the page), TaskFormDrawer
 *
 * Notes:
 * - Everything now flows through the unified /tasks endpoints: creates post to
 *   POST /tasks with `taskType` in the payload, edits patch PATCH /tasks/:id.
 *   The task type is chosen by the form, so no per-type endpoint switching is
 *   needed here (calendar keeps its own per-type services untouched).
 * - cleanPayload strips the inactive association fields so only the active
 *   task type's field (and never an empty string) reaches the backend.
 */
class UnifiedTaskDataService {
  private cleanPayload(data: UnifiedTaskPayload): Record<string, unknown> {
    const payload: Record<string, unknown> = { ...data };

    ['leadId', 'dealId', 'campaignId', 'categoryId', 'workflowId', 'stageId'].forEach((key) => {
      const value = payload[key];
      if (value === '') {
        delete payload[key];
      } else if (value !== undefined && value !== null && key !== 'leadId') {
        payload[key] = Number(value);
      }
    });

    const repeatType = data.repeatType;
    const repeatConfig = data.repeatConfig;
    if (repeatConfig && repeatType && repeatType !== RepeatType.NEVER && repeatType !== RepeatType.DAILY) {
      const config: Record<string, unknown> = { ...repeatConfig };
      if (config.dayOfWeek !== undefined && config.dayOfWeek !== null && config.dayOfWeek !== '') {
        config.dayOfWeek = Number(config.dayOfWeek);
      }
      if (
        config.dayOfMonth !== undefined &&
        config.dayOfMonth !== null &&
        config.dayOfMonth !== '' &&
        config.dayOfMonth !== 'last'
      ) {
        config.dayOfMonth = Number(config.dayOfMonth);
      }
      payload.repeatConfig = config;
    } else {
      delete payload.repeatConfig;
    }

    return payload;
  }

  async getAll(params: TaskListParams): Promise<ApiResponse<UnifiedTaskItem[]>> {
    const response = await axiosInstance.get<ApiResponse<UnifiedTaskItem[]>>('/tasks', {
      params: QueryMapper.toQuery(params),
    });
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getById(id: number): Promise<ApiResponse<UnifiedTaskItem>> {
    const response = await axiosInstance.get<ApiResponse<UnifiedTaskItem>>(`/tasks/${id}`);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async create(data: UnifiedTaskPayload): Promise<ApiResponse<UnifiedTaskItem>> {
    const response = await axiosInstance.post<ApiResponse<UnifiedTaskItem>>('/tasks', this.cleanPayload(data));
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async update(id: number, data: UnifiedTaskPayload): Promise<ApiResponse<UnifiedTaskItem>> {
    const response = await axiosInstance.patch<ApiResponse<UnifiedTaskItem>>(
      `/tasks/${id}`,
      this.cleanPayload(data),
    );
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  /**
   * Partial patch used by the table's inline cell edits (Assigned To / Related).
   * Values come straight from option selects, so no payload cleaning applies.
   */
  async updateFields(id: number, data: Partial<UnifiedTaskPayload>): Promise<ApiResponse<UnifiedTaskItem>> {
    const response = await axiosInstance.patch<ApiResponse<UnifiedTaskItem>>(`/tasks/${id}`, data);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    const response = await axiosInstance.delete<ApiResponse<null>>(`/tasks/${id}`);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }

  async getRecurrenceChain(id: number): Promise<ApiResponse<UnifiedTaskItem[]>> {
    const response = await axiosInstance.get<ApiResponse<UnifiedTaskItem[]>>(`/tasks/${id}/recurrence-chain`);
    return ServiceResponseUtil.successResponse({
      status: response.data.status,
      message: response.data.message,
      data: response.data.data,
    });
  }
}

export const unifiedTaskDataService = new UnifiedTaskDataService();