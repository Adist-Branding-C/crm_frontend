import React from 'react';
import PageHeader from '../../components/PageHeader';

const TaskReports = () => {
  return (
    <div>
      <PageHeader title="Task Reports" description="Detailed tracking of task completion and progress" breadcrumb={false} />
      <div className="report-stats-grid">
        <div className="report-stat-card">
          <div className="report-stat-icon primary"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></div>
          <div className="report-stat-content">
            <span className="report-stat-value">567</span>
            <span className="report-stat-label">Total Tasks</span>
          </div>
        </div>
        <div className="report-stat-card">
          <div className="report-stat-icon success"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
          <div className="report-stat-content">
            <span className="report-stat-value">423</span>
            <span className="report-stat-label">Completed</span>
          </div>
        </div>
        <div className="report-stat-card">
          <div className="report-stat-icon warning"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
          <div className="report-stat-content">
            <span className="report-stat-value">89</span>
            <span className="report-stat-label">Pending</span>
          </div>
        </div>
        <div className="report-stat-card">
          <div className="report-stat-icon info"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>
          <div className="report-stat-content">
            <span className="report-stat-value">55</span>
            <span className="report-stat-label">Overdue</span>
          </div>
        </div>
      </div>
      <div className="report-chart-placeholder">Task analytics charts will appear here</div>
    </div>
  );
};

export default TaskReports;