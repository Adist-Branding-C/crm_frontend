import type { UnifiedTaskFormValues, UnifiedTaskItem } from '../types/unifiedTask.types';
import { RepeatType } from '../../task/types/interface';
import { UNIFIED_EMPTY_VALUES } from '../constants/unifiedTaskInitialValues';
import { toHHmm, toIdString } from '../utils/taskFieldTransforms';
import { isTaskTypeKey } from '../utils/unifiedTask.helpers';

/**
 * Maps a unified API task item on to the single unified form shape.
 *
 * Used by:
 * - UseUnifiedTaskDrawer (edit prefill) and useTaskFormSubmit (no-op comparison)
 *
 * Notes:
 * - Self-contained: resolves each relational object straight from UnifiedTaskItem
 *   instead of delegating to the four per-type mappers, so the unified flow owns
 *   its mapping and always yields the exact same key set as UNIFIED_EMPTY_VALUES
 *   (a strict requirement for the JSON.stringify no-op-submit comparison).
 * - Every association id starts as '' here; only the active task type's field is
 *   populated on edit, which matches the form's per-type association field.
 */
export class UnifiedTaskMapper {
  static toFormValues(item: UnifiedTaskItem | null | undefined): UnifiedTaskFormValues {
    if (!item) return { ...UNIFIED_EMPTY_VALUES };

    return {
      taskType: isTaskTypeKey(item.taskType) ? item.taskType : '',
      title: item.title ?? '',
      description: item.description ?? '',
      categoryId: toIdString(item.category),
      leadId: toIdString(item.leadId),
      campaignId: toIdString(item.campaignId),
      dealId: item.dealId?.id != null ? String(item.dealId.id) : '',
      scheduledDate: item.scheduledDate ?? '',
      scheduledTime: toHHmm(item.scheduledTime),
      assignedTo: toIdString(item.assignedTo),
      priority: item.priority ?? '',
      status: item.status ?? '',
      workflowId: item.workflowId != null ? String(item.workflowId) : '',
      stageId: item.stageId != null ? String(item.stageId) : '',
      repeatType: (item.repeatType as RepeatType | undefined) ?? RepeatType.NEVER,
      repeatConfig: item.repeatConfig ?? undefined,
    };
  }
}