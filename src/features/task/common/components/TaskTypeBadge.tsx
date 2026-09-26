import { memo } from 'react';
import { TASK_TYPE_CONFIG } from '../constants/taskTypeConfig';
import type { TaskTaskTypeKey } from '../types/taskType.types';
import './TaskTypeBadge.css';

interface TaskTypeBadgeProps {
  type: string;
}

const TaskTypeBadge = memo(({ type }: TaskTypeBadgeProps) => {
  const config = TASK_TYPE_CONFIG[type as TaskTaskTypeKey];
  if (!config) return <span className="task-type-badge">{type}</span>;

  return (
    <span
      className="task-type-badge"
      style={{ color: config.badgeColor, backgroundColor: config.badgeBg }}
    >
      <span className="task-type-badge__dot" style={{ backgroundColor: config.badgeColor }} />
      {config.label}
    </span>
  );
});

TaskTypeBadge.displayName = 'TaskTypeBadge';
export default TaskTypeBadge;
