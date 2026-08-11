import React, { useState, useMemo } from 'react';
import { Search, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { callFeedbackData } from '../constants';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../shared/constants/pagination';
import { triggerBlobDownload } from '../../../shared/utils/blobDownload.util';

const CallFeedbackReport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);

  const leadStatusData = [
    { status: 'New Lead', count: 32 }, { status: 'Interested', count: 18 },
    { status: 'Not Interested', count: 12 }, { status: 'Follow Up', count: 10 },
    { status: 'No Response', count: 8 }, { status: 'Converted', count: 4 },
    { status: 'Lost', count: 2 },
  ];

  const leadStatusColors = ['#3b82f6', '#10b981', '#ef4444', '#f59e0b', '#8b5cf6', '#06b6d4', '#ec4899'];

  const filteredData = useMemo(() => {
    let data = [...callFeedbackData];
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

  let gradientStops: string[] = [];
  let currentAngle = 0;
  leadStatusData.forEach((item, index) => {
    const angle = (item.count / totalLeadCount) * 360;
    gradientStops.push(`${leadStatusColors[index]} ${currentAngle}deg ${currentAngle + angle}deg`);
    currentAngle += angle;
  });

  const handleExport = () => {
    const headers = ['Lead Name', 'Number', 'Agent', 'Remark', 'Call Status', 'Call Time'];
    const csvContent = [headers.join(','), ...filteredData.map(d => `${d.leadName},${d.number},${d.agent},${d.remark},${d.callStatus},${d.callTime}`)].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    triggerBlobDownload(blob, 'call_feedback_report.csv');
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Call Feedback Report" description="Detailed Call Feedback" />

      <div className="feedback-layout">
        <div className="feedback-left">
          <div className="feedback-card">
            <h3 className="feedback-card-title">Status Summary</h3>
            <div className="status-summary-table-container">
              <table className="status-summary-table">
                <tbody>
                  <tr><td>Connected</td><td className="status-summary-count">45</td></tr>
                  <tr><td>Not Connected</td><td className="status-summary-count">23</td></tr>
                  <tr><td>Action Pending</td><td className="status-summary-count">18</td></tr>
                  <tr><td>Total</td><td className="status-summary-count">86</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="feedback-stats-row">
            <div className="feedback-stat-card"><span className="feedback-stat-value">18</span><span className="feedback-stat-label">Pending</span></div>
            <div className="feedback-stat-card pending"><span className="feedback-stat-value">5</span><span className="feedback-stat-label">Overdue</span></div>
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
                    <span className="legend-row"><span className="legend-dot" style={{ background: leadStatusColors[index] }}></span>{item.status}</span>
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
                  {ROWS_OPTIONS_10_25_50_100.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <label>entries</label>
              </div>
              <div className="search-box">
                <Search size={16} className="search-icon" />
                <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} className="search-input" />
              </div>
            </div>
            <button className="btn btn-secondary" onClick={handleExport}><Download size={16} /> Export</button>
          </div>
          <div className="table-container">
            <table className="enquiries-table">
              <thead><tr><th>Lead Name</th><th>Number</th><th>Agent</th><th>Remark</th><th>Call Status</th><th>Call Time</th></tr></thead>
              <tbody>
                {paginatedData.length > 0 ? paginatedData.map(row => (
                  <tr key={row.id}>
                    <td>{row.leadName}</td><td>{row.number}</td><td>{row.agent}</td><td>{row.remark}</td>
                    <td><span className={`badge badge-${row.callStatus.toLowerCase().replace(' ', '-')}`}>{row.callStatus}</span></td>
                    <td>{row.callTime}</td>
                  </tr>
                )) : (
                  <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>No data available</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="pagination-container">
            <div className="pagination-left">
              <span className="pagination-info">Showing {filteredData.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length}</span>
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

export default CallFeedbackReport;
