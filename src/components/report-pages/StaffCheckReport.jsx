import React from 'react';
import PageHeader from '../../components/PageHeader';

const StaffCheckReport = () => {
  return (
    <div>
      <PageHeader title="Check-in & Check-out" description="Real-time tracking of employee engagement" breadcrumb={false} />
      <div className="report-stats-grid">
        <div className="report-stat-card">
          <div className="report-stat-icon primary"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg></div>
          <div className="report-stat-content">
            <span className="report-stat-value">45</span>
            <span className="report-stat-label">Total Check-ins</span>
          </div>
        </div>
        <div className="report-stat-card">
          <div className="report-stat-icon success"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
          <div className="report-stat-content">
            <span className="report-stat-value">42</span>
            <span className="report-stat-label">Checked Out</span>
          </div>
        </div>
        <div className="report-stat-card">
          <div className="report-stat-icon warning"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>
          <div className="report-stat-content">
            <span className="report-stat-value">3</span>
            <span className="report-stat-label">Still In</span>
          </div>
        </div>
        <div className="report-stat-card">
          <div className="report-stat-icon info"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
          <div className="report-stat-content">
            <span className="report-stat-value">9:15 AM</span>
            <span className="report-stat-label">First Check-in</span>
          </div>
        </div>
      </div>
      <div className="report-chart-placeholder">Staff engagement charts will appear here</div>
    </div>
  );
};

export default StaffCheckReport;