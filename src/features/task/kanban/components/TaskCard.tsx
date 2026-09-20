import { useDraggable } from '@dnd-kit/core';
import { Calendar, Link2 } from 'lucide-react';
import { formatDate } from '../../../../shared/utils/dateUtils';
import { getRecurrenceLabel } from '../../common/utils/recurrence';
import { isTaskOverdue } from '../../common/utils/isTaskOverdue';
import TaskTypeBadge from '../../common/components/TaskTypeBadge';
import OverdueTag from '../../common/components/OverdueTag';
import RecurrenceBadge from '../../common/components/RecurrenceBadge';
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

  const rawTask = task as TaskKanbanTask & {
    repeat_type?: RepeatType;
    repeat_config?: TaskKanbanTask['repeatConfig'];
  };
  const repeatTypeCandidates = [rawTask.repeatType, rawTask.repeat_type];
  const repeatConfigCandidates = [rawTask.repeatConfig, rawTask.repeat_config];
  const repeatType =
    repeatTypeCandidates.find((value) => value !== undefined && value !== null && value !== RepeatType.NEVER) ??
    repeatTypeCandidates.find((value) => value !== undefined && value !== null) ??
    undefined;
  const repeatConfig =
    repeatConfigCandidates.find((value) => value !== undefined && value !== null) ??
    undefined;

  const hasRelatedEntity = !!(task.leadId || task.dealId || task.campaignId);
  const isRecurring = !!repeatType && repeatType !== RepeatType.NEVER;
  const recurrenceLabel = getRecurrenceLabel(repeatType, repeatConfig);
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

      <div className="task-kanban-card__meta">
        {task.priority && (
          <span
            className="task-kanban-card__priority"
            style={{ color: PRIORITY_COLOR[task.priority] ?? 'var(--text-tertiary)' }}
          >
            {task.priority}
          </span>
        )}
        {overdue && <OverdueTag />}
        {isRecurring && (
          <RecurrenceBadge
            repeatType={repeatType}
            repeatConfig={repeatConfig}
            showLabel
          />
        )}
      </div>

      <div className="task-kanban-card__footer">
        <div className="task-kanban-card__assignee">
          {task.assignedTo?.name ?? 'Unassigned'}
        </div>
        <div className="task-kanban-card__date" title={recurrenceLabel}>
          <Calendar size={12} />
          <span>{task.scheduledDate ? formatDate(task.scheduledDate) : 'No date'}</span>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
