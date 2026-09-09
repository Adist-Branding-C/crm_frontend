import type {
  DealPipelineItem,
  DealPipelineDetail,
  DealStageItem,
  DealStageTransitionItem,
} from '../types/interface';
import type { DealStageFormData, UpdateStagePositionPayload } from '../types/request';

/**
 * Maps between the deal-pipeline-builder API's response shapes and the
 * feature's UI-facing interfaces, and builds request payloads.
 *
 * Used by:
 * - dealPipeline.service.ts (response side)
 * - useDealPipelineList / useDealPipelineCanvas (payload side)
 */
export class DealPipelineMapper {
  static toPipelineList(raw: unknown[]): DealPipelineItem[] {
    return (raw ?? []).map((item) => DealPipelineMapper.toPipeline(item));
  }

  static toPipeline(raw: unknown): DealPipelineItem {
    const r = raw as DealPipelineItem;
    return {
      id: String(r.id),
      name: r.name,
      isDefault: r.isDefault,
      isActive: r.isActive,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
    };
  }

  static toPipelineDetail(raw: unknown): DealPipelineDetail {
    const r = raw as DealPipelineDetail;
    return {
      ...DealPipelineMapper.toPipeline(r),
      stages: (r.stages ?? []).map(DealPipelineMapper.toStage),
      transitions: (r.transitions ?? []).map(DealPipelineMapper.toTransition),
    };
  }

  static toStage(raw: unknown): DealStageItem {
    const r = raw as DealStageItem;
    return {
      id: String(r.id),
      name: r.name,
      probability: Number(r.probability),
      outcome: r.outcome,
      color: r.color,
      sortOrder: r.sortOrder,
      status: r.status,
      pipelineId: r.pipelineId,
      positionX: r.positionX ?? null,
      positionY: r.positionY ?? null,
    };
  }

  static toTransition(raw: unknown): DealStageTransitionItem {
    const r = raw as DealStageTransitionItem;
    return {
      id: String(r.id),
      fromStageId: r.fromStageId,
      toStageId: r.toStageId,
    };
  }

  static toCreateStagePayload(values: DealStageFormData) {
    return {
      name: values.name.trim(),
      probability: values.probability,
      outcome: values.outcome,
      color: values.color,
    };
  }

  static toUpdateStagePayload(values: DealStageFormData) {
    return DealPipelineMapper.toCreateStagePayload(values);
  }

  static toPositionPayload(x: number, y: number): UpdateStagePositionPayload {
    return { positionX: x, positionY: y };
  }
}
