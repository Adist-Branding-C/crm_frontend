import React from 'react';
import PageHeader from '../../components/PageHeader';

const LeadReports = () => {
  return (
    <div>
      <PageHeader title="Lead Reports" description="Insightful tracking of your sales leads" breadcrumb={false} />
      <div className="report-stats-grid">
        <div className="report-stat-card">
          <div className="report-stat-icon primary"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
          <div className="report-stat-content">
            <span className="report-stat-value">1,234</span>
            <span className="report-stat-label">Total Leads</span>
          </div>
        </div>
        <div className="report-stat-card">
          <div className="report-stat-icon success"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
          <div className="report-stat-content">
            <span className="report-stat-value">456</span>
            <span className="report-stat-label">Converted Leads</span>
          </div>
        </div>
        <div className="report-stat-card">
          <div className="report-stat-icon warning"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
          <div className="report-stat-content">
            <span className="report-stat-value">234</span>
            <span className="report-stat-label">Active Leads</span>
          </div>
        </div>
        <div className="report-stat-card">
          <div className="report-stat-icon info"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="18" y1="8" x2="23" y2="13"/></svg></div>
          <div className="report-stat-content">
            <span className="report-stat-value">89%</span>
            <span className="report-stat-label">Conversion Rate</span>
          </div>
        </div>
      </div>
      <div className="report-chart-placeholder">
        Charts and visualizations will appear here
      </div>
    </div>
  );
};

export default LeadReports;