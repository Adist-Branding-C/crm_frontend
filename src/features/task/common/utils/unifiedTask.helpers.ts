import { TASK_TYPE_CONFIG } from '../constants/taskTypeConfig';
import type { TaskTaskTypeKey } from '../types/taskType.types';
import type { UnifiedTaskItem } from '../types/unifiedTask.types';

/**
 * Type guard for the backend task-type values.
 *
 * Used by:
 * - UnifiedTaskMapper (type extraction)
 * - UnifiedTaskRow / unified TaskPage (per-type Related resolution)
 *
 * Notes:
 * - Kept here so the few places that need to judge "is this item a real task
 *   type" share one guard instead of each re-typing the four string unions.
 */
export function isTaskTypeKey(value: string | undefined): value is TaskTaskTypeKey {
  return (
    value === 'GENERAL' ||
    value === 'CALL' ||
    value === 'CAMPAIGN' ||
    value === 'DEAL'
  );
}

/** Resolves the association field config for a real task type, or null otherwise. */
function resolveConfig(type: string | undefined): TaskTaskTypeKey | null {
  return isTaskTypeKey(type) ? type : null;
}

/**
 * Url/name of the task item's own association field (categoryId for General,
 * leadId for Call, campaignId for Campaign, dealId for Deal).
 */
export function getRelatedFieldName(type: string | undefined): string {
  const key = resolveConfig(type);
  return key ? TASK_TYPE_CONFIG[key].associationFieldName : '';
}

/**
 * Human-readable label of the task item's own association field.
 */
export function getRelatedFieldLabel(type: string | undefined): string {
  const key = resolveConfig(type);
  return key ? TASK_TYPE_CONFIG[key].associationLabel : '';
}

/**
 * Extracts the related-entity object from a task item according to its own
 * task type (category ref for General, lead ref for Call, etc.).
 */
export function getRelatedEntity(item: UnifiedTaskItem): UnifiedTaskItem['category'] | UnifiedTaskItem['dealId'] | undefined {
  const key = resolveConfig(item.taskType);
  if (!key) return undefined;
  switch (key) {
    case 'GENERAL':
      return item.category;
    case 'CALL':
      return item.leadId;
    case 'CAMPAIGN':
      return item.campaignId;
    case 'DEAL':
      return item.dealId;
  }
}

/**
 * Id-string of the Related entity, used to prefill the inline Related editor.
 */
export function getRelatedId(item: UnifiedTaskItem): string {
  const entity = getRelatedEntity(item);
  if (!entity) return '';
  return stringifyId(entity.id);
}

/** Display label of the Related entity, falling back to the legacy leadId. */
export function getRelatedLabel(item: UnifiedTaskItem): string {
  const entity = getRelatedEntity(item);
  if (!entity) return '-';
  if ('name' in entity && entity.name) return entity.name;
  if ('title' in entity && entity.title) return entity.title;
  return '-';
}

function stringifyId(id: number | string | undefined): string {
  return id === undefined || id === null ? '' : String(id);
}