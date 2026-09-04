import React from 'react';
import './TasksWidget.css';
import './WidgetStyles.css';
import { useTasksStatistics } from '../../hooks/useTasksStatistics';
import { Skeleton } from '../../../../shared/components/Skeleton';
import { BarRowsSkeleton } from './WidgetSkeletons';
import type { DashboardPeriod } from '../../types';

interface TasksWidgetProps {
  period: DashboardPeriod;
  from?: string;
  to?: string;
}

const TasksWidget = ({ period, from, to }: TasksWidgetProps) => {
  const { total, pending, overdue, pendingPercent, overduePercent, isLoading, isError } = useTasksStatistics(
    period,
    from,
    to,
  );

  return (
    <div className="card widget-base tasks-widget">
      <h3 className="widget-title">Tasks</h3>

      {isLoading ? (
        <>
          <div className="tasks-overall">
            <Skeleton width="3rem" height="2rem" />
          </div>
          <BarRowsSkeleton rows={2} />
        </>
      ) : isError ? (
        <div className="widget-status-text">Failed to load tasks</div>
      ) : total === 0 ? (
        <div className="widget-status-text">No tasks found</div>
      ) : (
        <>
          <div className="tasks-overall">
            <span className="tasks-big-number">{total}</span>
          </div>

          <div className="tasks-stats">
            <div className="task-stat-item">
              <div className="task-stat-header">
                <span className="task-stat-label">Pending</span>
                <span className="task-stat-value">{pending}</span>
              </div>
              <div className="task-bar-bg">
                <div className="task-bar-fill" style={{ width: `${pendingPercent}%`, backgroundColor: 'var(--chart-4)' }}></div>
              </div>
            </div>

            <div className="task-stat-item">
              <div className="task-stat-header">
                <span className="task-stat-label">Overdue</span>
                <span className="task-stat-value">{overdue}</span>
              </div>
              <div className="task-bar-bg">
                <div className="task-bar-fill" style={{ width: `${overduePercent}%`, backgroundColor: 'var(--chart-7)' }}></div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TasksWidget;
