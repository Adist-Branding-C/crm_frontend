import React from 'react';
import { NavLink, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { ChevronRight, MessageCircle, DollarSign, ListChecks } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import LeadReportsLanding from '../sub-pages/LeadReportsLanding';
import LeadDailyActivityReport from '../sub-pages/LeadDailyActivityReport';
import LeadGLAPIHistoryReport from '../sub-pages/LeadGLAPIHistoryReport';
import LeadDeletedLeadsReport from '../sub-pages/LeadDeletedLeadsReport';
import LeadStatusWise from '../sub-pages/LeadStatusWise';
import LeadStatusChange from '../sub-pages/LeadStatusChange';
import LeadSourceWise from '../sub-pages/LeadSourceWise';
import LeadCheckoutSummary from '../sub-pages/LeadCheckoutSummary';
import LeadExport from '../sub-pages/LeadExport';
import LeadExportHistory from '../sub-pages/LeadExportHistory';
import LeadImportHistory from '../sub-pages/LeadImportHistory';
import ImportHistoryDetail from '../sub-pages/ImportHistoryDetail';
import DealReportsLanding from '../sub-pages/DealReportsLanding';

import TaskReportsLanding from '../task-reports/sub-pages/TaskReportsLanding';
import TaskSummaryReport from '../task-reports/sub-pages/TaskSummaryReport';
import TaskActivityReport from '../task-reports/sub-pages/TaskActivityReport';
import TaskStageHistoryReport from '../task-reports/sub-pages/TaskStageHistoryReport';
import TaskPipelineDistributionReport from '../task-reports/sub-pages/TaskPipelineDistributionReport';
import TaskSLABreachReport from '../task-reports/sub-pages/TaskSLABreachReport';
import TaskRecurringComplianceReport from '../task-reports/sub-pages/TaskRecurringComplianceReport';
import TaskTeamPerformanceReport from '../task-reports/sub-pages/TaskTeamPerformanceReport';

import DealPipelineSummaryReport from '../sub-pages/deal/DealPipelineSummaryReport';
import DealForecastReport from '../sub-pages/deal/DealForecastReport';
import DealVelocityReport from '../sub-pages/deal/DealVelocityReport';
import DealWinLossReport from '../sub-pages/deal/DealWinLossReport';
import DealSourceConversionReport from '../sub-pages/deal/DealSourceConversionReport';
import DealRepPerformanceReport from '../sub-pages/deal/DealRepPerformanceReport';
import DealAgingReport from '../sub-pages/deal/DealAgingReport';
import DealSizeDistributionReport from '../sub-pages/deal/DealSizeDistributionReport';

import GLDialerCallReport from '../sub-pages/GLDialerCallReport';
import CallFeedbackReport from '../sub-pages/CallFeedbackReport';
import CheckinReport from '../sub-pages/CheckinReport';
import AttendanceReport from '../sub-pages/AttendanceReport';
import AttendanceProfile from '../sub-pages/AttendanceProfile';
import { callReportOptions, reportCategories } from '../constants';
import './ReportsPage.css';
import '../../../pages/Settings.css'; // Make sure the settings grid CSS is available
import DealExportReport from '../sub-pages/deal/DealExportReport';
import DealExportHistoryReport from '../sub-pages/deal/DealExportHistoryReport';
import DealDeletedReport from '../sub-pages/deal/DealDeletedReport';

const ReportsRootLanding = () => {
  const reportCards = [
    { id: 'lead', title: 'Lead Reports', description: 'View and analyze all lead-related reports and metrics', link: '/reports/lead', icon: <MessageCircle size={24} /> },
    { id: 'deal', title: 'Deal Reports', description: 'Analyze deal pipelines, conversions, and win/loss ratios', link: '/reports/deal', icon: <DollarSign size={24} /> },
    { id: 'task', title: 'Task Reports', description: 'Monitor task completion, team performance, and SLA compliance', link: '/reports/task', icon: <ListChecks size={24} /> },
  ];

  return (
    <div className="settings-page" style={{ padding: 0 }}>
      <PageHeader title="Reports" description="Select a report category to view detailed metrics" breadcrumb={false} />
      <div className="settings-grid">
        {reportCards.map((item) => (
          <Link key={item.id} to={item.link} className="settings-card">
            <div className="settings-icon">
              {item.icon}
            </div>
            <h6>{item.title}</h6>
            <p>{item.description}</p>
            <div className="settings-link">
              <p>View {item.title.toLowerCase()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const ReportsPage = () => {
  const { pathname } = useLocation();
  const isTopLevel = /^\/reports\/(lead|deal|task|call|checkin|attendance)$/.test(pathname);
  const currentCategory = reportCategories.find((c) => pathname.startsWith(c.path));

  return (
    <div className="account-page">
      <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
        {isTopLevel && <PageHeader title={currentCategory?.title ?? 'Reports'} breadcrumb={false} />}

        <Routes>
          <Route path="" element={<ReportsRootLanding />} />
          <Route path="lead/*" element={<LeadReportsRouter />} />
          <Route path="deal/*" element={<DealReportsRouter />} />
          <Route path="task/*" element={<TaskReportsRouter />} />
          {/* <Route path="call/*" element={<CallReportsRouter />} /> */}
          {/* <Route path="checkin" element={<CheckinReport />} /> */}
          {/* <Route path="attendance" element={<AttendanceReport />} /> */}
          {/* <Route path="attendance/profile/:staffId" element={<AttendanceProfile />} /> */}
          <Route path="*" element={<Navigate to="/reports" replace />} />
        </Routes>
      </div>
    </div>
  );
};

const LeadReportsRouter = () => (
  <Routes>
    <Route path="" element={<LeadReportsLanding />} />
    {/* <Route path="daily" element={<LeadDailyActivityReport />} /> */}
    {/* <Route path="status-wise" element={<LeadStatusWise />} /> */}
    {/* <Route path="status-change" element={<LeadStatusChange />} /> */}
    {/* <Route path="source-wise" element={<LeadSourceWise />} /> */}
    {/* <Route path="checkout" element={<LeadCheckoutSummary />} /> */}
    <Route path="export" element={<LeadExport />} />
    <Route path="export-history" element={<LeadExportHistory />} />
    <Route path="import-history" element={<LeadImportHistory />} />
    <Route path="import-history/:id" element={<ImportHistoryDetail />} />
    <Route path="gl-api" element={<LeadGLAPIHistoryReport />} />
    <Route path="deleted" element={<LeadDeletedLeadsReport />} />
    <Route path="*" element={<Navigate to="/reports/lead" replace />} />
  </Routes>
);

const DealReportsRouter = () => (
  <Routes>
    <Route path="" element={<DealReportsLanding />} />
    <Route path="pipeline-summary" element={<DealPipelineSummaryReport />} />
    <Route path="forecast" element={<DealForecastReport />} />
    <Route path="velocity" element={<DealVelocityReport />} />
    <Route path="win-loss" element={<DealWinLossReport />} />
    <Route path="source-conversion" element={<DealSourceConversionReport />} />
    <Route path="rep-performance" element={<DealRepPerformanceReport />} />
    <Route path="aging" element={<DealAgingReport />} />
    <Route path="size-distribution" element={<DealSizeDistributionReport />} />
    <Route path="export" element={<DealExportReport />} />
    <Route path="export-history" element={<DealExportHistoryReport />} />
    <Route path="deleted" element={<DealDeletedReport />} />
    <Route path="*" element={<Navigate to="/reports/deal" replace />} />
  </Routes>
);

const TaskReportsRouter = () => (
  <Routes>
    <Route path="" element={<TaskReportsLanding />} />
    <Route path="summary" element={<TaskSummaryReport />} />
    <Route path="activity" element={<TaskActivityReport />} />
    <Route path="stage-history" element={<TaskStageHistoryReport />} />
    <Route path="pipeline-distribution" element={<TaskPipelineDistributionReport />} />
    <Route path="sla-breach" element={<TaskSLABreachReport />} />
    <Route path="recurring-compliance" element={<TaskRecurringComplianceReport />} />
    <Route path="team-performance" element={<TaskTeamPerformanceReport />} />
    <Route path="*" element={<Navigate to="/reports/task" replace />} />
  </Routes>
);

const CallReportsRouter = () => (
  <Routes>
    <Route path="ivr" element={
      <div className="report-content-wrapper with-sidebar">
        <div className="lead-reports-list">
          {callReportOptions.map((report) => (
            <NavLink key={report.id} to={report.path} className="lead-report-card">
              <div className="lead-report-card-content">
                <span className="lead-report-title">{report.title}</span>
                {report.description && <span className="lead-report-desc">{report.description}</span>}
              </div>
              <ChevronRight size={18} className="report-card-arrow" />
            </NavLink>
          ))}
        </div>
      </div>
    } />
    <Route path="dialer" element={<GLDialerCallReport />} />
    <Route path="feedback" element={<CallFeedbackReport />} />
    <Route path="" element={<Navigate to="/reports/call/ivr" replace />} />
    <Route path="*" element={<Navigate to="/reports/call" replace />} />
  </Routes>
);

export default ReportsPage;
