import type { RepeatType } from '../../task/types/interface';
import type { TaskTaskTypeKey } from './taskType.types';

/**
 * Unified task item shape returned by the /tasks list, detail and recurrence
 * endpoints. Relational fields arrive as `{ id, name }`-style objects, which
 * UnifiedTaskMapper normalizes into form id-strings and the table renders into
 * names.
 *
 * Used by:
 * - UnifiedTaskDataService (all endpoints)
 * - useTableData on the unified TaskPage
 * - UnifiedTaskMapper.toFormValues
 *
 * Notes:
 * - `taskType` is the backend's unified discriminator (GENERAL | CALL | CAMPAIGN |
 *   DEAL); empty/missing falls back to '' in the ui layer only when
 *   closing/reopening forms.
 * - workflowId/stageId are never sent when the task entity has no workflow
 *   association (general tasks), hence optional.
 */
export interface UnifiedTaskItem {
  id: number;
  taskType: string;
  title: string;
  description: string;
  scheduledDate: string;
  scheduledTime: string;
  priority: string;
  status: string;
  workflowId?: number;
  stageId?: number;
  workflowName?: string | null;
  stageName?: string | null;
  stageColor?: string | null;
  repeatType?: string;
  repeatConfig?: { dayOfWeek?: number; dayOfMonth?: number | 'last' };
  assignedTo?: { id: number; name: string } | null;
  assignedBy?: { id: number; name: string } | null;
  category?: { id: number; name: string } | null;
  leadId?: { id: number; name: string } | null;
  dealId?: { id: number | string; title?: string; name?: string } | null;
  campaignId?: { id: number; name: string } | null;
}

/**
 * Form values for the unified task add/edit form. Always contains every field
 * across all four task types; the active task type determines which association
 * id is actually posted (empty ones are stripped by the service payload cleaner).
 *
 * Used by:
 * - UNIFIED_EMPTY_VALUES, UnifiedTaskMapper.toFormValues
 * - UnifiedTaskValidation, unified service cleanPayload
 *
 * Notes:
 * - `taskType` is '' while the user hasn't picked a type; the validation schema
 *   ignores the type-specific association until a type is selected.
 * - Keys are the exact Formik field names so submits map 1:1 onto the payload.
 */
export interface UnifiedTaskFormValues {
  taskType: TaskTaskTypeKey | '';
  title: string;
  description: string;
  categoryId: string;
  leadId: string;
  campaignId: string;
  dealId: string;
  scheduledDate: string;
  scheduledTime: string;
  assignedTo: string;
  priority: string;
  status: string;
  workflowId: string;
  stageId: string;
  repeatType: RepeatType;
  repeatConfig: { dayOfWeek?: number; dayOfMonth?: number | 'last' } | undefined;
}

/** Payload accepted by the unified POST /tasks and PATCH /tasks/:id endpoints. */
export type UnifiedTaskPayload = UnifiedTaskFormValues;