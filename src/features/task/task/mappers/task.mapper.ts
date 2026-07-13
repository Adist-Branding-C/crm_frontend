import { ADD_TASK_INITIAL_VALUES } from '../constants';
import type { TaskItem, TaskFormData } from '../types';

/**
 * Maps a TaskItem (API entity shape) to TaskFormData (drawer form shape).
 *
 * Used by:
 * - useTaskDrawer, to derive the Edit drawer's initial values from the editing item.
 * - useTaskFormSubmit, to detect a no-op edit submit (compares this against the
 *   submitted form values).
 */
export class TaskMapper {
  static toFormValues(item: TaskItem | null): TaskFormData {
    if (!item) return ADD_TASK_INITIAL_VALUES;
    const raw = item as unknown as Record<string, unknown>;
    return {
      title: item.title || '',
      description: item.description || '',
      categoryId: (raw.categoryId as string) || '',
      scheduledDate: item.scheduledDate || '',
      scheduledTime: item.scheduledTime || '',
      assignedTo: (raw.assignedTo as string) || '',
      leadId: item.leadId ? String(item.leadId.id) : '',
      priority: item.priority || '',
      status: item.status || '',
    };
  }
}
