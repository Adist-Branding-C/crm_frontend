import React from 'react';
import PageHeader from '../../components/PageHeader';

const DealReports = () => {
  return (
    <div>
      <PageHeader title="Deal Reports" description="Comprehensive overview of all deal activities" breadcrumb={false} />
      <div className="report-stats-grid">
        <div className="report-stat-card">
          <div className="report-stat-icon primary"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
          <div className="report-stat-content">
            <span className="report-stat-value">₹45.2L</span>
            <span className="report-stat-label">Total Deal Value</span>
          </div>
        </div>
        <div className="report-stat-card">
          <div className="report-stat-icon success"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
          <div className="report-stat-content">
            <span className="report-stat-value">89</span>
            <span className="report-stat-label">Won Deals</span>
          </div>
        </div>
        <div className="report-stat-card">
          <div className="report-stat-icon warning"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></div>
          <div className="report-stat-content">
            <span className="report-stat-value">12</span>
            <span className="report-stat-label">Pending Deals</span>
          </div>
        </div>
        <div className="report-stat-card">
          <div className="report-stat-icon info"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg></div>
          <div className="report-stat-content">
            <span className="report-stat-value">78%</span>
            <span className="report-stat-label">Win Rate</span>
          </div>
        </div>
      </div>
      <div className="report-chart-placeholder">Deal analytics charts will appear here</div>
    </div>
  );
};

export default DealReports;