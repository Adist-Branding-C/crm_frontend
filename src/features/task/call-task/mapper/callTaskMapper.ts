import { toIdString, toHHmm } from '../../common/utils/taskFieldTransforms';
import type { CallTaskFormData, CallTaskItem } from '../types/index';

/**
 * Maps a CallTaskItem (API entity shape) to CallTaskFormData (drawer form shape).
 *
 * Used by:
 * - useCallTaskDrawer, to derive the Edit drawer's initial values from the editing item.
 * - useCallTaskFormSubmit, to detect a no-op edit submit (compares this against the
 *   submitted form values).
 */
export class CallTaskMapper {
  static toFormValues(item: CallTaskItem): CallTaskFormData {
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
