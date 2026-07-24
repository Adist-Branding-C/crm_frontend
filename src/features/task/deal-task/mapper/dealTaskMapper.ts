import { toIdString, toHHmm } from '../../common/utils/taskFieldTransforms';
import type { DealTaskFormData, DealTaskItem } from '../types/index';

/**
 * Maps a DealTaskItem (API entity shape) to DealTaskFormData (drawer form shape).
 *
 * Used by:
 * - useDealTaskDrawer, to derive the Edit drawer's initial values from the editing item.
 * - useDealTaskFormSubmit, to detect a no-op edit submit (compares this against the
 *   submitted form values).
 */
export class DealTaskMapper {
  static toFormValues(item: DealTaskItem): DealTaskFormData {
    return {
      title: item.title || '',
      description: item.description || '',
      scheduledDate: item.scheduledDate || '',
      scheduledTime: toHHmm(item.scheduledTime),
      assignedTo: toIdString(item.assignedTo),
      leadId: toIdString(item.leadId),
      priority: item.priority || '',
      status: item.status || '',
    };
  }
}
