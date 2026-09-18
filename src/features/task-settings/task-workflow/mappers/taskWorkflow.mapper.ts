import type {
  TaskWorkflowItem,
  TaskWorkflowDetail,
  TaskWorkflowStage,
} from '../types/interface';
import type { TaskStageFormData } from '../types/request';

/**
 * Maps between the task-workflow API response shapes and the feature's
 * UI-facing interfaces, and builds request payloads.
 *
 * Used by:
 * - taskWorkflow.service.ts (response side)
 * - useTaskWorkflowDetail (payload side)
 */
export class TaskWorkflowMapper {
  static toWorkflowList(raw: unknown[]): TaskWorkflowItem[] {
    return (raw ?? []).map((item) => TaskWorkflowMapper.toWorkflow(item));
  }

  static toWorkflow(raw: unknown): TaskWorkflowItem {
    const r = raw as Record<string, unknown>;
    return {
      id: String(r.id),
      name: String(r.name ?? ''),
      isDefault: Boolean(r.isDefault),
      isActive: Boolean(r.isActive),
      stages: Array.isArray(r.stages) ? (r.stages as unknown[]).map(TaskWorkflowMapper.toStage) : [],
      createdAt: r.createdAt as string | undefined,
      updatedAt: r.updatedAt as string | undefined,
    };
  }

  static toWorkflowDetail(raw: unknown): TaskWorkflowDetail {
    const r = raw as Record<string, unknown>;
    return {
      ...TaskWorkflowMapper.toWorkflow(r),
      stages: Array.isArray(r.stages) ? (r.stages as unknown[]).map(TaskWorkflowMapper.toStage) : [],
    };
  }

  static toStage(raw: unknown): TaskWorkflowStage {
    const r = raw as Record<string, unknown>;
    return {
      id: String(r.id),
      name: String(r.name ?? ''),
      color: String(r.color ?? '#2563eb'),
      sortOrder: Number(r.sortOrder ?? 0),
      positionX: r.positionX != null ? Number(r.positionX) : null,
      positionY: r.positionY != null ? Number(r.positionY) : null,
    };
  }

  static toCreateStagePayload(values: TaskStageFormData) {
    return {
      name: values.name.trim(),
      color: values.color,
    };
  }

  static toUpdateStagePayload(values: TaskStageFormData, sortOrder: number) {
    return {
      name: values.name.trim(),
      color: values.color,
      sortOrder,
    };
  }
}
