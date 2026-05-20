import React from 'react';
import './TasksWidget.css';

const TasksWidget = () => {
  return (
    <div className="card widget-base tasks-widget">
      <h3 className="widget-title">Tasks</h3>
      
      <div className="tasks-overall">
        <span className="tasks-big-number">146</span>
      </div>

      <div className="tasks-stats">
        <div className="task-stat-item">
          <div className="task-stat-header">
            <span className="task-stat-label">Pending</span>
            <span className="task-stat-value">54</span>
          </div>
          <div className="task-bar-bg">
            <div className="task-bar-fill" style={{ width: '40%', backgroundColor: '#f97316' }}></div>
          </div>
        </div>

        <div className="task-stat-item">
          <div className="task-stat-header">
            <span className="task-stat-label">Overdue</span>
            <span className="task-stat-value">80</span>
          </div>
          <div className="task-bar-bg">
            <div className="task-bar-fill" style={{ width: '60%', backgroundColor: '#8b5cf6' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksWidget;
