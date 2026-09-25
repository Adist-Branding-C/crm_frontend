import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { dealReportOptions, type DealReportCategory } from '../constants';
import { useCurrentStaff } from '../../account-settings/agent/hooks/useCurrentStaff';

const CATEGORY_ORDER: DealReportCategory[] = [
  'Pipeline & Forecasting',
  'Conversion & Performance',
  'Risk & Data Integrity',
  'Additional Reports',
];

const DealReportsLanding = () => {
  const { currentStaff } = useCurrentStaff();
  const isAdmin = Boolean(currentStaff?.isAdmin || currentStaff?.isSuperAdmin);

  return (
    <div className="report-content-wrapper with-sidebar">
      {CATEGORY_ORDER.map((category) => {
        const reports = dealReportOptions.filter(
          (report) => report.category === category && (report.id !== 'deleted' || isAdmin),
        );
        if (reports.length === 0) return null;
        return (
          <div key={category} style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, margin: '0 0 0.75rem' }}>{category}</h3>
            <div className="lead-reports-list">
              {reports.map((report) => (
                <Link key={report.id} to={report.path} className="lead-report-card">
                  <div className="lead-report-card-content">
                    <span className="lead-report-title">{report.title}</span>
                    {report.description && <span className="lead-report-desc">{report.description}</span>}
                  </div>
                  <ChevronRight size={18} className="report-card-arrow" />
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DealReportsLanding;
