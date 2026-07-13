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
      scheduledTime: item.scheduledTime || '',
      assignedTo: item.assignedTo ? String(item.assignedTo.id) : '',
      leadId: item.leadId ? String(item.leadId.id) : '',
      priority: item.priority || '',
      status: item.status || '',
    };
  }
}
