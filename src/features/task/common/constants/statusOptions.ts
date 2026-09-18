import { TaskStatus } from './taskEnums';

/**
 * Status dropdown options for every task-item form (Task, Call Task, Campaign
 * Task, Deal Task).
 *
 * Used by:
 * - GenericTaskForm (task/shared/components)
 */
export const STATUS_OPTIONS = [
  { value: TaskStatus.PENDING, label: 'Pending' },
  { value: TaskStatus.COMPLETED, label: 'Completed' },
];
