import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Calendar } from 'lucide-react';
import { formatDate } from '../../../shared/utils/dateUtils';
import { hashStringToColor } from '../utils/pipelineColor.util';
import type { TaskCardProps } from '../types';

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const assigneeLabel = task.assignedToName || task.assignedTo || 'Unassigned';
  const { setNodeRef, attributes, listeners, isDragging } = useDraggable({
    id: `task-${task.id}`,
    data: { type: 'task', task },
  });

  return (
    <div
      ref={setNodeRef}
      className={`deal-card${isDragging ? ' deal-card--dragging' : ''}`}
      {...attributes}
      {...listeners}
    >
      <div className="deal-title">{task.title}</div>
      <div className="deal-footer">
        <div className="deal-contact">
          <div
            className="contact-avatar"
            style={{ background: hashStringToColor(assigneeLabel) }}
          >
            {assigneeLabel.charAt(0)}
          </div>
          <span>{assigneeLabel}</span>
        </div>
      </div>
      <div className="deal-due">
        <Calendar size={12} />
        <span>
          {task.scheduledDate ? formatDate(task.scheduledDate) : 'No due date'}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
