import React from 'react';
import { Calendar } from 'lucide-react';
import type { CalendarTask, DayViewProps } from '../types';
import { MONTH_NAMES } from '../constants';

const DayView: React.FC<DayViewProps> = ({ currentDate, tasks }) => (
  <div className="day-view">
    <div className="day-view-header">
      <h3>{MONTH_NAMES[currentDate.getMonth()]} {currentDate.getDate()}, {currentDate.getFullYear()}</h3>
    </div>
    <div className="day-view-body">
      {tasks.length === 0 ? (
        <div className="no-tasks-message">
          <Calendar size={48} />
          <p>No tasks scheduled for this day</p>
        </div>
      ) : (
        tasks.map(task => (
          <div key={task.id} className={`day-task-card ${task.status}`}>
            <div className="task-time">{task.dueTime}</div>
            <div className="task-info">
              <h4>{task.title}</h4>
              <p>{task.category} - {task.contactName}</p>
            </div>
            <span className={`task-status-badge ${task.status}`}>{task.status}</span>
          </div>
        ))
      )}
    </div>
  </div>
);

export default DayView;
