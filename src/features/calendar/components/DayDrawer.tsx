import React from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import type { CalendarTask, DayDrawerProps } from '../types';
import { MONTH_NAMES } from '../constants';

const DayDrawer: React.FC<DayDrawerProps> = ({ isOpen, selectedDate, tasks, onClose, onDragStartTask, onDragOverTask, onDropTask, onDeleteTask }) => {
  if (!isOpen) return null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="day-drawer" onClick={e => e.stopPropagation()}>
        <div className="drawer-header">
          <button className="drawer-back-btn" onClick={onClose}><ArrowLeft size={20} /></button>
          <div className="drawer-title-wrap">
            <h2 className="drawer-title">
              {selectedDate?.getDate()} {MONTH_NAMES[selectedDate?.getMonth() ?? 0]} {selectedDate?.getFullYear()}
            </h2>
            <span className="drawer-subtitle">{tasks.length} Tasks Scheduled</span>
          </div>
          <button className="add-task-btn"><Plus size={18} /> Add Task</button>
        </div>

        <div className="drawer-body">
          <div className="timeline-container">
            <div className="timeline-header-row">
              <div className="time-label-header"></div>
              <div className="time-slots-header"><span>AM</span><span>PM</span></div>
            </div>
            <div className="timeline-grid">
              {[...Array(23)].map((_, hourIndex) => {
                const hour = hourIndex + 1;
                const tasksInHour = tasks.filter(task => {
                  const taskHour = parseInt(task.dueTime.split(':')[0] || '0', 10);
                  return taskHour === hour;
                });
                return (
                  <div key={hour} className="timeline-row">
                    <div className="time-label">
                      {hour <= 12 ? hour : hour - 12} {hour < 12 || hour === 24 ? 'AM' : 'PM'}
                    </div>
                    <div className="time-slot" onDragOver={onDragOverTask} onDrop={(e) => onDropTask(e, hour)}>
                      {tasksInHour.map(task => (
                        <div key={task.id} className={`timeline-task ${task.category.toLowerCase()}`}
                          draggable onDragStart={(e) => onDragStartTask(e, task)}>
                          <div className="task-header-row">
                            <div className="task-time">{task.dueTime}</div>
                            <button className="task-delete-btn" onClick={(e) => onDeleteTask(task.id, e)}>x</button>
                          </div>
                          <div className="task-title">{task.title}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayDrawer;
