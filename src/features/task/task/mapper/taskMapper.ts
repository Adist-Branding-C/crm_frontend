import { ADD_TASK_INITIAL_VALUES } from '../constants/addTask.constants';
import { toIdString, toHHmm } from '../../common/utils/taskFieldTransforms';
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
    return {
      title: item.title || '',
      description: item.description || '',
      categoryId: toIdString(item.category),
      scheduledDate: item.scheduledDate || '',
      scheduledTime: toHHmm(item.scheduledTime),
      assignedTo: toIdString(item.assignedTo),
      leadId: toIdString(item.leadId),
      priority: item.priority || '',
      status: item.status || '',
    };
  }
}
