import React, { useState } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { dailyActivitySampleData } from '../constants';
import { ACTION_FILTER, ACTION_CLEAR } from '../../../shared/constants/actionLabels';
import { triggerBlobDownload } from '../../../shared/utils/blobDownload.util';

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

const LeadDailyActivityReport = () => {
  const [filters, setFilters] = useState({ dateFrom: '2026-04-01', dateTo: '2026-04-25', agent: 1, logType: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleExport = () => {
    const csvContent = "Agent Name,Total,Attendance,Visitor,Lead Add,Task Add,Call Task Feedback,Deals Add,Task Edit,Lead Update,Note Added,Call Log Added,Status Updated,Purpose Updated,Voice Note Added,File Note Added\n" +
      dailyActivitySampleData.map(row => `${row.agentName},${row.total},${row.attendance},${row.visitor},${row.leadAdd},${row.taskAdd},${row.callTaskFeedback},${row.dealsAdd},${row.taskEdit},${row.leadUpdate},${row.noteAdd},${row.callLogAdd},${row.statusUpdated},${row.purposeUpdated},${row.voiceNoteAdd},${row.fileNoteAdd}`).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    triggerBlobDownload(blob, 'daily_activity_report.csv');
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
                <button className="btn btn-primary" onClick={() => { setSubmitted(true); setShowFilters(false); }}>{ACTION_FILTER}</button>
                <button className="btn btn-secondary" onClick={() => { setFilters({ dateFrom: '', dateTo: '', agent: 1, logType: '' }); setSubmitted(false); }}>{ACTION_CLEAR}</button>
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
              {dailyActivitySampleData.map(row => (
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

export default LeadDailyActivityReport;
