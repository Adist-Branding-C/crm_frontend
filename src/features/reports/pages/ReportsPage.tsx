import React from 'react';
import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
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
import DealStageReport from '../sub-pages/DealStageReport';
import LeadConversionReport from '../sub-pages/LeadConversionReport';
import DealExportReport from '../sub-pages/DealExportReport';
import DealExportHistoryReport from '../sub-pages/DealExportHistoryReport';
import DealDeletedReport from '../sub-pages/DealDeletedReport';
import TaskReportsLanding from '../sub-pages/TaskReportsLanding';
import TaskWiseReport from '../sub-pages/TaskWiseReport';
import LeadChangeReport from '../sub-pages/LeadChangeReport';
import TaskWorkReport from '../sub-pages/TaskWorkReport';
import GLDialerCallReport from '../sub-pages/GLDialerCallReport';
import CallFeedbackReport from '../sub-pages/CallFeedbackReport';
import CheckinReport from '../sub-pages/CheckinReport';
import AttendanceReport from '../sub-pages/AttendanceReport';
import AttendanceProfile from '../sub-pages/AttendanceProfile';
import { callReportOptions } from '../constants';
import './ReportsPage.css';

const ReportsPage = () => {
  return (
    <div className="account-page">
      <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
        <PageHeader title="Reports" breadcrumb={false} />

        <Routes>
          <Route path="lead/*" element={<LeadReportsRouter />} />
          {/* <Route path="deal/*" element={<DealReportsRouter />} /> */}
          {/* <Route path="task/*" element={<TaskReportsRouter />} /> */}
          {/* <Route path="call/*" element={<CallReportsRouter />} /> */}
          {/* <Route path="checkin" element={<CheckinReport />} /> */}
          {/* <Route path="attendance" element={<AttendanceReport />} /> */}
          {/* <Route path="attendance/profile/:staffId" element={<AttendanceProfile />} /> */}
          <Route path="" element={<Navigate to="/reports/lead" replace />} />
          <Route path="*" element={<Navigate to="/reports/lead" replace />} />
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
    <Route path="stage" element={<DealStageReport />} />
    <Route path="conversion" element={<LeadConversionReport />} />
    <Route path="visit" element={<div className="report-content-wrapper with-sidebar"></div>} />
    <Route path="export" element={<DealExportReport />} />
    <Route path="export-history" element={<DealExportHistoryReport />} />
    <Route path="deleted" element={<DealDeletedReport />} />
    <Route path="*" element={<Navigate to="/reports/deal" replace />} />
  </Routes>
);

const TaskReportsRouter = () => (
  <Routes>
    <Route path="" element={<TaskReportsLanding />} />
    <Route path="task-wise" element={<TaskWiseReport />} />
    <Route path="lead-change" element={<LeadChangeReport />} />
    <Route path="work" element={<TaskWorkReport />} />
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
