import React, { useState, useMemo, useRef, useEffect } from 'react';
import { NavLink, Routes, Route, Navigate, Link, useParams, useNavigate } from 'react-router-dom';
import { Users, DollarSign, ListChecks, Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, PhoneCall, ClipboardList, Clock, Calendar, List, RefreshCw, Globe, LogOut, Download, Upload, Server, Trash2, ChevronRight, ChevronLeft, ChevronUp, ChevronDown, Search, Filter, ArrowUpDown, ArrowDown, ArrowUp, RotateCcw, Edit2, MoreHorizontal, MessageCircle, MessageSquare, Home, Timer, Activity, ArrowLeft } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import LeadDetailDrawer from '../components/LeadDetailDrawer';
import ActionDropdownPortal from '../components/ActionDropdownPortal';
import LeadStatusWise from '../components/report-pages/LeadStatusWise';
import LeadStatusChange from '../components/report-pages/LeadStatusChange';
import LeadSourceWise from '../components/report-pages/LeadSourceWise';
import LeadCheckoutSummary from '../components/report-pages/LeadCheckoutSummary';
import LeadExport from '../components/report-pages/LeadExport';
import LeadExportHistory from '../components/report-pages/LeadExportHistory';
import LeadImportHistory from '../components/report-pages/LeadImportHistory';
import ImportHistoryDetail from '../components/report-pages/ImportHistoryDetail';
import './Reports.css';

const reportCategories = [
  { id: 'lead', title: 'Lead Reports', path: '/reports/lead', icon: Users },
  { id: 'deal', title: 'Deal Reports', path: '/reports/deal', icon: DollarSign },
  { id: 'task', title: 'Task Reports', path: '/reports/task', icon: ListChecks },
  { id: 'call', title: 'Call Reports', path: '/reports/call', icon: Phone },
  { id: 'checkin', title: 'Check-in & Check-out', path: '/reports/checkin', icon: ClipboardList },
  { id: 'attendance', title: 'Attendance Report', path: '/reports/attendance', icon: Clock },
];

const leadReportOptions = [
  { id: 'daily', title: 'Daily Activity Report', description: 'A compact overview of your team\'s sales progress', path: '/reports/lead/daily' },
  { id: 'status-wise', title: 'Status Wise Report', description: 'Track performance and progress segmented by various statuses for precise insights', path: '/reports/lead/status-wise' },
  { id: 'status-change', title: 'Status Change Report', description: 'An overview of key updates, tracking shifts in status for enhanced decision-making', path: '/reports/lead/status-change' },
  { id: 'source-wise', title: 'Source Wise Report', description: 'Evaluate the effectiveness of different lead sources with comprehensive data insights', path: '/reports/lead/source-wise' },
  { id: 'checkout', title: 'Check Out Summary report', description: 'Track employee engagement and activity with detailed check-in data', path: '/reports/lead/checkout' },
  { id: 'export', title: 'Export', description: 'Quickly download and share vital data for deeper offline analysis', path: '/reports/lead/export' },
  { id: 'export-history', title: 'Export History', description: 'Track all your past lead data exports for complete transparency', path: '/reports/lead/export-history' },
  { id: 'import-history', title: 'Import History', description: 'Track all your past lead data imports for complete transparency', path: '/reports/lead/import-history' },
  { id: 'gl-api', title: 'GL API History', description: 'Track all your past lead data api for complete transparency', path: '/reports/lead/gl-api' },
  { id: 'deleted', title: 'Deleted Leads', description: '', path: '/reports/lead/deleted' },
];

const dealReportOptions = [
  { id: 'stage', title: 'Deals by Stage', description: 'Overview of deals segmented by current stage in pipeline', path: '/reports/deal/stage' },
  { id: 'conversion', title: 'Lead Conversion', description: 'Track conversion rates from lead to deal', path: '/reports/deal/conversion' },
  { id: 'visit', title: 'Deal Visit', description: 'Record and analyze deal visit activities', path: '/reports/deal/visit' },
  { id: 'export', title: 'Deal Export', description: 'Export deal data for offline analysis', path: '/reports/deal/export' },
  { id: 'export-history', title: 'Deal Export History', description: 'Track all your past deal data exports', path: '/reports/deal/export-history' },
  { id: 'deleted', title: 'Deleted Deals', description: 'View and restore previously deleted deals', path: '/reports/deal/deleted' },
];

const taskReportOptions = [
  { id: 'task-wise', title: 'Task Wise Report', description: 'Comprehensive breakdown of tasks by category and status', path: '/reports/task/task-wise' },
  { id: 'lead-change', title: 'Lead Change Report', description: 'Track task-related lead changes and updates', path: '/reports/task/lead-change' },
  { id: 'work', title: 'Task Work Report', description: 'Analyze task completion and work distribution', path: '/reports/task/work' },
];

const callReportOptions = [
  { id: 'ivr', title: 'IVR Call Report', description: 'Detailed analysis of IVR call patterns and metrics', path: '/reports/call/ivr' },
  { id: 'dialer', title: 'GLDialer Call Report', description: 'Track dialer performance and call statistics', path: '/reports/call/dialer' },
  { id: 'feedback', title: 'Call Feedback Report', description: 'Customer feedback and satisfaction metrics', path: '/reports/call/feedback' },
];

const staffList = [
  { id: 1, name: 'All Staff' },
  { id: 2, name: 'Rameesa' },
  { id: 3, name: 'Fida Fathima' },
  { id: 4, name: 'Nandana K' },
  { id: 5, name: 'Aysha' },
  { id: 6, name: 'Nesri' },
];

const checkinData = [
  { id: 1, staffName: 'Rameesa', checkIn: '09:15 AM', checkOut: '06:30 PM', totalDuration: '9h 15m', status: 'Present' },
  { id: 2, staffName: 'Fida Fathima', checkIn: '09:00 AM', checkOut: '06:45 PM', totalDuration: '9h 45m', status: 'Present' },
  { id: 3, staffName: 'Nandana K', checkIn: '09:30 AM', checkOut: '06:00 PM', totalDuration: '8h 30m', status: 'Present' },
  { id: 4, staffName: 'Aysha', checkIn: '10:00 AM', checkOut: '05:45 PM', totalDuration: '7h 45m', status: 'Late' },
  { id: 5, staffName: 'Nesri', checkIn: '09:10 AM', checkOut: '06:15 PM', totalDuration: '9h 05m', status: 'Present' },
];

const attendanceData = [
  { id: 1, agent: 'Rameesa', workingDays: 22, leave: 1, duration: '180h', action: 'View' },
  { id: 2, agent: 'Fida Fathima', workingDays: 21, leave: 2, duration: '175h', action: 'View' },
  { id: 3, agent: 'Nandana K', workingDays: 20, leave: 3, duration: '165h', action: 'View' },
  { id: 4, agent: 'Aysha', workingDays: 23, leave: 0, duration: '185h', action: 'View' },
  { id: 5, agent: 'Nesri', workingDays: 19, leave: 4, duration: '158h', action: 'View' },
  { id: 6, agent: 'Rahmath', workingDays: 22, leave: 1, duration: '178h', action: 'View' },
  { id: 7, agent: 'Lana', workingDays: 21, leave: 2, duration: '172h', action: 'View' },
  { id: 8, agent: 'Dilshana', workingDays: 20, leave: 3, duration: '160h', action: 'View' },
];

const ReportsPage = () => {
  return (
    <div className="account-page">
      <div className="account-content" style={{ width: '100%', maxWidth: '100%' }}>
        <PageHeader title="Reports" breadcrumb={false} />

        <div className="report-tabs">
          {reportCategories.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) => isActive ? 'report-tab active' : 'report-tab'}
                end={item.path === '/reports'}
              >
                <Icon size={16} /> {item.title}
              </NavLink>
            );
          })}
        </div>

        <Routes>
          <Route path="lead/*" element={<LeadReportsRouter />} />
          <Route path="deal/*" element={<DealReportsRouter />} />
          <Route path="task/*" element={<TaskReportsRouter />} />
          <Route path="call/*" element={<CallReportsRouter />} />
          <Route path="checkin" element={<CheckinReport />} />
          <Route path="attendance" element={<AttendanceReport />} />
          <Route path="attendance/profile/:staffId" element={<AttendanceProfile />} />
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
    <Route path="daily" element={<LeadDailyActivityReportPage />} />
    <Route path="status-wise" element={<LeadStatusWise />} />
    <Route path="status-change" element={<LeadStatusChange />} />
    <Route path="source-wise" element={<LeadSourceWise />} />
    <Route path="checkout" element={<LeadCheckoutSummary />} />
    <Route path="export" element={<LeadExport />} />
    <Route path="export-history" element={<LeadExportHistory />} />
    <Route path="import-history" element={<LeadImportHistory />} />
    <Route path="import-history/:id" element={<ImportHistoryDetail />} />
    <Route path="gl-api" element={<LeadGLAPIHistoryReport />} />
    <Route path="deleted" element={<LeadDeletedLeadsReport />} />
    <Route path="*" element={<Navigate to="/reports/lead" replace />} />
  </Routes>
);

const LeadDailyActivityReportPage = () => {
  const [filters, setFilters] = useState({ dateFrom: '2026-04-01', dateTo: '2026-04-25', agent: 1, logType: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const logTypes = [
    { id: '', name: 'All' },
    { id: 'attendance', name: 'Attendance' },
    { id: 'visitor', name: 'Visitor' },
    { id: 'lead_add', name: 'Lead Add' },
    { id: 'task_add', name: 'Task Add' },
    { id: 'call_task_feedback', name: 'Call Task Feedback' },
    { id: 'deal_add', name: 'Deal Add' },
    { id: 'task_edit', name: 'Task Edit' },
    { id: 'lead_update', name: 'Lead Update' },
    { id: 'note_add', name: 'Note Added' },
    { id: 'call_log_add', name: 'Call Log Added' },
    { id: 'status_updated', name: 'Status Updated' },
    { id: 'purpose_updated', name: 'Purpose Updated' },
    { id: 'voice_note_add', name: 'Voice Note Added' },
    { id: 'file_note_add', name: 'File Note Added' },
  ];

  const agents = [
    { id: 1, name: 'All Agents' },
    { id: 2, name: 'Rameesa' },
    { id: 3, name: 'Fida Fathima' },
    { id: 4, name: 'Nandana K' },
    { id: 5, name: 'Aysha' },
    { id: 6, name: 'Nesri' },
  ];

  const sampleData = [
    { id: 1, agentName: 'Rameesa', total: 45, attendance: 22, visitor: 5, leadAdd: 12, taskAdd: 8, callTaskFeedback: 3, dealsAdd: 4, taskEdit: 6, leadUpdate: 10, noteAdd: 8, callLogAdd: 5, statusUpdated: 3, purposeUpdated: 2, voiceNoteAdd: 1, fileNoteAdd: 0 },
    { id: 2, agentName: 'Fida Fathima', total: 38, attendance: 21, visitor: 3, leadAdd: 10, taskAdd: 6, callTaskFeedback: 2, dealsAdd: 3, taskEdit: 5, leadUpdate: 8, noteAdd: 6, callLogAdd: 4, statusUpdated: 2, purposeUpdated: 1, voiceNoteAdd: 0, fileNoteAdd: 0 },
    { id: 3, agentName: 'Nandana K', total: 32, attendance: 20, visitor: 4, leadAdd: 8, taskAdd: 5, callTaskFeedback: 1, dealsAdd: 2, taskEdit: 4, leadUpdate: 6, noteAdd: 5, callLogAdd: 3, statusUpdated: 1, purposeUpdated: 1, voiceNoteAdd: 1, fileNoteAdd: 0 },
    { id: 4, agentName: 'Aysha', total: 28, attendance: 23, visitor: 2, leadAdd: 6, taskAdd: 4, callTaskFeedback: 1, dealsAdd: 1, taskEdit: 3, leadUpdate: 5, noteAdd: 4, callLogAdd: 2, statusUpdated: 1, purposeUpdated: 0, voiceNoteAdd: 0, fileNoteAdd: 0 },
    { id: 5, agentName: 'Nesri', total: 25, attendance: 19, visitor: 1, leadAdd: 5, taskAdd: 3, callTaskFeedback: 1, dealsAdd: 1, taskEdit: 2, leadUpdate: 4, noteAdd: 3, callLogAdd: 2, statusUpdated: 1, purposeUpdated: 0, voiceNoteAdd: 0, fileNoteAdd: 0 },
  ];

  const handleExport = () => {
    const csvContent = "Agent Name,Total,Attendance,Visitor,Lead Add,Task Add,Call Task Feedback,Deals Add,Task Edit,Lead Update,Note Added,Call Log Added,Status Updated,Purpose Updated,Voice Note Added,File Note Added\n" +
      sampleData.map(row => `${row.agentName},${row.total},${row.attendance},${row.visitor},${row.leadAdd},${row.taskAdd},${row.callTaskFeedback},${row.dealsAdd},${row.taskEdit},${row.leadUpdate},${row.noteAdd},${row.callLogAdd},${row.statusUpdated},${row.purposeUpdated},${row.voiceNoteAdd},${row.fileNoteAdd}`).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'daily_activity_report.csv';
    link.click();
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <div className="daily-report-content" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="toolbar-left">
          <button className={`btn btn-secondary ${showFilters ? 'active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
            <Filter size={16} />
            Filter
            <ChevronDown size={14} className={showFilters ? 'rotate' : ''} />
          </button>
        </div>

        {showFilters && (
          <div className="filters-panel">
            <div className="filter-row">
              <div className="filter-group">
                <label>Date From</label>
                <input type="date" value={filters.dateFrom} onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })} />
              </div>
              <div className="filter-group">
                <label>Date To</label>
                <input type="date" value={filters.dateTo} onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })} />
              </div>
              <div className="filter-group">
                <label>Agent</label>
                <select value={filters.agent} onChange={(e) => setFilters({ ...filters, agent: Number(e.target.value) })}>
                  {agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <label>Log Type</label>
                <select value={filters.logType} onChange={(e) => setFilters({ ...filters, logType: e.target.value })}>
                  {logTypes.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
              </div>
              <div className="filter-actions">
                <button className="btn btn-primary" onClick={() => { setSubmitted(true); setShowFilters(false); }}>Filter</button>
                <button className="btn btn-secondary" onClick={() => { setFilters({ dateFrom: '', dateTo: '', agent: 1, logType: '' }); setSubmitted(false); }}>Clear</button>
              </div>
            </div>
          </div>
        )}

        <div className="table-container">
          <table className="enquiries-table">
            <thead>
              <tr>
                <th>Agent Name</th>
                <th>Total</th>
                <th>Attendance</th>
                <th>Visitor</th>
                <th>Lead Add</th>
                <th>Task Add</th>
                <th>Call Task Feedback</th>
                <th>Deals Add</th>
                <th>Task Edit</th>
                <th>Lead Update</th>
                <th>Note Added</th>
                <th>Call log Added</th>
                <th>Status Updated</th>
                <th>Purpose Updated</th>
                <th>Voice Note Added</th>
                <th>File note Added</th>
              </tr>
            </thead>
            <tbody>
              {sampleData.map(row => (
                <tr key={row.id}>
                  <td>{row.agentName}</td>
                  <td className="total-cell">{row.total}</td>
                  <td>{row.attendance}</td>
                  <td>{row.visitor}</td>
                  <td>{row.leadAdd}</td>
                  <td>{row.taskAdd}</td>
                  <td>{row.callTaskFeedback}</td>
                  <td>{row.dealsAdd}</td>
                  <td>{row.taskEdit}</td>
                  <td>{row.leadUpdate}</td>
                  <td>{row.noteAdd}</td>
                  <td>{row.callLogAdd}</td>
                  <td>{row.statusUpdated}</td>
                  <td>{row.purposeUpdated}</td>
                  <td>{row.voiceNoteAdd}</td>
                  <td>{row.fileNoteAdd}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const LeadReportsLanding = () => (
  <div className="report-content-wrapper with-sidebar">
    <div className="lead-reports-list">
      {leadReportOptions.map((report) => (
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

const DealReportsRouter = () => (
  <Routes>
    <Route path="" element={<DealReportsLanding />} />
    <Route path="stage" element={<DealStageReport />} />
    <Route path="conversion" element={<LeadConversionReport />} />
    <Route path="visit" element={<DealVisitReport />} />
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
    <Route path="ivr" element={<IVRCallReport />} />
    <Route path="dialer" element={<GLDialerCallReport />} />
    <Route path="feedback" element={<CallFeedbackReport />} />
    <Route path="" element={<Navigate to="/reports/call/ivr" replace />} />
    <Route path="*" element={<Navigate to="/reports/call" replace />} />
  </Routes>
);

const LeadDailyActivityReport = () => (
  <div className="report-content-wrapper with-sidebar ">
    <div className="lead-reports-list">
      {leadReportOptions.map((report) => (
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

const LeadStatusWiseReportContent = () => (
  <div className="report-content-wrapper with-sidebar">
    <div className="lead-reports-list">
      {leadReportOptions.map((report) => (
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

const LeadStatusChangeReport = () => (
  <div className="report-content-wrapper with-sidebar">
  </div>
);

const LeadSourceWiseReport = () => (
  <div className="report-content-wrapper with-sidebar">
  </div>
);

const LeadCheckoutSummaryReport = () => (
  <div className="report-content-wrapper with-sidebar">
  </div>
);

const LeadExportReport = () => (
  <div className="report-content-wrapper with-sidebar">
  </div>
);

const LeadExportHistoryReport = () => (
  <div className="report-content-wrapper with-sidebar">
  </div>
);

const LeadImportHistoryReport = () => (
  <div className="report-content-wrapper with-sidebar">
  </div>
);

const LeadGLAPIHistoryReport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ purpose: '', status: '' });

  const sampleData = [
    { id: 8927040, slNo: 267, via: 'API', leadName: 'Muhammed Aadhil', mobile: '919895205752', assignedTo: 'Rahmath', purpose: '', source: '1000 | Bukhara | Teena | MBBS | Lead | 3/4/26', status: 'Junk Lead _ Form not submitted', count: 0, dateTime: '20 Apr 2026 12:19:08 PM', updatedAt: '30 Apr 2026 12:57:34 PM' },
    { id: 8977734, slNo: 122, via: 'API', leadName: 'Sarath', mobile: '917736068676', assignedTo: 'Fida Fathima', purpose: '', source: '1000 | MBBS | Teena | Georgia | Lead | 3/4/26', status: 'Junk Lead _ Form not submitted', count: 0, dateTime: '24 Apr 2026 11:20:04 AM', updatedAt: '30 Apr 2026 12:57:34 PM' },
    { id: 8977732, slNo: 125, via: 'API', leadName: 'MonIrul', mobile: '917012719127', assignedTo: 'Rameesa', purpose: 'DND', source: '1000 | MBBS | Teena | Georgia | Lead | 3/4/26', status: 'DND - NA/ Off/ Invalid/ No incoming / Busy', count: 0, dateTime: '24 Apr 2026 11:20:04 AM', updatedAt: '30 Apr 2026 12:57:34 PM' },
    { id: 8927041, slNo: 269, via: 'API', leadName: 'Adithyan lal', mobile: '918590271518', assignedTo: 'Nandana K', purpose: '', source: '1000 | MBBS | Teena | Georgia | Lead | 3/4/26', status: 'DND - NA/ Off/ Invalid/ No incoming / Busy', count: 0, dateTime: '20 Apr 2026 12:19:08 PM', updatedAt: '30 Apr 2026 12:57:34 PM' },
    { id: 8927042, slNo: 270, via: 'API', leadName: 'Rupesh Kumar', mobile: '917827847553', assignedTo: 'Fida Fathima', purpose: 'Lost', source: '1000 | MBBS | Teena | Georgia | Lead | 3/4/26', status: 'Junk Lead _ Hindi/Arabic/ Bengali', count: 0, dateTime: '20 Apr 2026 12:19:08 PM', updatedAt: '30 Apr 2026 12:57:34 PM' },
    { id: 8878787, slNo: 400, via: 'API', leadName: 'Abraham', mobile: '919446375014', assignedTo: 'Aysha', purpose: '', source: '1000 | MBBS | Teena | Georgia | Lead | 3/4/26', status: 'Junk Lead _ Form not submitted', count: 0, dateTime: '18 Apr 2026 12:03:36 PM', updatedAt: '30 Apr 2026 12:57:34 PM' },
    { id: 8878786, slNo: 401, via: 'API', leadName: '温德尔 库马尔', mobile: '919365611192', assignedTo: 'Nesri', purpose: '', source: '1000 | MBBS | Teena | Georgia | Lead | 3/4/26', status: 'Junk Lead _ Hindi/Arabic/ Bengali', count: 0, dateTime: '18 Apr 2026 12:03:36 PM', updatedAt: '30 Apr 2026 12:57:34 PM' },
    { id: 8878785, slNo: 402, via: 'API', leadName: 'Amit Kumar Jay Bheem पाने ब्रो किंग GKP up 53', mobile: '919519499714', assignedTo: 'Rahmath', purpose: '', source: '1000 | MBBS | Teena | Georgia | Lead | 3/4/26', status: 'Junk Lead _ Hindi/Arabic/ Bengali', count: 0, dateTime: '18 Apr 2026 12:03:36 PM', updatedAt: '30 Apr 2026 12:57:34 PM' },
    { id: 8861448, slNo: 488, via: 'API', leadName: 'mohamed arshad', mobile: '918891105190', assignedTo: 'Rameesa', purpose: 'DND', source: '1000 | MBBS | Teena | Georgia | Lead | 3/4/26', status: 'DND - NA/ Off/ Invalid/ No incoming / Busy', count: 0, dateTime: '16 Apr 2026 01:47:19 PM', updatedAt: '30 Apr 2026 12:57:34 PM' },
    { id: 8861447, slNo: 489, via: 'API', leadName: 'Navaneeth bargavan p', mobile: '917012099175', assignedTo: 'Aysha', purpose: '', source: '1000 | MBBS | Teena | Georgia | Lead | 3/4/26', status: 'Not Interested', count: 0, dateTime: '16 Apr 2026 01:47:19 PM', updatedAt: '30 Apr 2026 12:57:34 PM' },
  ];

  const filteredData = useMemo(() => {
    let data = [...sampleData];
    if (searchQuery) {
      data = data.filter(item =>
        item.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.mobile.includes(searchQuery) ||
        item.slNo.toString().includes(searchQuery)
      );
    }
    if (filters.purpose) {
      data = data.filter(item => item.purpose === filters.purpose);
    }
    if (filters.status) {
      data = data.filter(item => item.status === filters.status);
    }
    return data;
  }, [searchQuery, filters]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(paginatedData.map(item => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="GL API History" description="Track all your past lead data api" />
      
      <div className="toolbar-left">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <button className={`btn btn-secondary ${showFilters ? 'active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
          <Filter size={16} />
          Filter
          <ChevronDown size={14} className={showFilters ? 'rotate' : ''} />
        </button>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-row">
            <div className="filter-group">
              <label>Purpose</label>
              <select value={filters.purpose} onChange={(e) => setFilters({ ...filters, purpose: e.target.value })}>
                <option value="">All</option>
                <option value="DND">DND</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Status</label>
              <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                <option value="">All</option>
                <option value="Junk Lead _ Form not submitted">Junk Lead _ Form not submitted</option>
                <option value="Not Interested">Not Interested</option>
              </select>
            </div>
            <div className="filter-actions">
              <button className="btn btn-primary" onClick={() => setShowFilters(false)}>Filter</button>
              <button className="btn btn-secondary" onClick={() => { setFilters({ purpose: '', status: '' }); setShowFilters(false); }}>Clear</button>
            </div>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" checked={paginatedData.length > 0 && selectedRows.length === paginatedData.length} onChange={handleSelectAll} />
              </th>
              <th>SL No</th>
              <th>VIA</th>
              <th>Lead Name</th>
              <th>Mobile</th>
              <th>Assigned To</th>
              <th>Purpose</th>
              <th>Source</th>
              <th>Status</th>
              <th>count</th>
              <th>Date/Time</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(row => (
              <tr key={row.id}>
                <td>
                  <input type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => handleSelectRow(row.id)} />
                </td>
                <td>{row.slNo}</td>
                <td>{row.via}</td>
                <td>{row.leadName}</td>
                <td>{row.mobile}</td>
                <td>{row.assignedTo}</td>
                <td>{row.purpose}</td>
                <td>{row.source}</td>
                <td>{row.status}</td>
                <td>{row.count}</td>
                <td>{row.dateTime}</td>
                <td>{row.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}>
        <div className="pagination-info">
          Showing {filteredData.length > 0 ? startIndex + 1 : 0} to {Math.min(currentPage * rowsPerPage, filteredData.length)} of {filteredData.length} entries
        </div>
        <div className="pagination-controls">
          <button className="btn btn-secondary" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
            <button key={i} className={`btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
          ))}
          <button className="btn btn-secondary" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
};

const LeadDeletedLeadsReport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showActionsDropdown, setShowActionsDropdown] = useState(false);
  const [sortDropdownClosing, setSortDropdownClosing] = useState(false);
  const [actionsDropdownClosing, setActionsDropdownClosing] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const [actionMenuButtonRect, setActionMenuButtonRect] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const sortDropdownRef = useRef(null);
  const actionsDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target)) {
        if (showSortDropdown) {
          setSortDropdownClosing(true);
          setTimeout(() => {
            setShowSortDropdown(false);
            setSortDropdownClosing(false);
          }, 150);
        }
      }
      if (actionsDropdownRef.current && !actionsDropdownRef.current.contains(event.target)) {
        if (showActionsDropdown) {
          setActionsDropdownClosing(true);
          setTimeout(() => {
            setShowActionsDropdown(false);
            setActionsDropdownClosing(false);
          }, 150);
        }
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (showSortDropdown) {
          setSortDropdownClosing(true);
          setTimeout(() => {
            setShowSortDropdown(false);
            setSortDropdownClosing(false);
          }, 150);
        }
        if (showActionsDropdown) {
          setActionsDropdownClosing(true);
          setTimeout(() => {
            setShowActionsDropdown(false);
            setActionsDropdownClosing(false);
          }, 150);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showSortDropdown, showActionsDropdown]);

  const sampleData = [
    { id: 1, name: 'Rahul Sharma', phone: '9876543210', email: 'rahul@email.com', location: 'Kochi, Kerala', assignedTo: 'John Doe', purpose: 'Sales', type: 'Hot Lead', status: 'Active', source: 'Website', createdAt: '2024-01-15', updatedAt: '2024-01-20', deletedAt: '2024-01-25', deleteReason: 'Duplicate' },
    { id: 2, name: 'Priya Patel', phone: '9876543211', email: 'priya@email.com', location: 'Trivandrum, Kerala', assignedTo: 'Jane Smith', purpose: 'Support', type: 'Cold Lead', status: 'Inactive', source: 'Referral', createdAt: '2024-01-14', updatedAt: '2024-01-19', deletedAt: '2024-01-26', deleteReason: 'Not Interested' },
    { id: 3, name: 'Amit Kumar', phone: '9876543212', email: 'amit@email.com', location: 'Bangalore, Karnataka', assignedTo: 'John Doe', purpose: 'Sales', type: 'Warm Lead', status: 'Active', source: 'Social Media', createdAt: '2024-01-13', updatedAt: '2024-01-18', deletedAt: '2024-01-24', deleteReason: 'Spam' },
    { id: 4, name: 'Sneha Reddy', phone: '9876543213', email: 'sneha@email.com', location: 'Hyderabad, Telangana', assignedTo: 'Mike Johnson', purpose: 'Demo', type: 'Hot Lead', status: 'Pending', source: 'Website', createdAt: '2024-01-12', updatedAt: '2024-01-17', deletedAt: '2024-01-23', deleteReason: 'Invalid Number' },
    { id: 5, name: 'Vikram Singh', phone: '9876543214', email: 'vikram@email.com', location: 'Chennai, Tamil Nadu', assignedTo: 'Jane Smith', purpose: 'Sales', type: 'Cold Lead', status: 'Active', source: 'Email Campaign', createdAt: '2024-01-11', updatedAt: '2024-01-16', deletedAt: '2024-01-22', deleteReason: 'Duplicate' },
    { id: 6, name: 'Ananya Gupta', phone: '9876543215', email: 'ananya@email.com', location: 'Mumbai, Maharashtra', assignedTo: 'John Doe', purpose: 'Support', type: 'Warm Lead', status: 'Inactive', source: 'Referral', createdAt: '2024-01-10', updatedAt: '2024-01-15', deletedAt: '2024-01-21', deleteReason: 'Not Interested' },
    { id: 7, name: 'Rajesh Verma', phone: '9876543216', email: 'rajesh@email.com', location: 'Delhi, NCR', assignedTo: 'Mike Johnson', purpose: 'Sales', type: 'Hot Lead', status: 'Active', source: 'Website', createdAt: '2024-01-09', updatedAt: '2024-01-14', deletedAt: '2024-01-20', deleteReason: 'Spam' },
    { id: 8, name: 'Kavitha Nair', phone: '9876543217', email: 'kavitha@email.com', location: 'Kolkata, West Bengal', assignedTo: 'Jane Smith', purpose: 'Demo', type: 'Cold Lead', status: 'Pending', source: 'Social Media', createdAt: '2024-01-08', updatedAt: '2024-01-13', deletedAt: '2024-01-19', deleteReason: 'Invalid Number' },
  ];

  const [filters, setFilters] = useState({
    type: '',
    dateRange: { start: '', end: '' },
    filterByDate: '',
    enquirySource: '',
    enquiryPurpose: '',
    leadStatus: '',
    followupAdded: '',
    createdBy: '',
    assignedTo: '',
    leadType: '',
    location: '',
    deleteReason: ''
  });

  const closeSortDropdown = () => {
    setSortDropdownClosing(true);
    setTimeout(() => {
      setShowSortDropdown(false);
      setSortDropdownClosing(false);
    }, 150);
  };

  const closeActionsDropdown = () => {
    setActionsDropdownClosing(true);
    setTimeout(() => {
      setShowActionsDropdown(false);
      setActionsDropdownClosing(false);
    }, 150);
  };

  const filteredData = useMemo(() => {
    let data = [...sampleData];

    if (searchQuery) {
      data = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone.includes(searchQuery) ||
        item.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (filters.enquirySource) {
      data = data.filter(item => item.source === filters.enquirySource);
    }
    if (filters.enquiryPurpose) {
      data = data.filter(item => item.purpose === filters.enquiryPurpose);
    }
    if (filters.leadStatus) {
      data = data.filter(item => item.status === filters.leadStatus);
    }
    if (filters.assignedTo) {
      data = data.filter(item => item.assignedTo === filters.assignedTo);
    }
    if (filters.leadType) {
      data = data.filter(item => item.type === filters.leadType);
    }
    if (filters.location) {
      data = data.filter(item => item.location && item.location.toLowerCase().includes(filters.location.toLowerCase()));
    }
    if (filters.deleteReason) {
      data = data.filter(item => item.deleteReason === filters.deleteReason);
    }
    if (filters.createdBy) {
      data = data.filter(item => item.createdBy === filters.createdBy);
    }

    if (sortConfig.key) {
      data.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return data;
  }, [searchQuery, filters, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSortDesc = (key) => {
    setSortConfig({ key, direction: 'desc' });
  };

  const handleSortAsc = (key) => {
    setSortConfig({ key, direction: 'asc' });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(paginatedData.map(item => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleRecoverLead = (id) => {
    if (confirm('Are you sure you want to recover this lead?')) {
      console.log('Recover lead:', id);
    }
  };

  const handleRecoverAll = () => {
    if (selectedRows.length === 0) {
      alert('Please select at least one lead to recover');
      return;
    }
    if (confirm(`Are you sure you want to recover ${selectedRows.length} selected lead(s)?`)) {
      console.log('Recover leads:', selectedRows);
    }
  };

  const clearFilters = () => {
    setFilters({
      type: '',
      dateRange: { start: '', end: '' },
      filterByDate: '',
      enquirySource: '',
      enquiryPurpose: '',
      leadStatus: '',
      followupAdded: '',
      createdBy: '',
      assignedTo: '',
      leadType: '',
      location: '',
      deleteReason: ''
    });
    setShowFilters(false);
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Deleted Leads" description="View and restore previously deleted leads" />
      
      <div className="toolbar-left">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <button className={`btn btn-secondary ${showFilters ? 'active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
          <Filter size={16} />
          Filter
          <ChevronDown size={14} className={showFilters ? 'rotate' : ''} />
        </button>
        <div className="dropdown-container" ref={sortDropdownRef}>
          <button className={`btn btn-secondary ${showSortDropdown ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); if (showSortDropdown) { closeSortDropdown(); } else { setShowSortDropdown(true); setShowActionsDropdown(false); } }}>
            <ArrowUpDown size={16} />
            Sort By
            <ChevronDown size={14} className={showSortDropdown ? 'rotate' : ''} />
          </button>
          {showSortDropdown && (
            <div className={`premium-dropdown sort-dropdown ${sortDropdownClosing ? 'closing' : ''}`}>
              <div className="dropdown-header">Sort By</div>
              <button className={`dropdown-item ${sortConfig.key === 'name' && sortConfig.direction === 'desc' ? 'selected' : ''}`} onClick={() => { handleSortDesc('name'); closeSortDropdown(); }}>
                <ArrowDown size={16} />
                <span>Name (Z-A)</span>
              </button>
              <button className={`dropdown-item ${sortConfig.key === 'name' && sortConfig.direction === 'asc' ? 'selected' : ''}`} onClick={() => { handleSortAsc('name'); closeSortDropdown(); }}>
                <ArrowUp size={16} />
                <span>Name (A-Z)</span>
              </button>
              <button className={`dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === 'desc' ? 'selected' : ''}`} onClick={() => { handleSortDesc('createdAt'); closeSortDropdown(); }}>
                <ArrowDown size={16} />
                <span>Newest First</span>
              </button>
              <button className={`dropdown-item ${sortConfig.key === 'createdAt' && sortConfig.direction === 'asc' ? 'selected' : ''}`} onClick={() => { handleSortAsc('createdAt'); closeSortDropdown(); }}>
                <ArrowUp size={16} />
                <span>Oldest First</span>
              </button>
              <button className={`dropdown-item ${sortConfig.key === 'deletedAt' && sortConfig.direction === 'desc' ? 'selected' : ''}`} onClick={() => { handleSortDesc('deletedAt'); closeSortDropdown(); }}>
                <ArrowDown size={16} />
                <span>Recently Deleted</span>
              </button>
              <button className={`dropdown-item ${sortConfig.key === 'deletedAt' && sortConfig.direction === 'asc' ? 'selected' : ''}`} onClick={() => { handleSortAsc('deletedAt'); closeSortDropdown(); }}>
                <ArrowUp size={16} />
                <span>Earlier Deleted</span>
              </button>
            </div>
          )}
        </div>
        <div className="toolbar-right">
          <button className="btn btn-primary" onClick={handleRecoverAll} disabled={selectedRows.length === 0}>
            <RotateCcw size={16} />
            Recover Lead ({selectedRows.length})
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-row">
            <div className="filter-group">
              <label>Type</label>
              <select value={filters.leadType} onChange={(e) => setFilters({ ...filters, leadType: e.target.value })}>
                <option value="">All</option>
                <option value="Hot Lead">Hot Lead</option>
                <option value="Cold Lead">Cold Lead</option>
                <option value="Warm Lead">Warm Lead</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Date Range</label>
              <div className="date-range-input">
                <input type="date" value={filters.dateRange.start} onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } })} placeholder="Start" />
                <span>to</span>
                <input type="date" value={filters.dateRange.end} onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } })} placeholder="End" />
              </div>
            </div>
            <div className="filter-group">
              <label>Filter by Date</label>
              <select value={filters.filterByDate} onChange={(e) => setFilters({ ...filters, filterByDate: e.target.value })}>
                <option value="">Select</option>
                <option value="created">Created Date</option>
                <option value="deleted">Deleted Date</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Source</label>
              <select value={filters.enquirySource} onChange={(e) => setFilters({ ...filters, enquirySource: e.target.value })}>
                <option value="">Select</option>
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Social Media">Social Media</option>
                <option value="Email Campaign">Email Campaign</option>
              </select>
            </div>
          </div>
          <div className="filter-row">
            <div className="filter-group">
              <label>Purpose</label>
              <select value={filters.enquiryPurpose} onChange={(e) => setFilters({ ...filters, enquiryPurpose: e.target.value })}>
                <option value="">All</option>
                <option value="Sales">Sales</option>
                <option value="Support">Support</option>
                <option value="Demo">Demo</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Status</label>
              <select value={filters.leadStatus} onChange={(e) => setFilters({ ...filters, leadStatus: e.target.value })}>
                <option value="">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Delete Reason</label>
              <select value={filters.deleteReason} onChange={(e) => setFilters({ ...filters, deleteReason: e.target.value })}>
                <option value="">All</option>
                <option value="Duplicate">Duplicate</option>
                <option value="Not Interested">Not Interested</option>
                <option value="Spam">Spam</option>
                <option value="Invalid Number">Invalid Number</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Assigned To</label>
              <select value={filters.assignedTo} onChange={(e) => setFilters({ ...filters, assignedTo: e.target.value })}>
                <option value="">All</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
                <option value="Mike Johnson">Mike Johnson</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Location</label>
              <input type="text" placeholder="Enter location" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} />
            </div>
          </div>
          <div className="filter-row">
            <div className="filter-group">
              <label>Created By</label>
              <select value={filters.createdBy} onChange={(e) => setFilters({ ...filters, createdBy: e.target.value })}>
                <option value="">All</option>
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
                <option value="Mike Johnson">Mike Johnson</option>
              </select>
            </div>
            <div className="filter-actions">
              <button className="btn btn-primary" onClick={() => setShowFilters(false)}>Filter</button>
              <button className="btn btn-secondary" onClick={clearFilters}>Clear</button>
            </div>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" checked={paginatedData.length > 0 && selectedRows.length === paginatedData.length} onChange={handleSelectAll} />
              </th>
              <th>Action</th>
              <th onClick={() => handleSort('name')} className="sortable">
                Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
              </th>
              <th onClick={() => handleSort('phone')} className="sortable">
                Phone {sortConfig.key === 'phone' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
              </th>
              <th onClick={() => handleSort('location')} className="sortable">
                Location {sortConfig.key === 'location' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
              </th>
              <th onClick={() => handleSort('assignedTo')} className="sortable">
                Assigned To {sortConfig.key === 'assignedTo' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
              </th>
              <th onClick={() => handleSort('purpose')} className="sortable">
                Purpose {sortConfig.key === 'purpose' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
              </th>
              <th onClick={() => handleSort('type')} className="sortable">
                Type {sortConfig.key === 'type' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
              </th>
              <th onClick={() => handleSort('status')} className="sortable">
                Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
              </th>
              <th onClick={() => handleSort('source')} className="sortable">
                Source {sortConfig.key === 'source' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
              </th>
              <th onClick={() => handleSort('createdAt')} className="sortable">
                Created At {sortConfig.key === 'createdAt' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
              </th>
              <th onClick={() => handleSort('deletedAt')} className="sortable">
                Deleted At {sortConfig.key === 'deletedAt' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
              </th>
              <th>Delete Reason</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(row => (
              <tr key={row.id} className={selectedRows.includes(row.id) ? 'selected' : ''}>
                <td><input type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => handleSelectRow(row.id)} /></td>
                <td className="action-cell">
                  <div className="action-menu-container">
                    <button 
                      className="action-btn" 
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        if (actionMenuOpen === row.id) {
                          setActionMenuOpen(null);
                        } else {
                          setActionMenuOpen(row.id);
                          setActionMenuButtonRect(rect);
                        }
                      }}>
                      <MoreHorizontal size={16} />
                    </button>
                    {actionMenuOpen === row.id && actionMenuButtonRect && (
                      <ActionDropdownPortal
                        isOpen={actionMenuOpen === row.id}
                        buttonRect={actionMenuButtonRect}
                        onClose={() => { setActionMenuOpen(null); setActionMenuButtonRect(null); }}
                      >
                        <button onClick={() => { handleRecoverLead(row.id); setActionMenuOpen(null); setActionMenuButtonRect(null); }}>
                          <RotateCcw size={14} /> Recover
                        </button>
                      </ActionDropdownPortal>
                    )}
                  </div>
                </td>
                <td className="lead-name-cell" onClick={() => setSelectedLead(row)}>{row.name}</td>
                <td>{row.phone}</td>
                <td>{row.location}</td>
                <td>{row.assignedTo}</td>
                <td>{row.purpose}</td>
                <td><span className={`badge badge-${row.type.toLowerCase().replace(' ', '-')}`}>{row.type}</span></td>
                <td><span className={`badge badge-${row.status.toLowerCase()}`}>{row.status}</span></td>
                <td>{row.source}</td>
                <td>{row.createdAt}</td>
                <td>{row.deletedAt}</td>
                <td>{row.deleteReason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-left">
          <span className="rows-label">Rows per page:</span>
          <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="rows-select">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="pagination-info">
            Showing {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length}
          </span>
        </div>
        <div className="pagination-right">
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>First</button>
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
            <ChevronLeft size={16} />
          </button>
          <span className="page-indicator">Page {currentPage} of {totalPages}</span>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
            <ChevronRight size={16} />
          </button>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>Last</button>
        </div>
      </div>
      <LeadDetailDrawer lead={selectedLead} isOpen={!!selectedLead} onClose={() => setSelectedLead(null)} />
    </div>
  );
};

const DealReportsLanding = () => (
  <div className="report-content-wrapper with-sidebar">
    <div className="lead-reports-list">
      {dealReportOptions.map((report) => (
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

const DealStageReport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const stageData = [
    { stage: 'Open', count: 45, amount: 125000, color: '#3b82f6' },
    { stage: 'Close', count: 28, amount: 85000, color: '#f59e0b' },
    { stage: 'Win', count: 18, amount: 62000, color: '#10b981' },
  ];

  const agentData = [
    { id: 1, name: 'John Doe', totalDeals: 45, openDeals: 12, winDeals: 8, closeDeals: 25 },
    { id: 2, name: 'Jane Smith', totalDeals: 38, openDeals: 10, winDeals: 6, closeDeals: 22 },
    { id: 3, name: 'Mike Johnson', totalDeals: 32, openDeals: 8, winDeals: 5, closeDeals: 19 },
    { id: 4, name: 'Sarah Williams', totalDeals: 28, openDeals: 7, winDeals: 4, closeDeals: 17 },
    { id: 5, name: 'David Brown', totalDeals: 25, openDeals: 6, winDeals: 3, closeDeals: 16 },
    { id: 6, name: 'Emily Davis', totalDeals: 22, openDeals: 5, winDeals: 2, closeDeals: 15 },
    { id: 7, name: 'Chris Wilson', totalDeals: 18, openDeals: 4, winDeals: 2, closeDeals: 12 },
    { id: 8, name: 'Amanda Taylor', totalDeals: 15, openDeals: 3, winDeals: 1, closeDeals: 11 },
  ];

  const filteredData = useMemo(() => {
    let data = [...agentData];
    if (searchQuery) {
      data = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return data;
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleExport = () => {
    const headers = ['Agent Name', 'Total Deals', 'Open Deals', 'Win Deals', 'Close Deals'];
    const csvContent = [headers.join(','), ...filteredData.map(d => [d.name, d.totalDeals, d.openDeals, d.winDeals, d.closeDeals].join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'deal_stage_report.csv';
    link.click();
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Deals by Stage" description="Overview of deals segmented by current stage in pipeline" />
      
      <div className="deal-stage-stats">
        {stageData.map((item, index) => (
          <div key={index} className="deal-stage-card">
            <div className="deal-stage-icon" style={{ background: item.color + '20' }}>
              <DollarSign size={20} color={item.color} />
            </div>
            <div className="deal-stage-info">
              <span className="deal-stage-value">{item.count}</span>
              <span className="deal-stage-label">{item.stage} Deals</span>
            </div>
            <div className="deal-stage-amount">${item.amount.toLocaleString()}</div>
          </div>
        ))}
      </div>

      <div className="toolbar-left">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="toolbar-right">
          <button className="btn btn-primary" onClick={handleExport}>
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              <th>Agent Name</th>
              <th>Total Deals</th>
              <th>Open Deals</th>
              <th>Win Deals</th>
              <th>Close Deals</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(row => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.totalDeals}</td>
                <td>{row.openDeals}</td>
                <td>{row.winDeals}</td>
                <td>{row.closeDeals}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-left">
          <span className="rows-label">Rows per page:</span>
          <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="rows-select">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
          <span className="pagination-info">
            Showing {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length}
          </span>
        </div>
        <div className="pagination-right">
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>First</button>
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
            <ChevronLeft size={16} />
          </button>
          <span className="page-indicator">Page {currentPage} of {totalPages}</span>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
            <ChevronRight size={16} />
          </button>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>Last</button>
        </div>
      </div>
    </div>
  );
};

const LeadConversionReport = () => {
  const [filters, setFilters] = useState({ dateFrom: '2024-01-01', dateTo: '2024-01-31', agent: '', search: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const agents = [
    { id: 1, name: 'All Agents' },
    { id: 2, name: 'John Doe' },
    { id: 3, name: 'Jane Smith' },
    { id: 4, name: 'Mike Johnson' },
    { id: 5, name: 'Sarah Williams' },
    { id: 6, name: 'David Brown' },
  ];

  const leadSummary = { totalLeads: 245, totalDeals: 89, open: 45, win: 28, lose: 16 };

  const dealData = [
    { id: 1, dealCode: 'DL001', dealName: 'TechCorp Deal', leadName: 'Rahul Sharma', mobile: '9876543210', dealAmount: 50000, dealStatus: 'Open', leadSource: 'Website', lostReason: '', startDate: '2024-01-15', endDate: '2024-02-15', staffName: 'John Doe', createdBy: 'Admin', updatedAt: '2024-01-20' },
    { id: 2, dealCode: 'DL002', dealName: 'Startup Deal', leadName: 'Priya Patel', mobile: '9876543211', dealAmount: 25000, dealStatus: 'Win', leadSource: 'Referral', lostReason: '', startDate: '2024-01-14', endDate: '2024-02-14', staffName: 'Jane Smith', createdBy: 'Admin', updatedAt: '2024-01-19' },
    { id: 3, dealCode: 'DL003', dealName: 'Global Deal', leadName: 'Amit Kumar', mobile: '9876543212', dealAmount: 75000, dealStatus: 'Lost', leadSource: 'Social Media', lostReason: 'Not Interested', startDate: '2024-01-13', endDate: '2024-02-13', staffName: 'John Doe', createdBy: 'Admin', updatedAt: '2024-01-18' },
    { id: 4, dealCode: 'DL004', dealName: 'SmallBiz Deal', leadName: 'Sneha Reddy', mobile: '9876543213', dealAmount: 15000, dealStatus: 'Open', leadSource: 'Website', lostReason: '', startDate: '2024-01-12', endDate: '2024-02-12', staffName: 'Mike Johnson', createdBy: 'Admin', updatedAt: '2024-01-17' },
    { id: 5, dealCode: 'DL005', dealName: 'MegaCorp Deal', leadName: 'Vikram Singh', mobile: '9876543214', dealAmount: 100000, dealStatus: 'Win', leadSource: 'Email Campaign', lostReason: '', startDate: '2024-01-11', endDate: '2024-02-11', staffName: 'Jane Smith', createdBy: 'Admin', updatedAt: '2024-01-16' },
    { id: 6, dealCode: 'DL006', dealName: 'Enterprise Deal', leadName: 'Ananya Gupta', mobile: '9876543215', dealAmount: 35000, dealStatus: 'Lost', leadSource: 'Referral', lostReason: 'Price High', startDate: '2024-01-10', endDate: '2024-02-10', staffName: 'John Doe', createdBy: 'Admin', updatedAt: '2024-01-15' },
    { id: 7, dealCode: 'DL007', dealName: 'Corporate Deal', leadName: 'Rajesh Verma', mobile: '9876543216', dealAmount: 45000, dealStatus: 'Open', leadSource: 'Website', lostReason: '', startDate: '2024-01-09', endDate: '2024-02-09', staffName: 'Mike Johnson', createdBy: 'Admin', updatedAt: '2024-01-14' },
    { id: 8, dealCode: 'DL008', dealName: 'Business Deal', leadName: 'Kavitha Nair', mobile: '9876543217', dealAmount: 28000, dealStatus: 'Win', leadSource: 'Social Media', lostReason: '', startDate: '2024-01-08', endDate: '2024-02-08', staffName: 'Jane Smith', createdBy: 'Admin', updatedAt: '2024-01-13' },
  ];

  const filteredDealData = useMemo(() => {
    let data = [...dealData];
    if (filters.search) {
      data = data.filter(item =>
        item.leadName.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.dealCode.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.mobile.includes(filters.search)
      );
    }
    if (filters.agent && filters.agent !== 1) {
      data = data.filter(item => item.staffName === agents.find(a => a.id === filters.agent)?.name);
    }
    return data;
  }, [filters, submit]);

  const totalPages = Math.ceil(filteredDealData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredDealData.slice(startIndex, startIndex + rowsPerPage);

  const handleExport = (type) => {
    const headers = type === 'lead' 
      ? ['Total Leads', 'Total Deals', 'Open', 'Win', 'Lose']
      : ['SL No', 'Deal Code', 'Deal Name', 'Lead Name', 'Mobile Number', 'Deal Amount', 'Deal Status', 'Lead Source', 'Lost Reason', 'Start Date', 'End Date', 'Staff Name', 'Created By', 'Updated At'];
    
    const rows = type === 'lead'
      ? [[leadSummary.totalLeads, leadSummary.totalDeals, leadSummary.open, leadSummary.win, leadSummary.lose]]
      : filteredDealData.map(d => [d.id, d.dealCode, d.dealName, d.leadName, d.mobile, d.dealAmount, d.dealStatus, d.leadSource, d.lostReason, d.startDate, d.endDate, d.staffName, d.createdBy, d.updatedAt]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = type === 'lead' ? 'lead_summary.csv' : 'deal_summary.csv';
    link.click();
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Lead Conversion Report" description="Track conversion rates from lead to deal" />

      <div className="toolbar-left">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="search-input"
          />
        </div>
        <button className="btn btn-secondary" onClick={() => setShowFilters(!showFilters)}>
          <Filter size={16} />
          Filter
          <ChevronDown size={14} className={showFilters ? 'rotate' : ''} />
        </button>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-row">
            <div className="filter-group">
              <label>Date From</label>
              <input type="date" value={filters.dateFrom} onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })} />
            </div>
            <div className="filter-group">
              <label>Date To</label>
              <input type="date" value={filters.dateTo} onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })} />
            </div>
            <div className="filter-group">
              <label>Agent</label>
              <select value={filters.agent} onChange={(e) => setFilters({ ...filters, agent: Number(e.target.value) })}>
                {agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </div>
            <div className="filter-actions">
              <button className="btn btn-primary" onClick={() => setSubmit(true)}>Submit</button>
            </div>
          </div>
        </div>
      )}

      <div className="report-section">
        <div className="section-header">
          <h3>Lead Summary</h3>
          <button className="btn btn-primary" onClick={() => handleExport('lead')}>
            <Download size={16} />
            Export
          </button>
        </div>
        <div className="table-container">
          <table className="enquiries-table">
            <thead>
              <tr>
                <th>Total Leads</th>
                <th>Total Deals</th>
                <th>Open</th>
                <th>Win</th>
                <th>Lose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{leadSummary.totalLeads}</td>
                <td>{leadSummary.totalDeals}</td>
                <td>{leadSummary.open}</td>
                <td>{leadSummary.win}</td>
                <td>{leadSummary.lose}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="report-section">
        <div className="section-header">
          <h3>Deal Summary</h3>
          <button className="btn btn-primary" onClick={() => handleExport('deal')}>
            <Download size={16} />
            Export
          </button>
        </div>
        <div className="table-container">
          <table className="enquiries-table">
            <thead>
              <tr>
                <th>SL No</th>
                <th>Deal Code</th>
                <th>Deal Name</th>
                <th>Lead Name</th>
                <th>Mobile Number</th>
                <th>Deal Amount</th>
                <th>Deal Status</th>
                <th>Lead Source</th>
                <th>Lost Reason</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Staff Name</th>
                <th>Created By</th>
                <th>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map(row => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.dealCode}</td>
                  <td>{row.dealName}</td>
                  <td>{row.leadName}</td>
                  <td>{row.mobile}</td>
                  <td>${row.dealAmount.toLocaleString()}</td>
                  <td><span className={`badge badge-${row.dealStatus.toLowerCase()}`}>{row.dealStatus}</span></td>
                  <td>{row.leadSource}</td>
                  <td>{row.lostReason}</td>
                  <td>{row.startDate}</td>
                  <td>{row.endDate}</td>
                  <td>{row.staffName}</td>
                  <td>{row.createdBy}</td>
                  <td>{row.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="pagination-container">
        <div className="pagination-left">
          <span className="rows-label">Rows per page:</span>
          <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="rows-select">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
          <span className="pagination-info">
            Showing {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredDealData.length)} of {filteredDealData.length}
          </span>
        </div>
        <div className="pagination-right">
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>First</button>
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
            <ChevronLeft size={16} />
          </button>
          <span className="page-indicator">Page {currentPage} of {totalPages}</span>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
            <ChevronRight size={16} />
          </button>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>Last</button>
        </div>
      </div>
    </div>
  );
};

const DealVisitReport = () => (
  <div className="report-content-wrapper with-sidebar">
  </div>
);

const DealExportReport = () => {
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    dateBy: '',
    filterByDate: '',
    dealStatus: [],
    dealStage: '',
    dealType: '',
    agent: '',
    createdBy: '',
    completedBy: '',
    enquirySource: '',
    sortBy: 'createdDate',
    fileName: ''
  });
  const [selectedFields, setSelectedFields] = useState(['dealCode', 'dealName', 'dealAmount', 'dealStatus']);
  const [showSourceDropdown, setShowSourceDropdown] = useState(false);

  const dealStatusOptions = ['New', 'Create Papers', 'Invoice', 'In Progress', 'Final Stage', 'Deal Win', 'Deal Lost'];
  const dealStageOptions = [{ value: '', label: 'Select' }, { value: 'win', label: 'Win' }, { value: 'lose', label: 'Lose' }, { value: 'inProgress', label: 'In Progress' }];
  const dealTypeOptions = [{ value: '', label: 'Select' }, { value: 'hot', label: 'Hot Deal' }, { value: 'warm', label: 'Warm Deal' }, { value: 'cold', label: 'Cold Deal' }];
  const agentOptions = [{ value: '', label: 'Select' }, { value: 'john', label: 'John Doe' }, { value: 'jane', label: 'Jane Smith' }, { value: 'mike', label: 'Mike Johnson' }];
  const userOptions = [{ value: '', label: 'Select' }, { value: 'john', label: 'John Doe' }, { value: 'jane', label: 'Jane Smith' }, { value: 'mike', label: 'Mike Johnson' }];
  const sortOptions = [{ value: 'createdDate', label: 'Created Date' }, { value: 'updatedDate', label: 'Updated Date' }, { value: 'dealAmountHigh', label: 'Deal Amount (High-Low)' }, { value: 'dealAmountLow', label: 'Deal Amount (Low-High)' }];
  
  const sourceOptions = [
    { value: 'website', label: 'Website' },
    { value: 'referral', label: 'Referral' },
    { value: 'social', label: 'Social Media' },
    { value: 'email', label: 'Email Campaign' },
    { value: 'call', label: 'Incoming Call' },
    { value: 'direct', label: 'Direct' },
  ];

  const fieldOptions = [
    { key: 'dateTime', label: 'Date & Time' },
    { key: 'updatedDateTime', label: 'Updated Date & Time' },
    { key: 'dealCode', label: 'Deal Code' },
    { key: 'dealName', label: 'Deal Name' },
    { key: 'dealAmount', label: 'Deal Amount' },
    { key: 'dealType', label: 'Deal Type' },
    { key: 'dealStatus', label: 'Deal Status' },
    { key: 'dealStage', label: 'Deal Stage' },
    { key: 'leadName', label: 'Lead Name' },
    { key: 'companyName', label: 'Company Name' },
    { key: 'mobileNo', label: 'Mobile No' },
    { key: 'staffName', label: 'Staff Name' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' },
    { key: 'createdBy', label: 'Created By' },
  ];

  const handleStatusToggle = (status) => {
    setFilters(prev => ({
      ...prev,
      dealStatus: prev.dealStatus.includes(status)
        ? prev.dealStatus.filter(s => s !== status)
        : [...prev.dealStatus, status]
    }));
  };

  const handleFieldToggle = (fieldKey) => {
    setSelectedFields(prev =>
      prev.includes(fieldKey)
        ? prev.filter(f => f !== fieldKey)
        : [...prev, fieldKey]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedFields(fieldOptions.map(f => f.key));
    } else {
      setSelectedFields([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Deal Export request submitted successfully");
  };

  return (
    <div className="enquiries-page">
      <form onSubmit={handleSubmit}>
        <div className="export-form-card">
          <div className="form-section">
            <h3 className="section-title">Date Filter</h3>
            <div className="filter-row">
              <div className="filter-group">
                <label>Choose Date Range</label>
                <div className="date-range-input">
                  <input type="date" value={filters.dateRange.start} onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } })} />
                  <span>to</span>
                  <input type="date" value={filters.dateRange.end} onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } })} />
                </div>
              </div>
            </div>
            <div className="filter-row">
              <div className="filter-group">
                <label>Date By</label>
                <select value={filters.dateBy} onChange={(e) => setFilters({ ...filters, dateBy: e.target.value })}>
                  <option value="">Select</option>
                  <option value="created">Created Date</option>
                  <option value="updated">Updated Date</option>
                  <option value="start">Start Date</option>
                  <option value="end">End Date</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Filter By Date</label>
                <select value={filters.filterByDate} onChange={(e) => setFilters({ ...filters, filterByDate: e.target.value })}>
                  <option value="">Select</option>
                  <option value="created">Created Date</option>
                  <option value="updated">Updated Date</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Deal Filters</h3>
            <div className="filter-row">
              <div className="filter-group">
                <label>Deal Status</label>
                <div className="multi-select-dropdown" style={{ position: 'relative' }}>
                  <div className="multi-select-trigger" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-sm)', minHeight: '42px', cursor: 'pointer' }}>
                    {filters.dealStatus.length === 0 ? <span style={{ color: 'var(--text-muted)' }}>Select</span> : 
                      filters.dealStatus.map(s => <span key={s} className="multi-select-tag">{s}</span>)}
                  </div>
                  <div className="multi-select-options" style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-sm)', maxHeight: '200px', overflowY: 'auto', zIndex: 10, display: filters.dealStatus.length > 0 ? 'none' : 'none' }}>
                    {dealStatusOptions.map(status => (
                      <label key={status} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', cursor: 'pointer', hover: { background: 'var(--bg-main)' } }}>
                        <input type="checkbox" checked={filters.dealStatus.includes(status)} onChange={() => handleStatusToggle(status)} />
                        {status}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="filter-group">
                <label>Deal Stage</label>
                <select value={filters.dealStage} onChange={(e) => setFilters({ ...filters, dealStage: e.target.value })}>
                  {dealStageOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <label>Deal Type</label>
                <select value={filters.dealType} onChange={(e) => setFilters({ ...filters, dealType: e.target.value })}>
                  {dealTypeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">User Filters</h3>
            <div className="filter-row">
              <div className="filter-group">
                <label>Agent</label>
                <select value={filters.agent} onChange={(e) => setFilters({ ...filters, agent: e.target.value })}>
                  {agentOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <label>Created By</label>
                <select value={filters.createdBy} onChange={(e) => setFilters({ ...filters, createdBy: e.target.value })}>
                  {userOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
              <div className="filter-group">
                <label>Completed By</label>
                <select value={filters.completedBy} onChange={(e) => setFilters({ ...filters, completedBy: e.target.value })}>
                  {userOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Enquiry Source</h3>
            <div className="filter-row">
              <div className="filter-group">
                <div className="searchable-dropdown" style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    placeholder="Search source..." 
                    value={filters.enquirySource}
                    onChange={(e) => setFilters({ ...filters, enquirySource: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-sm)' }}
                  />
                  {filters.enquirySource && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-sm)', maxHeight: '200px', overflowY: 'auto', zIndex: 10 }}>
                      {sourceOptions.filter(s => s.label.toLowerCase().includes(filters.enquirySource.toLowerCase())).map(opt => (
                        <div key={opt.value} style={{ padding: '0.5rem', cursor: 'pointer' }} onClick={() => setFilters({ ...filters, enquirySource: opt.value })}>
                          {opt.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Sorting</h3>
            <div className="filter-row">
              <div className="filter-group">
                <select value={filters.sortBy} onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}>
                  {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Export File Name</h3>
            <div className="filter-row">
              <div className="filter-group">
                <input 
                  type="text" 
                  placeholder="Enter file name" 
                  value={filters.fileName} 
                  onChange={(e) => setFilters({ ...filters, fileName: e.target.value })}
                  className="file-name-input"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Fields Selection</h3>
            <div className="fields-selection">
              <div className="field-checkbox">
                <label>
                  <input 
                    type="checkbox" 
                    checked={selectedFields.length === fieldOptions.length}
                    onChange={handleSelectAll}
                  />
                  Select All
                </label>
              </div>
              <div className="fields-grid">
                {fieldOptions.map(field => (
                  <div key={field.key} className="field-checkbox">
                    <label>
                      <input 
                        type="checkbox"
                        checked={selectedFields.includes(field.key)}
                        onChange={() => handleFieldToggle(field.key)}
                      />
                      {field.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary submit-btn">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

const DealExportHistoryReport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const exportHistoryData = [
    { id: 1, fileName: 'deal_export_2024-01-25.csv', dateTime: '25 Jan 2024 10:30 AM', status: 'Completed' },
    { id: 2, fileName: 'deal_export_2024-01-24.csv', dateTime: '24 Jan 2024 02:15 PM', status: 'Completed' },
    { id: 3, fileName: 'deal_export_2024-01-23.csv', dateTime: '23 Jan 2024 09:45 AM', status: 'Failed' },
    { id: 4, fileName: 'deal_export_2024-01-22.csv', dateTime: '22 Jan 2024 04:20 PM', status: 'Completed' },
    { id: 5, fileName: 'deal_export_2024-01-21.csv', dateTime: '21 Jan 2024 11:00 AM', status: 'Completed' },
    { id: 6, fileName: 'deal_export_2024-01-20.csv', dateTime: '20 Jan 2024 03:30 PM', status: 'Completed' },
    { id: 7, fileName: 'deal_export_2024-01-19.csv', dateTime: '19 Jan 2024 08:15 AM', status: 'Failed' },
    { id: 8, fileName: 'deal_export_2024-01-18.csv', dateTime: '18 Jan 2024 05:45 PM', status: 'Completed' },
  ];

  const filteredData = useMemo(() => {
    let data = [...exportHistoryData];
    if (searchQuery) {
      data = data.filter(item =>
        item.fileName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return data;
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleDownload = (fileName) => {
    alert(`Downloading ${fileName}...`);
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Deal Export History" description="Track all your past deal data exports" />

      <div className="toolbar-left">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search exports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>File Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(row => (
              <tr key={row.id}>
                <td>{row.dateTime}</td>
                <td>{row.fileName}</td>
                <td><span className={`badge badge-${row.status.toLowerCase()}`}>{row.status}</span></td>
                <td>
                  <button className="action-btn" title="Download" onClick={() => handleDownload(row.fileName)}>
                    <Download size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-left">
          <span className="rows-label">Rows per page:</span>
          <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="rows-select">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
          <span className="pagination-info">
            Showing {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length}
          </span>
        </div>
        <div className="pagination-right">
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>First</button>
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
            <ChevronLeft size={16} />
          </button>
          <span className="page-indicator">Page {currentPage} of {totalPages}</span>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
            <ChevronRight size={16} />
          </button>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>Last</button>
        </div>
      </div>
    </div>
  );
};

const DealDeletedReport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    dateBy: '',
    dealStatus: '',
    dealStage: '',
    dealType: '',
    agent: '',
    createdBy: '',
    completedBy: '',
    enquirySource: '',
    sortBy: 'createdDate'
  });
  const [selectedFields, setSelectedFields] = useState(['dealName', 'leadName', 'mobile', 'amount', 'status']);
  const [exportFileName, setExportFileName] = useState('');

  const dealData = [
    { id: 1, dealName: 'TechCorp Deal', deletedBy: 'John Doe', leadName: 'Rahul Sharma', mobile: '9876543210', amount: 50000, status: 'Lost', type: 'Hot Deal', startDate: '2024-01-15', endDate: '2024-02-15', agent: 'John Doe', createdBy: 'Admin', createdAt: '2024-01-10', deletedAt: '2024-01-20', lostReason: 'Not Interested' },
    { id: 2, dealName: 'Startup Deal', deletedBy: 'Jane Smith', leadName: 'Priya Patel', mobile: '9876543211', amount: 25000, status: 'Lost', type: 'Cold Deal', startDate: '2024-01-14', endDate: '2024-02-14', agent: 'Jane Smith', createdBy: 'Admin', createdAt: '2024-01-09', deletedAt: '2024-01-19', lostReason: 'Price High' },
    { id: 3, dealName: 'Global Deal', deletedBy: 'Mike Johnson', leadName: 'Amit Kumar', mobile: '9876543212', amount: 75000, status: 'Lost', type: 'Warm Deal', startDate: '2024-01-13', endDate: '2024-02-13', agent: 'Mike Johnson', createdBy: 'Admin', createdAt: '2024-01-08', deletedAt: '2024-01-18', lostReason: 'Budget Issues' },
    { id: 4, dealName: 'SmallBiz Deal', deletedBy: 'John Doe', leadName: 'Sneha Reddy', mobile: '9876543213', amount: 15000, status: 'Lost', type: 'Cold Deal', startDate: '2024-01-12', endDate: '2024-02-12', agent: 'John Doe', createdBy: 'Admin', createdAt: '2024-01-07', deletedAt: '2024-01-17', lostReason: 'Not Needed' },
    { id: 5, dealName: 'MegaCorp Deal', deletedBy: 'Jane Smith', leadName: 'Vikram Singh', mobile: '9876543214', amount: 100000, status: 'Lost', type: 'Hot Deal', startDate: '2024-01-11', endDate: '2024-02-11', agent: 'Jane Smith', createdBy: 'Admin', createdAt: '2024-01-06', deletedAt: '2024-01-16', lostReason: 'Competitor' },
    { id: 6, dealName: 'Enterprise Deal', deletedBy: 'Mike Johnson', leadName: 'Ananya Gupta', mobile: '9876543215', amount: 35000, status: 'Lost', type: 'Warm Deal', startDate: '2024-01-10', endDate: '2024-02-10', agent: 'Mike Johnson', createdBy: 'Admin', createdAt: '2024-01-05', deletedAt: '2024-01-15', lostReason: 'Timeline' },
  ];

  const dealStatusOptions = ['New', 'Create Papers', 'Invoice', 'In Progress', 'Final Stage', 'Deal Win', 'Deal Lost'];
  const dealStageOptions = [{ value: '', label: 'Select' }, { value: 'win', label: 'Win' }, { value: 'lose', label: 'Lose' }, { value: 'inProgress', label: 'In Progress' }];
  const dealTypeOptions = [{ value: '', label: 'Select' }, { value: 'hot', label: 'Hot Deal' }, { value: 'warm', label: 'Warm Deal' }, { value: 'cold', label: 'Cold Deal' }];
  const agentOptions = [{ value: '', label: 'Select' }, { value: 'john', label: 'John Doe' }, { value: 'jane', label: 'Jane Smith' }, { value: 'mike', label: 'Mike Johnson' }];
  const userOptions = [{ value: '', label: 'Select' }, { value: 'john', label: 'John Doe' }, { value: 'jane', label: 'Jane Smith' }, { value: 'mike', label: 'Mike Johnson' }];
  const sortOptions = [{ value: 'createdDate', label: 'Created Date' }, { value: 'deletedDate', label: 'Deleted Date' }, { value: 'dealAmountHigh', label: 'Deal Amount (High-Low)' }, { value: 'dealAmountLow', label: 'Deal Amount (Low-High)' }];
  
  const sourceOptions = [
    { value: 'website', label: 'Website' },
    { value: 'referral', label: 'Referral' },
    { value: 'social', label: 'Social Media' },
    { value: 'email', label: 'Email Campaign' },
  ];

  const fieldOptions = [
    { key: 'dealName', label: 'Deal Name' },
    { key: 'deletedBy', label: 'Deleted By' },
    { key: 'leadName', label: 'Lead' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status' },
    { key: 'type', label: 'Type' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' },
    { key: 'agent', label: 'Agent' },
    { key: 'createdBy', label: 'Created By' },
    { key: 'createdAt', label: 'Created At' },
    { key: 'deletedAt', label: 'Deleted At' },
    { key: 'lostReason', label: 'Lost Reason' },
  ];

  const filteredData = useMemo(() => {
    let data = [...dealData];
    if (searchQuery) {
      data = data.filter(item =>
        item.dealName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.mobile.includes(searchQuery)
      );
    }
    return data;
  }, [searchQuery, filters]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(paginatedData.map(item => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleRecover = () => {
    if (selectedRows.length === 0) return;
    if (confirm(`Are you sure you want to recover ${selectedRows.length} selected deal(s)?`)) {
      alert(`Recovered ${selectedRows.length} deals`);
      setSelectedRows([]);
    }
  };

  const handleExport = () => {
    const headers = selectedFields;
    const rows = filteredData.map(d => selectedFields.map(f => d[f] || ''));
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = exportFileName || 'deleted_deals_export.csv';
    link.click();
    setShowExport(false);
  };

  const clearFilters = () => {
    setFilters({
      dateRange: { start: '', end: '' },
      dateBy: '',
      dealStatus: '',
      dealStage: '',
      dealType: '',
      agent: '',
      createdBy: '',
      completedBy: '',
      enquirySource: '',
      sortBy: 'createdDate'
    });
    setShowFilters(false);
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Deleted Deals" description="View and restore previously deleted deals" />

      <div className="toolbar-left">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search deals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <button className="btn btn-secondary" onClick={() => setShowFilters(!showFilters)}>
          <Filter size={16} />
          Filter
        </button>
        <button className="btn btn-secondary" onClick={() => setShowExport(true)}>
          <Download size={16} />
          Export
        </button>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-row">
            <div className="filter-group">
              <label>Date Range</label>
              <div className="date-range-input">
                <input type="date" value={filters.dateRange.start} onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } })} />
                <span>to</span>
                <input type="date" value={filters.dateRange.end} onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } })} />
              </div>
            </div>
            <div className="filter-group">
              <label>Date By</label>
              <select value={filters.dateBy} onChange={(e) => setFilters({ ...filters, dateBy: e.target.value })}>
                <option value="">Select</option>
                <option value="created">Created Date</option>
                <option value="deleted">Deleted Date</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Deal Status</label>
              <select value={filters.dealStatus} onChange={(e) => setFilters({ ...filters, dealStatus: e.target.value })}>
                <option value="">Select</option>
                {dealStatusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label>Deal Stage</label>
              <select value={filters.dealStage} onChange={(e) => setFilters({ ...filters, dealStage: e.target.value })}>
                {dealStageOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
          </div>
          <div className="filter-row">
            <div className="filter-group">
              <label>Deal Type</label>
              <select value={filters.dealType} onChange={(e) => setFilters({ ...filters, dealType: e.target.value })}>
                {dealTypeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label>Agent</label>
              <select value={filters.agent} onChange={(e) => setFilters({ ...filters, agent: e.target.value })}>
                {agentOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label>Created By</label>
              <select value={filters.createdBy} onChange={(e) => setFilters({ ...filters, createdBy: e.target.value })}>
                {userOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label>Completed By</label>
              <select value={filters.completedBy} onChange={(e) => setFilters({ ...filters, completedBy: e.target.value })}>
                {userOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
          </div>
          <div className="filter-row">
            <div className="filter-group">
              <label>Enquiry Source</label>
              <input type="text" placeholder="Search source..." value={filters.enquirySource} onChange={(e) => setFilters({ ...filters, enquirySource: e.target.value })} />
            </div>
            <div className="filter-actions">
              <button className="btn btn-primary" onClick={() => setShowFilters(false)}>Filter</button>
              <button className="btn btn-secondary" onClick={clearFilters}>Clear</button>
            </div>
          </div>
        </div>
      )}

      {selectedRows.length > 0 && (
        <div className="bulk-action-bar" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-sm)', marginBottom: '1rem' }}>
          <span>{selectedRows.length} deal(s) selected</span>
          <button className="btn btn-primary" onClick={handleRecover}>
            <RotateCcw size={16} />
            Recover Selected
          </button>
        </div>
      )}

      <div className="table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" checked={paginatedData.length > 0 && selectedRows.length === paginatedData.length} onChange={handleSelectAll} />
              </th>
              <th>Deal Name</th>
              <th>Deleted By</th>
              <th>Lead</th>
              <th>Mobile</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Agent</th>
              <th>Created By</th>
              <th>Created At</th>
              <th>Deleted At</th>
              <th>Lost Reason</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(row => (
              <tr key={row.id} className={selectedRows.includes(row.id) ? 'selected' : ''}>
                <td>
                  <input type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => handleSelectRow(row.id)} />
                </td>
                <td>{row.dealName}</td>
                <td>{row.deletedBy}</td>
                <td>{row.leadName}</td>
                <td>{row.mobile}</td>
                <td>${row.amount.toLocaleString()}</td>
                <td><span className={`badge badge-${row.status.toLowerCase().replace(' ', '-')}`}>{row.status}</span></td>
                <td>{row.type}</td>
                <td>{row.startDate}</td>
                <td>{row.endDate}</td>
                <td>{row.agent}</td>
                <td>{row.createdBy}</td>
                <td>{row.createdAt}</td>
                <td>{row.deletedAt}</td>
                <td>{row.lostReason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-left">
          <span className="rows-label">Rows per page:</span>
          <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="rows-select">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
          <span className="pagination-info">
            Showing {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length}
          </span>
        </div>
        <div className="pagination-right">
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>First</button>
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
            <ChevronLeft size={16} />
          </button>
          <span className="page-indicator">Page {currentPage} of {totalPages}</span>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
            <ChevronRight size={16} />
          </button>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>Last</button>
        </div>
      </div>

      {showExport && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowExport(false)}>
          <div className="export-form-card" style={{ maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
              <h3 style={{ margin: 0 }}>Export Deleted Deals</h3>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div className="filter-group" style={{ marginBottom: '1rem' }}>
                <label>File Name</label>
                <input type="text" placeholder="Enter file name" value={exportFileName} onChange={(e) => setExportFileName(e.target.value)} style={{ width: '100%' }} />
              </div>
              <div className="fields-selection">
                <div className="field-checkbox">
                  <label>
                    <input type="checkbox" checked={selectedFields.length === fieldOptions.length} onChange={(e) => {
                      if (e.target.checked) setSelectedFields(fieldOptions.map(f => f.key));
                      else setSelectedFields([]);
                    }} />
                    Select All
                  </label>
                </div>
                <div className="fields-grid">
                  {fieldOptions.map(field => (
                    <div key={field.key} className="field-checkbox">
                      <label>
                        <input type="checkbox" checked={selectedFields.includes(field.key)} onChange={() => {
                          setSelectedFields(prev =>
                            prev.includes(field.key)
                              ? prev.filter(f => f !== field.key)
                              : [...prev, field.key]
                          );
                        }} />
                        {field.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="form-actions" style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button className="btn btn-secondary" onClick={() => setShowExport(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleExport}>Export</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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

const TaskWiseReport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ dateFrom: '2024-01-01', dateTo: '2024-01-31', staff: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const staffOptions = [
    { id: 1, name: 'All Staff' },
    { id: 2, name: 'John Doe' },
    { id: 3, name: 'Jane Smith' },
    { id: 4, name: 'Mike Johnson' },
    { id: 5, name: 'Sarah Williams' },
    { id: 6, name: 'David Brown' },
  ];

  const taskData = [
    { id: 1, agentName: 'John Doe', total: 45, completed: 32, pending: 10, overDue: 3 },
    { id: 2, agentName: 'Jane Smith', total: 38, completed: 28, pending: 8, overDue: 2 },
    { id: 3, agentName: 'Mike Johnson', total: 42, completed: 35, pending: 5, overDue: 2 },
    { id: 4, agentName: 'Sarah Williams', total: 35, completed: 25, pending: 8, overDue: 2 },
    { id: 5, agentName: 'David Brown', total: 28, completed: 20, pending: 6, overDue: 2 },
    { id: 6, agentName: 'Emily Davis', total: 32, completed: 24, pending: 6, overDue: 2 },
    { id: 7, agentName: 'Chris Wilson', total: 25, completed: 18, pending: 5, overDue: 2 },
    { id: 8, agentName: 'Amanda Taylor', total: 22, completed: 15, pending: 5, overDue: 2 },
  ];

  const filteredData = useMemo(() => {
    let data = [...taskData];
    if (searchQuery) {
      data = data.filter(item =>
        item.agentName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (filters.staff && filters.staff !== 1) {
      data = data.filter(item => item.agentName === staffOptions.find(s => s.id === Number(filters.staff))?.name);
    }
    return data;
  }, [searchQuery, filters]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleExport = () => {
    const headers = ['Agent Name', 'Total', 'Completed', 'Pending', 'OverDue'];
    const csvContent = [headers.join(','), ...filteredData.map(d => `${d.agentName},${d.total},${d.completed},${d.pending},${d.overDue}`)].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'task_wise_report.csv';
    link.click();
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Task Wise Report" description="Comprehensive breakdown of tasks by category and status" />

      <div className="toolbar-left">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <button className={`btn btn-secondary ${showFilters ? 'active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
          <Filter size={16} />
          Filter
        </button>
        <button className="btn btn-secondary" onClick={handleExport}>
          <Download size={16} />
          Export
        </button>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-row">
            <div className="filter-group">
              <label>Date From</label>
              <input type="date" value={filters.dateFrom} onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })} />
            </div>
            <div className="filter-group">
              <label>Date To</label>
              <input type="date" value={filters.dateTo} onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })} />
            </div>
            <div className="filter-group">
              <label>Staff</label>
              <select value={filters.staff} onChange={(e) => setFilters({ ...filters, staff: e.target.value })}>
                {staffOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
              </select>
            </div>
            <div className="filter-actions">
              <button className="btn btn-primary" onClick={() => setShowFilters(false)}>Filter</button>
              <button className="btn btn-secondary" onClick={() => { setFilters({ dateFrom: '', dateTo: '', staff: '' }); setShowFilters(false); }}>Clear</button>
            </div>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              <th>Agent Name</th>
              <th>Total</th>
              <th>Completed</th>
              <th>Pending</th>
              <th>OverDue</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(row => (
              <tr key={row.id}>
                <td>{row.agentName}</td>
                <td>{row.total}</td>
                <td>{row.completed}</td>
                <td>{row.pending}</td>
                <td>{row.overDue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-left">
          <span className="rows-label">Rows per page:</span>
          <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="rows-select">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
          <span className="pagination-info">
            Showing {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length}
          </span>
        </div>
        <div className="pagination-right">
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>First</button>
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
            <ChevronLeft size={16} />
          </button>
          <span className="page-indicator">Page {currentPage} of {totalPages}</span>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
            <ChevronRight size={16} />
          </button>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>Last</button>
        </div>
      </div>
    </div>
  );
};

const LeadChangeReport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ dateFrom: '2024-01-01', dateTo: '2024-01-31', staff: '', status: '', source: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const staffOptions = [
    { id: 1, name: 'All Staff' },
    { id: 2, name: 'John Doe' },
    { id: 3, name: 'Jane Smith' },
    { id: 4, name: 'Mike Johnson' },
    { id: 5, name: 'Sarah Williams' },
  ];

  const statusOptions = [
    { id: 1, name: 'All Status' },
    { id: 2, name: 'New' },
    { id: 3, name: 'Connected' },
    { id: 4, name: 'Interested' },
    { id: 5, name: 'Not Interested' },
  ];

  const sourceOptions = [
    { id: 1, name: 'All Source' },
    { id: 2, name: 'Website' },
    { id: 3, name: 'Referral' },
    { id: 4, name: 'Social Media' },
    { id: 5, name: 'Email Campaign' },
  ];

  const leadData = [
    { id: 1, slNum: 1, leadName: 'Rahul Sharma', mobile: '9876543210', leadSource: 'Website', leadStatus: 'New', noteAddedBy: 'John Doe', notes: 'Initial contact made' },
    { id: 2, slNum: 2, leadName: 'Priya Patel', mobile: '9876543211', leadSource: 'Referral', leadStatus: 'Connected', noteAddedBy: 'Jane Smith', notes: 'Interested in demo' },
    { id: 3, slNum: 3, leadName: 'Amit Kumar', mobile: '9876543212', leadSource: 'Social Media', leadStatus: 'Not Interested', noteAddedBy: 'Mike Johnson', notes: 'Scheduled follow-up' },
    { id: 4, slNum: 4, leadName: 'Sneha Reddy', mobile: '9876543213', leadSource: 'Website', leadStatus: 'New', noteAddedBy: 'John Doe', notes: 'Awaiting response' },
    { id: 5, slNum: 5, leadName: 'Vikram Singh', mobile: '9876543214', leadSource: 'Email Campaign', leadStatus: 'Connected', noteAddedBy: 'Sarah Williams', notes: 'Sent proposal' },
    { id: 6, slNum: 6, leadName: 'Ananya Gupta', mobile: '9876543215', leadSource: 'Referral', leadStatus: 'Not Interested', noteAddedBy: 'Jane Smith', notes: 'Budget concerns' },
    { id: 7, slNum: 7, leadName: 'Rajesh Verma', mobile: '9876543216', leadSource: 'Social Media', leadStatus: 'New', noteAddedBy: 'Mike Johnson', notes: 'Needs clarification' },
    { id: 8, slNum: 8, leadName: 'Kavitha Nair', mobile: '9876543217', leadSource: 'Website', leadStatus: 'Connected', noteAddedBy: 'John Doe', notes: 'Product demo scheduled' },
  ];

  const filteredData = useMemo(() => {
    let data = [...leadData];
    if (searchQuery) {
      data = data.filter(item =>
        item.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.mobile.includes(searchQuery) ||
        item.notes.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return data;
  }, [searchQuery, filters]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleExport = () => {
    const headers = ['SL Num', 'Lead Name', 'Mobile Number', 'Lead Source', 'Lead Status', 'Note Added By', 'Notes'];
    const csvContent = [headers.join(','), ...filteredData.map(d => `${d.slNum},${d.leadName},${d.mobile},${d.leadSource},${d.leadStatus},${d.noteAddedBy},${d.notes}`)].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'lead_change_report.csv';
    link.click();
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Lead Change Report" description="Track task-related lead changes and updates" />

      <div className="toolbar-left">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <button className={`btn btn-secondary ${showFilters ? 'active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
          <Filter size={16} />
          Filter
        </button>
        <button className="btn btn-secondary" onClick={handleExport}>
          <Download size={16} />
          Export
        </button>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-row">
            <div className="filter-group">
              <label>Date From</label>
              <input type="date" value={filters.dateFrom} onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })} />
            </div>
            <div className="filter-group">
              <label>Date To</label>
              <input type="date" value={filters.dateTo} onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })} />
            </div>
            <div className="filter-group">
              <label>Staff</label>
              <select value={filters.staff} onChange={(e) => setFilters({ ...filters, staff: e.target.value })}>
                {staffOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label>Status</label>
              <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                {statusOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label>Source</label>
              <select value={filters.source} onChange={(e) => setFilters({ ...filters, source: e.target.value })}>
                {sourceOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
              </select>
            </div>
            <div className="filter-actions">
              <button className="btn btn-primary" onClick={() => setShowFilters(false)}>Filter</button>
              <button className="btn btn-secondary" onClick={() => { setFilters({ dateFrom: '', dateTo: '', staff: '', status: '', source: '' }); setShowFilters(false); }}>Clear</button>
            </div>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              <th>SL Num</th>
              <th>Lead Name</th>
              <th>Mobile Number</th>
              <th>Lead Source</th>
              <th>Lead Status</th>
              <th>Note Added By</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(row => (
              <tr key={row.id}>
                <td>{row.slNum}</td>
                <td>{row.leadName}</td>
                <td>{row.mobile}</td>
                <td>{row.leadSource}</td>
                <td><span className={`badge badge-${row.leadStatus.toLowerCase().replace(' ', '-')}`}>{row.leadStatus}</span></td>
                <td>{row.noteAddedBy}</td>
                <td>{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-left">
          <span className="rows-label">Rows per page:</span>
          <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="rows-select">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
          <span className="pagination-info">
            Showing {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length}
          </span>
        </div>
        <div className="pagination-right">
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>First</button>
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
            <ChevronLeft size={16} />
          </button>
          <span className="page-indicator">Page {currentPage} of {totalPages}</span>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
            <ChevronRight size={16} />
          </button>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>Last</button>
        </div>
      </div>
    </div>
  );
};

const TaskWorkReport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ dateFrom: '2024-01-01', dateTo: '2024-01-31', staff: '' });
  const [submit, setSubmit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const staffOptions = [
    { id: 1, name: 'All Staff' },
    { id: 2, name: 'John Doe' },
    { id: 3, name: 'Jane Smith' },
    { id: 4, name: 'Mike Johnson' },
    { id: 5, name: 'Sarah Williams' },
  ];

  const workData = [
    { id: 1, slNo: 1, customerName: 'Rahul Sharma', task: 'Product Demo', contactNumber: '9876543210', assignedTo: 'John Doe', date: '2024-01-15', createdDate: '2024-01-10', completedDate: '2024-01-15', remark: 'Demo completed successfully', status: 'Completed', workStartOn: '10:00 AM', workEndOn: '11:30 AM' },
    { id: 2, slNo: 2, customerName: 'Priya Patel', task: 'Follow-up Call', contactNumber: '9876543211', assignedTo: 'Jane Smith', date: '2024-01-16', createdDate: '2024-01-11', completedDate: '2024-01-16', remark: 'Customer interested', status: 'Completed', workStartOn: '02:00 PM', workEndOn: '02:30 PM' },
    { id: 3, slNo: 3, customerName: 'Amit Kumar', task: 'Site Visit', contactNumber: '9876543212', assignedTo: 'Mike Johnson', date: '2024-01-17', createdDate: '2024-01-12', completedDate: '', remark: 'Visit scheduled', status: 'Pending', workStartOn: '09:00 AM', workEndOn: '' },
    { id: 4, slNo: 4, customerName: 'Sneha Reddy', task: 'Proposal Send', contactNumber: '9876543213', assignedTo: 'John Doe', date: '2024-01-18', createdDate: '2024-01-13', completedDate: '2024-01-18', remark: 'Proposal sent via email', status: 'Completed', workStartOn: '11:00 AM', workEndOn: '11:15 AM' },
    { id: 5, slNo: 5, customerName: 'Vikram Singh', task: 'Client Meeting', contactNumber: '9876543214', assignedTo: 'Sarah Williams', date: '2024-01-19', createdDate: '2024-01-14', completedDate: '', remark: 'Meeting rescheduled', status: 'In Progress', workStartOn: '03:00 PM', workEndOn: '' },
    { id: 6, slNo: 6, customerName: 'Ananya Gupta', task: 'Contract Review', contactNumber: '9876543215', assignedTo: 'Jane Smith', date: '2024-01-20', createdDate: '2024-01-15', completedDate: '2024-01-20', remark: 'Contract signed', status: 'Completed', workStartOn: '10:30 AM', workEndOn: '12:00 PM' },
    { id: 7, slNo: 7, customerName: 'Rajesh Verma', task: 'Product Demo', contactNumber: '9876543216', assignedTo: 'Mike Johnson', date: '2024-01-21', createdDate: '2024-01-16', completedDate: '', remark: 'Awaiting confirmation', status: 'Pending', workStartOn: '02:00 PM', workEndOn: '' },
    { id: 8, slNo: 8, customerName: 'Kavitha Nair', task: 'Follow-up Call', contactNumber: '9876543217', assignedTo: 'John Doe', date: '2024-01-22', createdDate: '2024-01-17', completedDate: '2024-01-22', remark: 'Callback scheduled', status: 'Completed', workStartOn: '04:00 PM', workEndOn: '04:20 PM' },
  ];

  const filteredData = useMemo(() => {
    let data = [...workData];
    if (searchQuery) {
      data = data.filter(item =>
        item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contactNumber.includes(searchQuery) ||
        item.task.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return data;
  }, [searchQuery, filters, submit]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleExport = () => {
    const headers = ['Sl No', 'Customer Name', 'Task', 'Contact Number', 'Assigned To', 'Date', 'Created Date', 'Completed Date', 'Remark', 'Status', 'Work Start On', 'Work End On'];
    const csvContent = [headers.join(','), ...filteredData.map(d => `${d.slNo},${d.customerName},${d.task},${d.contactNumber},${d.assignedTo},${d.date},${d.createdDate},${d.completedDate},${d.remark},${d.status},${d.workStartOn},${d.workEndOn}`)].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'task_work_report.csv';
    link.click();
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Task Work Report" description="Analyze task completion and work distribution" />

      <div className="toolbar-left">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <button className={`btn btn-secondary ${showFilters ? 'active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
          <Filter size={16} />
          Filter
        </button>
        <button className="btn btn-secondary" onClick={handleExport}>
          <Download size={16} />
          Export
        </button>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-row">
            <div className="filter-group">
              <label>Date From</label>
              <input type="date" value={filters.dateFrom} onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })} />
            </div>
            <div className="filter-group">
              <label>Date To</label>
              <input type="date" value={filters.dateTo} onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })} />
            </div>
            <div className="filter-group">
              <label>Staff</label>
              <select value={filters.staff} onChange={(e) => setFilters({ ...filters, staff: e.target.value })}>
                {staffOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
              </select>
            </div>
            <div className="filter-actions">
              <button className="btn btn-primary" onClick={() => setSubmit(true)}>Submit</button>
            </div>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Customer Name</th>
              <th>Task</th>
              <th>Contact Number</th>
              <th>Assigned To</th>
              <th>Date</th>
              <th>Created Date</th>
              <th>Completed Date</th>
              <th>Remark</th>
              <th>Status</th>
              <th>Work Start On</th>
              <th>Work End On</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(row => (
              <tr key={row.id}>
                <td>{row.slNo}</td>
                <td>{row.customerName}</td>
                <td>{row.task}</td>
                <td>{row.contactNumber}</td>
                <td>{row.assignedTo}</td>
                <td>{row.date}</td>
                <td>{row.createdDate}</td>
                <td>{row.completedDate || '-'}</td>
                <td>{row.remark}</td>
                <td><span className={`badge badge-${row.status.toLowerCase().replace(' ', '-')}`}>{row.status}</span></td>
                <td>{row.workStartOn}</td>
                <td>{row.workEndOn || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <div className="pagination-left">
          <span className="rows-label">Rows per page:</span>
          <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="rows-select">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>
          <span className="pagination-info">
            Showing {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length}
          </span>
        </div>
        <div className="pagination-right">
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>First</button>
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
            <ChevronLeft size={16} />
          </button>
          <span className="page-indicator">Page {currentPage} of {totalPages}</span>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
            <ChevronRight size={16} />
          </button>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>Last</button>
        </div>
      </div>
    </div>
  );
};

const IVRCallReport = () => (
  <div className="report-content-wrapper with-sidebar">
    <div className="lead-reports-list">
      {callReportOptions.map((report) => (
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

const GLDialerCallReport = () => {
  const [filters, setFilters] = useState({ dateFrom: '2024-01-01', dateTo: '2024-01-31', agent: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQuery2, setSearchQuery2] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const agentOptions = [
    { id: '', name: 'All Agents' },
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Mike Johnson' },
    { id: 4, name: 'Sarah Williams' },
  ];

  const statsData = [
    { label: 'Total Calls', value: 156, icon: Phone, color: '#3b82f6' },
    { label: 'Incoming Calls', value: 89, icon: PhoneIncoming, color: '#8b5cf6' },
    { label: 'Attended', value: 72, icon: PhoneCall, color: '#10b981' },
    { label: 'Missed', value: 17, icon: PhoneMissed, color: '#ef4444' },
    { label: 'Outbound', value: 67, icon: PhoneOutgoing, color: '#f59e0b' },
    { label: 'Unique Numbers', value: 45, icon: Users, color: '#06b6d4' },
  ];

  const callHistoryData = [
    { id: 1, customer: 'Rahul Sharma', callType: 'Incoming', agentName: 'John Doe', callTime: '10:30 AM', duration: '5:23' },
    { id: 2, customer: 'Priya Patel', callType: 'Outgoing', agentName: 'Jane Smith', callTime: '11:15 AM', duration: '3:45' },
    { id: 3, customer: 'Amit Kumar', callType: 'Incoming', agentName: 'Mike Johnson', callTime: '12:00 PM', duration: '8:12' },
    { id: 4, customer: 'Sneha Reddy', callType: 'Outgoing', agentName: 'John Doe', callTime: '01:30 PM', duration: '2:18' },
    { id: 5, customer: 'Vikram Singh', callType: 'Incoming', agentName: 'Sarah Williams', callTime: '02:45 PM', duration: '6:55' },
    { id: 6, customer: 'Ananya Gupta', callType: 'Missed', agentName: 'Jane Smith', callTime: '03:20 PM', duration: '0:00' },
    { id: 7, customer: 'Rajesh Verma', callType: 'Incoming', agentName: 'Mike Johnson', callTime: '04:10 PM', duration: '4:32' },
    { id: 8, customer: 'Kavitha Nair', callType: 'Outgoing', agentName: 'John Doe', callTime: '05:00 PM', duration: '7:45' },
  ];

  const agentStatsData = [
    { id: 1, agentName: 'John Doe', answeredCalls: 45 },
    { id: 2, agentName: 'Jane Smith', answeredCalls: 38 },
    { id: 3, agentName: 'Mike Johnson', answeredCalls: 32 },
    { id: 4, agentName: 'Sarah Williams', answeredCalls: 28 },
  ];

  const filteredData = useMemo(() => {
    let data = [...callHistoryData];
    if (searchQuery) {
      data = data.filter(item =>
        item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.agentName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return data;
  }, [searchQuery]);

  const filteredData2 = useMemo(() => {
    let data = [...agentStatsData];
    if (searchQuery2) {
      data = data.filter(item =>
        item.agentName.toLowerCase().includes(searchQuery2.toLowerCase())
      );
    }
    return data;
  }, [searchQuery2]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const totalPages2 = Math.ceil(filteredData2.length / rowsPerPage);
  const startIndex2 = (currentPage2 - 1) * rowsPerPage;
  const paginatedData2 = filteredData2.slice(startIndex2, startIndex2 + rowsPerPage);

  const handleExport = () => {
    const headers = ['Customer', 'Call Type', 'Agent Name', 'Call Time', 'Duration'];
    const csvContent = [headers.join(','), ...filteredData.map(d => `${d.customer},${d.callType},${d.agentName},${d.callTime},${d.duration}`)].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'call_history_report.csv';
    link.click();
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="GLDialer Call Report" description="Detailed Call Report" />

      <div className="call-report-filters">
        <div className="filter-group">
          <label>Agent</label>
          <select className="filter-select" value={filters.agent} onChange={(e) => setFilters({ ...filters, agent: e.target.value })}>
            {agentOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label>Date From</label>
          <input type="date" className="filter-input" value={filters.dateFrom} onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })} />
        </div>
        <div className="filter-group">
          <label>Date To</label>
          <input type="date" className="filter-input" value={filters.dateTo} onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })} />
        </div>
        <div className="call-report-filter-right">
          <button className="btn btn-secondary" onClick={handleExport}>
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      <div className="call-stats-grid">
        {statsData.map((stat, index) => (
          <div key={index} className="call-stat-card">
            <div className="call-stat-icon" style={{ background: stat.color + '20' }}>
              <stat.icon size={20} color={stat.color} />
            </div>
            <div className="call-stat-info">
              <span className="call-stat-value">{stat.value}</span>
              <span className="call-stat-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3 className="chart-title">Call Duration</h3>
          <div className="chart-content">
            <div className="bar-chart">
              <div className="bar-item">
                <span className="bar-label">Incoming</span>
                <div className="bar-container">
                  <div className="bar" style={{ width: '65%', background: '#3b82f6' }}></div>
                </div>
                <span className="bar-value">89</span>
              </div>
              <div className="bar-item">
                <span className="bar-label">Outgoing</span>
                <div className="bar-container">
                  <div className="bar" style={{ width: '49%', background: '#f59e0b' }}></div>
                </div>
                <span className="bar-value">67</span>
              </div>
            </div>
            <div className="chart-legend">
              <span className="legend-item"><span className="legend-dot" style={{ background: '#3b82f6' }}></span> Incoming</span>
              <span className="legend-item"><span className="legend-dot" style={{ background: '#f59e0b' }}></span> Outgoing</span>
            </div>
          </div>
        </div>
        <div className="chart-card">
          <h3 className="chart-title">Call Status</h3>
          <div className="chart-content">
            <div className="donut-chart-wrapper">
              <div className="donut-chart">
                <div className="donut-center">
                  <span className="donut-value">156</span>
                  <span className="donut-label">Total</span>
                </div>
              </div>
            </div>
            <div className="donut-legend">
              <span className="legend-item"><span className="legend-dot" style={{ background: '#10b981' }}></span> Attended (72)</span>
              <span className="legend-item"><span className="legend-dot" style={{ background: '#ef4444' }}></span> Missed (17)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="call-history-section">
        <h3 className="section-heading">Recent Call History</h3>
        
        <div className="call-history-grid">
          <div className="call-history-main">
            <div className="table-header-row">
              <div className="search-box" style={{ maxWidth: '250px' }}>
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
            <div className="table-container">
              <table className="enquiries-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Call Type</th>
                    <th>Agent Name</th>
                    <th>Call Time</th>
                    <th>Call Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.length > 0 ? paginatedData.map(row => (
                    <tr key={row.id}>
                      <td>{row.customer}</td>
                      <td><span className={`badge badge-${row.callType.toLowerCase().replace(' ', '-')}`}>{row.callType}</span></td>
                      <td>{row.agentName}</td>
                      <td>{row.callTime}</td>
                      <td>{row.duration}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No data available in table</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="pagination-container">
              <div className="pagination-left">
                <span className="pagination-info">
                  Showing {filteredData.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length}
                </span>
              </div>
              <div className="pagination-right">
                <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>First</button>
                <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
                <span className="page-indicator">Page {currentPage} of {totalPages}</span>
                <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
                <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>Last</button>
              </div>
            </div>
          </div>

          <div className="call-history-side">
            <div className="table-header-row">
              <div className="search-box" style={{ maxWidth: '250px' }}>
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery2}
                  onChange={(e) => setSearchQuery2(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
            <div className="table-container">
              <table className="enquiries-table">
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>Answered Calls</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData2.length > 0 ? paginatedData2.map(row => (
                    <tr key={row.id}>
                      <td>{row.agentName}</td>
                      <td>{row.answeredCalls}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="2" style={{ textAlign: 'center', padding: '2rem' }}>No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="pagination-container">
              <div className="pagination-left">
                <span className="pagination-info">
                  Showing {filteredData2.length > 0 ? startIndex2 + 1 : 0} to {Math.min(startIndex2 + rowsPerPage, filteredData2.length)} of {filteredData2.length}
                </span>
              </div>
              <div className="pagination-right">
                <button className="pagination-btn" disabled={currentPage2 === 1} onClick={() => setCurrentPage2(1)}>First</button>
                <button className="pagination-btn" disabled={currentPage2 === 1} onClick={() => setCurrentPage2(prev => prev - 1)}>Previous</button>
                <span className="page-indicator">Page {currentPage2} of {totalPages2}</span>
                <button className="pagination-btn" disabled={currentPage2 === totalPages2} onClick={() => setCurrentPage2(prev => prev + 1)}>Next</button>
                <button className="pagination-btn" disabled={currentPage2 === totalPages2} onClick={() => setCurrentPage2(totalPages2)}>Last</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CallFeedbackReport = () => {
  const [filters, setFilters] = useState({ dateFrom: '2024-01-01', dateTo: '2024-01-31', agent: '', status: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);

  const agentOptions = [
    { id: '', name: 'All Agents' },
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Mike Johnson' },
    { id: 4, name: 'Sarah Williams' },
  ];

  const statusOptions = [
    { id: '', name: 'All Status' },
    { id: 'connected', name: 'Connected' },
    { id: 'not_connected', name: 'Not Connected' },
    { id: 'action_pending', name: 'Action Pending' },
  ];

  const statusSummaryData = [
    { status: 'Connected', count: 45 },
    { status: 'Not Connected', count: 23 },
    { status: 'Action Pending', count: 18 },
    { status: 'Total', count: 86 },
  ];

  const leadStatusData = [
    { status: 'New Lead', count: 32 },
    { status: 'Interested', count: 18 },
    { status: 'Not Interested', count: 12 },
    { status: 'Follow Up', count: 10 },
    { status: 'No Response', count: 8 },
    { status: 'Converted', count: 4 },
    { status: 'Lost', count: 2 },
  ];

  const leadStatusColors = ['#3b82f6', '#10b981', '#ef4444', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899'];

  const callData = [
    { id: 1, leadName: 'Rahul Sharma', number: '+91 98765 43210', agent: 'John Doe', remark: 'Interested in product', callStatus: 'Connected', callTime: '10:30 AM' },
    { id: 2, leadName: 'Priya Patel', number: '+91 98765 43211', agent: 'Jane Smith', remark: 'Callback later', callStatus: 'Action Pending', callTime: '11:15 AM' },
    { id: 3, leadName: 'Amit Kumar', number: '+91 98765 43212', agent: 'Mike Johnson', remark: 'Not interested', callStatus: 'Not Connected', callTime: '12:00 PM' },
    { id: 4, leadName: 'Sneha Reddy', number: '+91 98765 43213', agent: 'John Doe', remark: 'Needs more info', callStatus: 'Connected', callTime: '01:30 PM' },
    { id: 5, leadName: 'Vikram Singh', number: '+91 98765 43214', agent: 'Sarah Williams', remark: 'Demo scheduled', callStatus: 'Connected', callTime: '02:45 PM' },
    { id: 6, leadName: 'Ananya Gupta', number: '+91 98765 43215', agent: 'Jane Smith', remark: 'Busy, call tomorrow', callStatus: 'Action Pending', callTime: '03:20 PM' },
    { id: 7, leadName: 'Rajesh Verma', number: '+91 98765 43216', agent: 'Mike Johnson', remark: 'Wrong number', callStatus: 'Not Connected', callTime: '04:10 PM' },
    { id: 8, leadName: 'Kavitha Nair', number: '+91 98765 43217', agent: 'John Doe', remark: 'Very interested', callStatus: 'Connected', callTime: '05:00 PM' },
    { id: 9, leadName: 'Deepak Patel', number: '+91 98765 43218', agent: 'Sarah Williams', remark: 'Consider later', callStatus: 'Action Pending', callTime: '05:45 PM' },
    { id: 10, leadName: 'Meera Shah', number: '+91 98765 43219', agent: 'Jane Smith', remark: 'No answer', callStatus: 'Not Connected', callTime: '06:15 PM' },
  ];

  const filteredData = useMemo(() => {
    let data = [...callData];
    if (searchQuery) {
      data = data.filter(item =>
        item.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.agent.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return data;
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const totalLeadCount = leadStatusData.reduce((sum, item) => sum + item.count, 0);

  const handleExport = () => {
    const headers = ['Lead Name', 'Number', 'Agent', 'Remark', 'Call Status', 'Call Time'];
    const csvContent = [headers.join(','), ...filteredData.map(d => `${d.leadName},${d.number},${d.agent},${d.remark},${d.callStatus},${d.callTime}`)].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'call_feedback_report.csv';
    link.click();
  };

  let gradientStops = [];
  let currentAngle = 0;
  leadStatusData.forEach((item, index) => {
    const angle = (item.count / totalLeadCount) * 360;
    gradientStops.push(`${leadStatusColors[index]} ${currentAngle}deg ${currentAngle + angle}deg`);
    currentAngle += angle;
  });

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Call Feedback Report" description="Detailed Call Feedback" />

      <div className="call-report-filters">
        <div className="filter-group">
          <label>Date From</label>
          <input type="date" className="filter-input" value={filters.dateFrom} onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })} />
        </div>
        <div className="filter-group">
          <label>Date To</label>
          <input type="date" className="filter-input" value={filters.dateTo} onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })} />
        </div>
        <div className="filter-group">
          <label>Agent</label>
          <select className="filter-select" value={filters.agent} onChange={(e) => setFilters({ ...filters, agent: e.target.value })}>
            {agentOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
          </select>
        </div>
        <div className="filter-group">
          <label>Status</label>
          <select className="filter-select" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
            {statusOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
          </select>
        </div>
        <div className="call-report-filter-right">
          <button className="btn btn-primary">Submit</button>
        </div>
      </div>

      <div className="feedback-layout">
        <div className="feedback-left">
          <div className="feedback-card">
            <h3 className="feedback-card-title">Status Summary</h3>
            <div className="status-summary-table-container">
              <table className="status-summary-table">
                <tbody>
                  <tr>
                    <td>Connected</td>
                    <td className="status-summary-count">45</td>
                  </tr>
                  <tr>
                    <td>Not Connected</td>
                    <td className="status-summary-count">23</td>
                  </tr>
                  <tr>
                    <td>Action Pending</td>
                    <td className="status-summary-count">18</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td className="status-summary-count">86</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="feedback-stats-row">
            <div className="feedback-stat-card">
              <span className="feedback-stat-value">18</span>
              <span className="feedback-stat-label">Pending</span>
            </div>
            <div className="feedback-stat-card pending">
              <span className="feedback-stat-value">5</span>
              <span className="feedback-stat-label">Overdue</span>
            </div>
          </div>

          <div className="feedback-card">
            <h3 className="feedback-card-title">Lead Status</h3>
            <div className="lead-status-table-container">
              <table className="status-summary-table">
                <tbody>
                  {leadStatusData.map((row, index) => (
                    <tr key={index}>
                      <td><span className="status-dot" style={{ background: leadStatusColors[index] }}></span>{row.status}</td>
                      <td className="status-summary-count">{row.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="feedback-card">
            <h3 className="feedback-card-title">Lead Status Donut</h3>
            <div className="feedback-chart-container">
              <div className="donut-chart-lg">
                <div className="donut-chart" style={{ background: `conic-gradient(${gradientStops.join(', ')})` }}>
                  <div className="donut-center">
                    <span className="donut-value">{totalLeadCount}</span>
                    <span className="donut-label">Total</span>
                  </div>
                </div>
              </div>
              <div className="donut-legend">
                {leadStatusData.map((item, index) => (
                  <span key={index} className="legend-item">
                    <span className="legend-row">
                      <span className="legend-dot" style={{ background: leadStatusColors[index] }}></span>
                      {item.status}
                    </span>
                    <span className="legend-count">{item.count}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="feedback-right">
          <div className="feedback-table-header">
            <div className="feedback-table-controls">
              <div className="filter-group">
                <label>Show</label>
                <select className="filter-select" value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <label>entries</label>
              </div>
              <div className="search-box">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="search-input"
                />
              </div>
            </div>
            <button className="btn btn-secondary" onClick={handleExport}>
              <Download size={16} />
              Export
            </button>
          </div>
          <div className="table-container">
            <table className="enquiries-table">
              <thead>
                <tr>
                  <th>Lead Name</th>
                  <th>Number</th>
                  <th>Agent</th>
                  <th>Remark</th>
                  <th>Call Status</th>
                  <th>Call Time</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? paginatedData.map(row => (
                  <tr key={row.id}>
                    <td>{row.leadName}</td>
                    <td>{row.number}</td>
                    <td>{row.agent}</td>
                    <td>{row.remark}</td>
                    <td><span className={`badge badge-${row.callStatus.toLowerCase().replace(' ', '-').replace('action-pending', 'action-pending')}`}>{row.callStatus}</span></td>
                    <td>{row.callTime}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="pagination-container">
            <div className="pagination-left">
              <span className="pagination-info">
                Showing {filteredData.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length}
              </span>
            </div>
            <div className="pagination-right">
              <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>First</button>
              <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
              <span className="page-indicator">Page {currentPage} of {totalPages}</span>
              <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
              <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>Last</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckinReport = () => {
  const [filters, setFilters] = useState({ dateFrom: '2026-04-01', dateTo: '2026-04-25', staff: '' });
  const [submitted, setSubmitted] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const agents = [
    { id: '', name: 'All Agents' },
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Mike Johnson' },
  ];

  const checkinData = [
    { id: 1, shop: 'Sector 18', agent: 'John Doe', note: 'Morning Checkin', typeIn: 'Check In', dateIn: '2026-04-25 09:30', locationIn: 'Delhi', typeOut: 'Check Out', dateOut: '2026-04-25 18:00', locationOut: 'Delhi' },
    { id: 2, shop: 'Nehru Place', agent: 'Jane Smith', note: 'Client Visit', typeIn: 'Check In', dateIn: '2026-04-25 10:00', locationIn: 'Noida', typeOut: 'Check Out', dateOut: '2026-04-25 17:30', locationOut: 'Noida' },
    { id: 3, shop: 'Cyber Hub', agent: 'Mike Johnson', note: 'Meeting', typeIn: 'Check In', dateIn: '2026-04-25 08:45', locationIn: 'Gurgaon', typeOut: 'Check Out', dateOut: '2026-04-25 19:00', locationOut: 'Gurgaon' },
    { id: 4, shop: 'Connaught Place', agent: 'John Doe', note: 'Office Work', typeIn: 'Check In', dateIn: '2026-04-24 09:00', locationIn: 'Delhi', typeOut: 'Check Out', dateOut: '2026-04-24 18:30', locationOut: 'Delhi' },
    { id: 5, shop: 'MG Road', agent: 'Jane Smith', note: 'Field Visit', typeIn: 'Check In', dateIn: '2026-04-24 10:30', locationIn: 'Gurgaon', typeOut: 'Check Out', dateOut: '2026-04-24 16:00', locationOut: 'Gurgaon' },
  ];

  const filteredData = useMemo(() => {
    let data = [...checkinData];
    if (search) {
      data = data.filter(item =>
        item.shop.toLowerCase().includes(search.toLowerCase()) ||
        item.agent.toLowerCase().includes(search.toLowerCase()) ||
        item.note.toLowerCase().includes(search.toLowerCase())
      );
    }
    return data;
  }, [search]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleExport = () => {
    const headers = ['Shop', 'Agent', 'Note', 'Type', 'Date', 'Location', 'Type', 'Date', 'Location'];
    const csvContent = [headers.join(','), ...filteredData.map(d => `${d.shop},${d.agent},${d.note},${d.typeIn},${d.dateIn},${d.locationIn},${d.typeOut},${d.dateOut},${d.locationOut}`)].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'checkin_report.csv';
    link.click();
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <div className="call-report-filters">
        <div className="filter-group">
          <label>Date From</label>
          <input type="date" className="filter-input" value={filters.dateFrom} onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })} />
        </div>
        <div className="filter-group">
          <label>Date To</label>
          <input type="date" className="filter-input" value={filters.dateTo} onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })} />
        </div>
        <div className="filter-group">
          <label>Staff</label>
          <select className="filter-select" value={filters.staff} onChange={(e) => setFilters({ ...filters, staff: e.target.value })}>
            {agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </div>
        <div className="call-report-filter-right">
          <button className="btn btn-primary" onClick={() => { setSubmitted(true); setCurrentPage(1); }}>Submit</button>
        </div>
      </div>

      {!submitted && (
        <div className="empty-state" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>Select filters and click Submit to view report</p>
        </div>
      )}

      {submitted && (
        <div className="checkin-table-section">
          <div className="feedback-table-header">
            <div className="feedback-table-controls">
              <div className="filter-group">
                <label>Show</label>
                <select className="filter-select" value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <label>entries</label>
              </div>
              <div className="search-box">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  className="search-input"
                />
              </div>
            </div>
            <button className="btn btn-secondary" onClick={handleExport}>
              <Download size={16} />
              Export
            </button>
          </div>
          <div className="table-container">
            <table className="enquiries-table">
              <thead>
                <tr>
                  <th>Shop</th>
                  <th>Agent</th>
                  <th>Note</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? paginatedData.map(row => (
                  <tr key={row.id}>
                    <td>{row.shop}</td>
                    <td>{row.agent}</td>
                    <td>{row.note}</td>
                    <td><span className="badge badge-incoming">{row.typeIn}</span></td>
                    <td>{row.dateIn}</td>
                    <td>{row.locationIn}</td>
                    <td><span className="badge badge-outgoing">{row.typeOut}</span></td>
                    <td>{row.dateOut}</td>
                    <td>{row.locationOut}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'center', padding: '2rem' }}>No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="pagination-container">
            <div className="pagination-left">
              <span className="pagination-info">
                Showing {filteredData.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length}
              </span>
            </div>
            <div className="pagination-right">
              <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>First</button>
              <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
              <span className="page-indicator">Page {currentPage} of {totalPages}</span>
              <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
              <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>Last</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AttendanceReport = () => {
  const [filters, setFilters] = useState({ dateFrom: '2026-04-01', dateTo: '2026-04-25', staff: '' });
  const [search, setSearch] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const navigate = useNavigate();

  const staffList = [
    { id: '', name: 'All Staff' },
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Mike Johnson' },
  ];

  const attendanceData = [
    { id: 1, agent: 'John Doe', phone: '917025769000', workingDays: 22, leave: 2, duration: '176h 30m' },
    { id: 2, agent: 'Jane Smith', phone: '917025769001', workingDays: 21, leave: 3, duration: '168h 45m' },
    { id: 3, agent: 'Mike Johnson', phone: '917025769002', workingDays: 20, leave: 1, duration: '160h 00m' },
    { id: 4, agent: 'Sarah Williams', phone: '917025769003', workingDays: 23, leave: 1, duration: '184h 15m' },
    { id: 5, agent: 'David Brown', phone: '917025769004', workingDays: 19, leave: 4, duration: '152h 30m' },
  ];

  const filteredData = useMemo(() => {
    let data = [...attendanceData];
    if (search) {
      data = data.filter(item => item.agent.toLowerCase().includes(search.toLowerCase()));
    }
    return data;
  }, [search]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleExport = () => {
    const headers = ['Agent', 'Total Working Days', 'Leave', 'Duration'];
    const csvContent = [headers.join(','), ...filteredData.map(d => `${d.agent},${d.workingDays},${d.leave},${d.duration}`)].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'attendance_report.csv';
    link.click();
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <div className="call-report-filters">
        <div className="filter-group">
          <label>Date From</label>
          <input type="date" className="filter-input" value={filters.dateFrom} onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })} />
        </div>
        <div className="filter-group">
          <label>Date To</label>
          <input type="date" className="filter-input" value={filters.dateTo} onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })} />
        </div>
        <div className="filter-group">
          <label>Staff</label>
          <select className="filter-select" value={filters.staff} onChange={(e) => setFilters({ ...filters, staff: e.target.value })}>
            {staffList.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div className="call-report-filter-right">
          <button className="btn btn-primary" onClick={() => { setSubmitted(true); setCurrentPage(1); }}>Submit</button>
        </div>
      </div>

      {!submitted && (
        <div className="empty-state" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>Select filters and click Submit to view report</p>
        </div>
      )}

      {submitted && (
        <div className="checkin-table-section">
          <div className="feedback-table-header">
            <div className="feedback-table-controls">
              <div className="filter-group">
                <label>Show</label>
                <select className="filter-select" value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <label>entries</label>
              </div>
              <div className="search-box">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  className="search-input"
                />
              </div>
            </div>
            <button className="btn btn-secondary" onClick={handleExport}>
              <Download size={16} />
              Export
            </button>
          </div>
          <div className="table-container">
            <table className="enquiries-table">
              <thead>
                <tr>
                  <th>Sl No</th>
                  <th>Agent</th>
                  <th>Total Working Days</th>
                  <th>Leave</th>
                  <th>Duration</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? paginatedData.map((row, index) => (
                  <tr key={row.id}>
                    <td>{startIndex + index + 1}</td>
                    <td>{row.agent}</td>
                    <td>{row.workingDays}</td>
                    <td>{row.leave}</td>
                    <td>{row.duration}</td>
                    <td><button className="btn-text" onClick={() => navigate(`/reports/attendance/profile/${row.phone}?date=${filters.dateFrom}`)}>View</button></td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="pagination-container">
            <div className="pagination-left">
              <span className="pagination-info">
                Showing {filteredData.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length}
              </span>
            </div>
            <div className="pagination-right">
              <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>First</button>
              <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
              <span className="page-indicator">Page {currentPage} of {totalPages}</span>
              <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
              <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>Last</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AttendanceProfile = () => {
  const { staffId } = useParams();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const dateParam = searchParams.get('date') || '2026-04-24';

  const staffData = {
    1: { name: 'John Doe', phone: '917025769000', officeTime: '8h 30m', wfhTime: '1h 00m', totalTime: '9h 30m', activity: 92 },
    2: { name: 'Jane Smith', phone: '917025769001', officeTime: '7h 45m', wfhTime: '2h 00m', totalTime: '9h 45m', activity: 88 },
    3: { name: 'Mike Johnson', phone: '917025769002', officeTime: '9h 00m', wfhTime: '0h 30m', totalTime: '9h 30m', activity: 95 },
  };

  const staff = staffData[staffId] || staffData[1];

  const logsData = [
    { id: 1, time: '09:30 AM', type: 'Check In', location: 'Sector 18, Delhi', duration: '-' },
    { id: 2, time: '10:15 AM', type: 'Break Start', location: 'Cafeteria', duration: '15m' },
    { id: 3, time: '10:30 AM', type: 'Break End', location: 'Cafeteria', duration: '-' },
    { id: 4, time: '01:00 PM', type: 'Lunch Start', location: 'Cafeteria', duration: '1h' },
    { id: 5, time: '02:00 PM', type: 'Lunch End', location: 'Cafeteria', duration: '-' },
    { id: 6, time: '05:30 PM', type: 'Check Out', location: 'Sector 18, Delhi', duration: '-' },
  ];

  return (
    <div className="report-content-wrapper with-sidebar">
      <div className="profile-header">
        <button className="btn btn-secondary" onClick={() => navigate('/reports/attendance')}>
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      <div className="profile-staff-info">
        <div className="profile-staff-details">
          <h2>{staff.name}</h2>
          <p className="profile-staff-phone">{staff.phone}</p>
          <p className="profile-staff-date">{dateParam}</p>
        </div>
      </div>

      <div className="profile-stats-grid">
        <div className="profile-stat-card">
          <Clock size={24} className="profile-stat-icon" />
          <div className="profile-stat-info">
            <span className="profile-stat-value">{staff.officeTime}</span>
            <span className="profile-stat-label">Office Time</span>
          </div>
        </div>
        <div className="profile-stat-card">
          <Home size={24} className="profile-stat-icon" />
          <div className="profile-stat-info">
            <span className="profile-stat-value">{staff.wfhTime}</span>
            <span className="profile-stat-label">Work From Home</span>
          </div>
        </div>
        <div className="profile-stat-card">
          <Timer size={24} className="profile-stat-icon" />
          <div className="profile-stat-info">
            <span className="profile-stat-value">{staff.totalTime}</span>
            <span className="profile-stat-label">Total Duration</span>
          </div>
        </div>
        <div className="profile-stat-card">
          <Activity size={24} className="profile-stat-icon" />
          <div className="profile-stat-info">
            <span className="profile-stat-value">{staff.activity}%</span>
            <span className="profile-stat-label">Activity</span>
          </div>
        </div>
      </div>

      <div className="profile-section">
        <h3 className="profile-section-title">Activity Logs</h3>
        <div className="table-container">
          <table className="enquiries-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Activity</th>
                <th>Location</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {logsData.map(log => (
                <tr key={log.id}>
                  <td>{log.time}</td>
                  <td><span className={`badge badge-${log.type.toLowerCase().replace(' ', '-')}`}>{log.type}</span></td>
                  <td>{log.location}</td>
                  <td>{log.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;