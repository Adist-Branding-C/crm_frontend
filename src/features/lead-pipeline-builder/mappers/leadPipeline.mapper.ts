import type { LeadPipelineItem, LeadPipelineDetail, LeadStageItem, LeadStageTransitionItem } from '../types/interface';
import type { LeadStageFormData, UpdateStagePositionPayload } from '../types/request';

/**
 * Maps between the lead-pipeline-builder API's response shapes and the
 * feature's UI-facing interfaces, and builds request payloads.
 *
 * Used by:
 * - leadPipeline.service.ts (response side)
 * - useLeadPipelineList / useStageFormDrawer (payload side)
 */
export class LeadPipelineMapper {
  static toPipelineList(raw: unknown[]): LeadPipelineItem[] {
    return (raw ?? []).map((item) => LeadPipelineMapper.toPipeline(item));
  }

  static toPipeline(raw: unknown): LeadPipelineItem {
    const r = raw as LeadPipelineItem;
    return {
      id: String(r.id),
      name: r.name,
      isDefault: r.isDefault,
      isActive: r.isActive,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    };
  }

  static toPipelineDetail(raw: unknown): LeadPipelineDetail {
    const r = raw as LeadPipelineDetail;
    return {
      ...LeadPipelineMapper.toPipeline(r),
      stages: (r.stages ?? []).map(LeadPipelineMapper.toStage),
      transitions: (r.transitions ?? []).map(LeadPipelineMapper.toTransition),
    };
  }

  static toStage(raw: unknown): LeadStageItem {
    const r = raw as { statusId: string; status: string; color: string; conversion: boolean; sortOrder: number; pipelineId: number; positionX: number | null; positionY: number | null };
    return {
      id: r.statusId,
      status: r.status,
      color: r.color,
      conversion: r.conversion,
      sortOrder: r.sortOrder,
      pipelineId: r.pipelineId,
      positionX: r.positionX ?? null,
      positionY: r.positionY ?? null,
    };
  }

  static toTransition(raw: unknown): LeadStageTransitionItem {
    const r = raw as { id: string; fromStatusId: string | null; toStatusId: string };
    return {
      id: String(r.id),
      fromStageId: r.fromStatusId,
      toStageId: r.toStatusId,
    };
  }

  static toCreateStagePayload(values: LeadStageFormData) {
    return {
      status: values.status.trim(),
      color: values.color,
      conversion: values.conversion,
    };
  }

  static toUpdateStagePayload(values: LeadStageFormData) {
    return LeadPipelineMapper.toCreateStagePayload(values);
  }

  static toPositionPayload(x: number, y: number): UpdateStagePositionPayload {
    return { positionX: x, positionY: y };
  }
}
