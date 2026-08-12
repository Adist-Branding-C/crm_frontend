import React from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import type { DayDrawerProps } from '../types';
import { MONTH_NAMES } from '../constants';
import { formatHourLabel } from '../../../shared/utils/dateUtils';

const DayDrawer: React.FC<DayDrawerProps> = ({
  isOpen, selectedDate, tasks, onClose, onAddTask,
  onDragStartTask, onDragOverTask, onDropTask, onDeleteTask,
}) => {
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
          <button className="add-task-btn" onClick={onAddTask}><Plus size={18} /> Add Task</button>
        </div>

        <div className="drawer-body">
          <div className="timeline-container">
            <div className="timeline-header-row">
              <div className="time-label-header"></div>
              <div className="time-slots-header"><span>AM</span><span>PM</span></div>
            </div>
            <div className="timeline-grid">
              {[...Array(24)].map((_, hour) => {
                const tasksInHour = tasks.filter(task => {
                  const taskHour = parseInt(task.dueTime.split(':')[0] || '0', 10);
                  return taskHour === hour;
                });
                return (
                  <div key={hour} className="timeline-row">
                    <div className="time-label">{formatHourLabel(hour)}</div>
                    <div className="time-slot" onDragOver={onDragOverTask} onDrop={(e) => onDropTask(e, hour)}>
                      {tasksInHour.map(task => {
                        const isEditable = task.origin === 'task';
                        return (
                          <div
                            key={task.id}
                            className={`timeline-task ${(task.category || '').toLowerCase().replace(/\s+/g, '-')} ${isEditable ? '' : 'readonly'}`}
                            draggable={isEditable}
                            onDragStart={isEditable ? (e) => onDragStartTask(e, task) : undefined}
                          >
                            <div className="task-header-row">
                              <div className="task-time">{task.dueTime}</div>
                              {isEditable && (
                                <button className="task-delete-btn" onClick={(e) => onDeleteTask(task, e)}>x</button>
                              )}
                            </div>
                            <div className="task-title">{task.title}</div>
                          </div>
                        );
                      })}
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
