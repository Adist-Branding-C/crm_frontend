import type { TaskReportPriority } from '../types';

interface TaskPriorityBadgeProps {
  priority: TaskReportPriority;
}

const PRIORITY_CLASS: Record<TaskReportPriority, string> = {
  High: 'report-priority-badge report-priority-high',
  Medium: 'report-priority-badge report-priority-medium',
  Low: 'report-priority-badge report-priority-low',
};

/**
 * Colored priority pill matching the High/Medium/Low palette used on the
 * Kanban board and the Escalation Rules page.
 *
 * Used by:
 * - SlaBreachRow (SLA Breach & Escalation report)
 */
const TaskPriorityBadge = ({ priority }: TaskPriorityBadgeProps) => (
  <span className={PRIORITY_CLASS[priority] ?? PRIORITY_CLASS.Low}>{priority}</span>
);

export default TaskPriorityBadge;