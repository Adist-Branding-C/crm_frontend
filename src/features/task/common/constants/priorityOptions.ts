import { TaskPriority } from './taskEnums';

/**
 * Priority dropdown options for every task-item form (Task, Call Task, Campaign
 * Task, Deal Task).
 *
 * Used by:
 * - GenericTaskForm (task/shared/components)
 */
export const PRIORITY_OPTIONS = [
  { value: TaskPriority.LOW, label: 'Low' },
  { value: TaskPriority.MEDIUM, label: 'Medium' },
  { value: TaskPriority.HIGH, label: 'High' },
];
