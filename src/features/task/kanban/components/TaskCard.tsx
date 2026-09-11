import { useDraggable } from '@dnd-kit/core';
import { Calendar, Phone, Megaphone, Briefcase, ListChecks, Link2 } from 'lucide-react';
import { formatDate } from '../../../../shared/utils/dateUtils';
import { TASK_TYPE_LABELS } from '../constants/taskBoard.constants';
import RecurrenceBadge from '../../common/components/RecurrenceBadge';
import type { TaskKanbanTask } from '../types/kanban.types';
import './TaskCard.css';

const PRIORITY_COLOR: Record<string, string> = {
  High: 'var(--danger-text)',
  Medium: 'var(--warning-text)',
  Low: 'var(--text-tertiary)',
};

const TYPE_ICON: Record<string, typeof Phone> = {
  NORMAL: ListChecks,
  CALL_TASK: Phone,
  CAMPAIGN_TASK: Megaphone,
  DEAL_TASK: Briefcase,
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

  const TypeIcon = TYPE_ICON[task.type] ?? ListChecks;
  const typeLabel = TASK_TYPE_LABELS[task.type] ?? task.type;
  const hasRelatedEntity = !!(task.leadId || task.dealId || task.campaignId);

  return (
    <div
      ref={setNodeRef}
      className={`task-kanban-card${isDragging ? ' task-kanban-card--dragging' : ''}`}
      {...attributes}
      {...listeners}
    >
      <div className="task-kanban-card__header">
        <span className="task-kanban-card__type" title={typeLabel}>
          <TypeIcon size={12} /> {typeLabel}
        </span>
        <span className="task-kanban-card__header-icons">
          <RecurrenceBadge repeatType={task.repeatType} repeatConfig={task.repeatConfig} />
          {hasRelatedEntity && (
            <span className="task-kanban-card__link-icon" title="Has related entity">
              <Link2 size={12} />
            </span>
          )}
        </span>
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

      <div className="task-kanban-card__footer">
        <div className="task-kanban-card__assignee">
          {task.assignedTo?.name ?? 'Unassigned'}
        </div>
        <div className="task-kanban-card__date">
          <Calendar size={12} />
          <span>{task.scheduledDate ? formatDate(task.scheduledDate) : 'No date'}</span>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
