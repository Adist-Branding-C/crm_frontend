import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { taskReportOptions } from '../constants';

const TaskReportsLanding = () => (
  <div className="report-content-wrapper with-sidebar">
    <div className="lead-reports-list">
      {taskReportOptions.map((report) => (
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

export default TaskReportsLanding;
