/**
 * Task-type domain types shared by the unified Tasks module (tables, kanban,
 * forms, mappers, services, validation).
 *
 * Used by:
 * - taskTypeConfig (labels/badges/association fields per type)
 * - UnifiedTaskMapper, unifiedTaskValidation, unified service
 * - TaskTypeBadge, TaskTypeFilter, TaskPage, TaskKanbanView
 *
 * Notes:
 * - Values mirror the backend unified enum exactly: `taskType` on task items
 *   and the payload/query param of the unified /tasks endpoints are
 *   GENERAL | CALL | CAMPAIGN | DEAL (the legacy per-flavor spellings
 *   NORMAL/CALL_TASK/CAMPAIGN_TASK/DEAL_TASK only survive in the calendar and
 *   legacy per-type services, not in the unified feature).
 * - 'ALL' is a filter-only value, never a real task type; TASK_TYPE_FILTER_KEY
 *   is kept separate so the typed filter state can't be passed where a real
 *   TaskTaskTypeKey is expected.
 */
export type TaskTaskTypeKey = 'GENERAL' | 'CALL' | 'CAMPAIGN' | 'DEAL';
export type TaskTypeFilterKey = 'ALL' | TaskTaskTypeKey;

/**
 * Dropdown option shape used by the add/edit form's Task Type selector and the
 * table/kanban Type filters.
 */
export interface TypeOption<TValue extends string> {
  value: TValue;
  label: string;
}

export interface TaskTypeConfig {
  /** Human-readable type label shown in badges, filters and forms. */
  label: string;
  /** Icon rendered in the Task Type selector row. */
  icon: typeof import('lucide-react').Phone;
  badgeColor: string;
  badgeBg: string;
  /** Form/name of the type-specific required association field (categoryId/leadId/campaignId/dealId). */
  associationFieldName: string;
  associationLabel: string;
  associationPlaceholder: string;
  associationLoadingLabel: string;
  associationEmptyMessage: string;
}