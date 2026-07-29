import React, { useMemo } from 'react';
import { DAY_NAMES } from '../constants';
import type { WeekViewProps } from '../types';

const WeekView: React.FC<WeekViewProps> = ({ currentDate, getAgentsFilteredTasks, isToday }) => {
  const weekDays = useMemo(() =>
    Array.from({ length: 7 }, (_, i) => {
      const d = new Date(currentDate);
      d.setDate(currentDate.getDate() - currentDate.getDay() + i);
      return d;
    }),
    [currentDate]
  );

  const tasksByDay = useMemo(() =>
    weekDays.map(weekDate => ({
      date: weekDate,
      tasks: getAgentsFilteredTasks.filter(task => {
        const taskDate = new Date(task.dueDate);
        return taskDate.toDateString() === weekDate.toDateString();
      }),
    })),
    [weekDays, getAgentsFilteredTasks]
  );

  return (
    <div className="week-view">
      <div className="week-view-header">
        {weekDays.map((weekDate, i) => (
          <div key={i} className={`week-day-header ${isToday(weekDate) ? 'today' : ''}`}>
            <span className="week-day-name">{DAY_NAMES[i]}</span>
            <span className="week-date">{weekDate.getDate()}</span>
          </div>
        ))}
      </div>
      <div className="week-view-body">
        {tasksByDay.map(({ tasks }, i) => (
          <div key={i} className="week-day-column">
            {tasks.length === 0 ? <div className="no-tasks">-</div> : (
              tasks.map(task => (
                <div key={task.id} className={`week-task-item ${(task.priority || '').toLowerCase()}`}>
                  <span className="week-task-time">{task.dueTime}</span>
                  <span className="week-task-title">{task.title}</span>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
