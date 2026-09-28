import type { UnifiedTaskFormValues, UnifiedTaskItem, UnifiedTaskPayload } from '../types/unifiedTask.types';
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

  /**
   * Builds the POST /tasks and PATCH /tasks/:id request body from the form values.
   *
   * Notes:
   * - Formerly UnifiedTaskDataService.cleanPayload (logic unchanged), moved here when task
   *   requests moved to RTK Query (taskApi).
   * - Strips empty association ids so only the active task type's field reaches the backend,
   *   numbers every id except leadId, and drops repeatConfig unless the repeat type needs one
   *   (weekly/monthly).
   */
  static toRequestPayload(data: UnifiedTaskPayload): Record<string, unknown> {
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
}