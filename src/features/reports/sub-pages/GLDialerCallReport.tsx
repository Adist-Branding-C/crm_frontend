import React, { useState, useMemo } from 'react';
import { Search, Download, Phone, PhoneIncoming, PhoneOutgoing, PhoneMissed, PhoneCall, Users } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { callHistoryData, agentStatsData } from '../constants';

const GLDialerCallReport = () => {
  const [filters, setFilters] = useState({ dateFrom: '2024-01-01', dateTo: '2024-01-31', agent: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQuery2, setSearchQuery2] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const statsData = [
    { label: 'Total Calls', value: 156, icon: Phone, color: '#3b82f6' },
    { label: 'Incoming Calls', value: 89, icon: PhoneIncoming, color: '#8b5cf6' },
    { label: 'Attended', value: 72, icon: PhoneCall, color: '#10b981' },
    { label: 'Missed', value: 17, icon: PhoneMissed, color: '#ef4444' },
    { label: 'Outbound', value: 67, icon: PhoneOutgoing, color: '#f59e0b' },
    { label: 'Unique Numbers', value: 45, icon: Users, color: '#06b6d4' },
  ];

  const filteredData = useMemo(() => {
    let data = [...callHistoryData];
    if (searchQuery) data = data.filter(item => item.customer.toLowerCase().includes(searchQuery.toLowerCase()) || item.agentName.toLowerCase().includes(searchQuery.toLowerCase()));
    return data;
  }, [searchQuery]);

  const filteredData2 = useMemo(() => {
    let data = [...agentStatsData];
    if (searchQuery2) data = data.filter(item => item.agentName.toLowerCase().includes(searchQuery2.toLowerCase()));
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
            <option value="">All Agents</option><option value="1">John Doe</option><option value="2">Jane Smith</option>
            <option value="3">Mike Johnson</option><option value="4">Sarah Williams</option>
          </select>
        </div>
        <div className="filter-group"><label>Date From</label><input type="date" className="filter-input" value={filters.dateFrom} onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })} /></div>
        <div className="filter-group"><label>Date To</label><input type="date" className="filter-input" value={filters.dateTo} onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })} /></div>
        <div className="call-report-filter-right"><button className="btn btn-secondary" onClick={handleExport}><Download size={16} /> Export</button></div>
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
                <div className="bar-container"><div className="bar" style={{ width: '65%', background: '#3b82f6' }}></div></div>
                <span className="bar-value">89</span>
              </div>
              <div className="bar-item">
                <span className="bar-label">Outgoing</span>
                <div className="bar-container"><div className="bar" style={{ width: '49%', background: '#f59e0b' }}></div></div>
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
                <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
              </div>
            </div>
            <div className="table-container">
              <table className="enquiries-table">
                <thead><tr><th>Customer</th><th>Call Type</th><th>Agent Name</th><th>Call Time</th><th>Call Duration</th></tr></thead>
                <tbody>
                  {paginatedData.length > 0 ? paginatedData.map(row => (
                    <tr key={row.id}>
                      <td>{row.customer}</td>
                      <td><span className={`badge badge-${row.callType.toLowerCase().replace(' ', '-')}`}>{row.callType}</span></td>
                      <td>{row.agentName}</td><td>{row.callTime}</td><td>{row.duration}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan={5} style={{ textAlign: 'center', padding: '2rem' }}>No data available in table</td></tr>
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
          <div className="call-history-side">
            <div className="table-header-row">
              <div className="search-box" style={{ maxWidth: '250px' }}>
                <Search size={16} className="search-icon" />
                <input type="text" placeholder="Search..." value={searchQuery2} onChange={(e) => setSearchQuery2(e.target.value)} className="search-input" />
              </div>
            </div>
            <div className="table-container">
              <table className="enquiries-table">
                <thead><tr><th>Agent</th><th>Answered Calls</th></tr></thead>
                <tbody>
                  {paginatedData2.length > 0 ? paginatedData2.map(row => (
                    <tr key={row.id}><td>{row.agentName}</td><td>{row.answeredCalls}</td></tr>
                  )) : (
                    <tr><td colSpan={2} style={{ textAlign: 'center', padding: '2rem' }}>No data available</td></tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="pagination-container">
              <div className="pagination-left">
                <span className="pagination-info">Showing {filteredData2.length > 0 ? startIndex2 + 1 : 0} to {Math.min(startIndex2 + rowsPerPage, filteredData2.length)} of {filteredData2.length}</span>
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

export default GLDialerCallReport;
