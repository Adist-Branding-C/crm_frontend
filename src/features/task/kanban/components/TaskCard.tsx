import { useDraggable } from '@dnd-kit/core';
import { Calendar, Link2, RefreshCw } from 'lucide-react';
import { formatDate } from '../../../../shared/utils/dateUtils';
import { getRecurrenceLabel } from '../../common/utils/recurrence';
import { isTaskOverdue } from '../../common/utils/isTaskOverdue';
import TaskTypeBadge from '../../common/components/TaskTypeBadge';
import OverdueTag from '../../common/components/OverdueTag';
import type { TaskKanbanTask } from '../types/kanban.types';
import { RepeatType } from '../../common/constants/taskEnums';
import './TaskCard.css';

const PRIORITY_COLOR: Record<string, string> = {
  High: 'var(--danger-text)',
  Medium: 'var(--warning-text)',
  Low: 'var(--text-tertiary)',
};

interface TaskCardProps {
  task: TaskKanbanTask;
  stageId: string;
}

function TaskCard({ task, stageId }: TaskCardProps) {
  const { setNodeRef, attributes, listeners, isDragging } = useDraggable({
    id: `task-${task.id}`,
    data: { type: 'task', task, stageId },
  });

  const hasRelatedEntity = !!(task.leadId || task.dealId || task.campaignId);
  const isRecurring = !!task.repeatType && task.repeatType !== RepeatType.NEVER;
  const recurrenceLabel = getRecurrenceLabel(task.repeatType, task.repeatConfig);
  const overdue = isTaskOverdue(task.scheduledDate, task.scheduledTime, task.status);

  return (
    <div
      ref={setNodeRef}
      className={`task-kanban-card${isDragging ? ' task-kanban-card--dragging' : ''}`}
      {...attributes}
      {...listeners}
    >
      <div className="task-kanban-card__header">
        <TaskTypeBadge type={task.taskType} />
        {hasRelatedEntity && (
          <span className="task-kanban-card__link-icon" title="Has related entity">
            <Link2 size={12} />
          </span>
        )}
      </div>

      <div className="task-kanban-card__title">{task.title}</div>

      {task.priority && (
        <span
          className="task-kanban-card__priority"
          style={{ color: PRIORITY_COLOR[task.priority] ?? 'var(--text-tertiary)' }}
        >
          {task.priority}
        </span>
      )}
      {overdue && <OverdueTag />}

      <div className="task-kanban-card__footer">
        <div className="task-kanban-card__assignee">
          {task.assignedTo?.name ?? 'Unassigned'}
        </div>
        <div className="task-kanban-card__date">
          {isRecurring && (
            <span className="task-kanban-card__repeat" title={recurrenceLabel} aria-label={recurrenceLabel}>
              <RefreshCw size={14} />
            </span>
          )}
          <Calendar size={12} />
          <span>{task.scheduledDate ? formatDate(task.scheduledDate) : 'No date'}</span>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
