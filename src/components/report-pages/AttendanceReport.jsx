import React from 'react';
import PageHeader from '../../components/PageHeader';

const AttendanceReport = () => {
  return (
    <div>
      <PageHeader title="Attendance Report" description="Comprehensive monitoring of employee presence" breadcrumb={false} />
      <div className="report-stats-grid">
        <div className="report-stat-card">
          <div className="report-stat-icon primary"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
          <div className="report-stat-content">
            <span className="report-stat-value">50</span>
            <span className="report-stat-label">Total Staff</span>
          </div>
        </div>
        <div className="report-stat-card">
          <div className="report-stat-icon success"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
          <div className="report-stat-content">
            <span className="report-stat-value">47</span>
            <span className="report-stat-label">Present</span>
          </div>
        </div>
        <div className="report-stat-card">
          <div className="report-stat-icon warning"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>
          <div className="report-stat-content">
            <span className="report-stat-value">2</span>
            <span className="report-stat-label">Absent</span>
          </div>
        </div>
        <div className="report-stat-card">
          <div className="report-stat-icon info"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>
          <div className="report-stat-content">
            <span className="report-stat-value">1</span>
            <span className="report-stat-label">On Leave</span>
          </div>
        </div>
      </div>
      <div className="report-chart-placeholder">Attendance analytics charts will appear here</div>
    </div>
  );
};

export default AttendanceReport;