import React from 'react';
import { Calendar } from 'lucide-react';
import type { TaskCardProps } from '../types/pipeline.types';

const TaskCard: React.FC<TaskCardProps> = ({ task, getAvatarColor }) => {

  return (
    <div className="deal-card">
      <div className="deal-title">{task.title}</div>
      <div className="deal-footer">
        <div className="deal-contact">
          <div className="contact-avatar" style={{ background: getAvatarColor(task.assignedTo) }}>
            {task.assignedTo.charAt(0)}
          </div>
          <span>{task.assignedTo}</span>
        </div>
      </div>
      <div className="deal-due">
        <Calendar size={12} />
        <span>{task.scheduledDate}</span>
      </div>
    </div>
  );
};

export default TaskCard;
