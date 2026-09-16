import type { UnifiedTaskFormValues } from '../types/unifiedTask.types';
import { RepeatType } from './taskEnums';

/**
 * Blank form values for the unified add/edit task form. Contains every field
 * across all four task types so EDITS of any type never gain/lose keys when
 * re-mapped (which the no-op-submit comparison in useTaskFormSubmit relies on).
 *
 * Used by:
 * - UseUnifiedTaskDrawer (blank state, resets between add/edit)
 * - UnifiedTaskMapper.toFormValues (fallback when the item is missing)
 *
 * Notes:
 * - Deliberately self-contained: it no longer imports the per-type
 *   ADD_*_INITIAL_VALUES constants, keeping the unified flow decoupled from the
 *   call/campaign/deal modules (which now only serve the calendar feature).
 * - All association ids start as '' and stay consistent because the unified
 *   form never swaps its field set based on the selected task type.
 */
export const UNIFIED_EMPTY_VALUES: UnifiedTaskFormValues = {
  taskType: '',
  title: '',
  description: '',
  categoryId: '',
  leadId: '',
  campaignId: '',
  dealId: '',
  scheduledDate: '',
  scheduledTime: '',
  assignedTo: '',
  priority: '',
  status: '',
  workflowId: '',
  stageId: '',
  repeatType: RepeatType.NEVER,
  repeatConfig: undefined,
};