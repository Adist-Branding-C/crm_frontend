import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { dealConversionData } from '../constants';
import { ROWS_OPTIONS_5_10_25 } from '../../../shared/constants/pagination';
import { triggerBlobDownload } from '../../../shared/utils/blobDownload.util';

const LeadConversionReport = () => {
  const [filters, setFilters] = useState({ dateFrom: '2024-01-01', dateTo: '2024-01-31', agent: 0, search: '' });
  const [showFilters, setShowFilters] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const agents = [
    { id: 0, name: 'All Agents' }, { id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Mike Johnson' }, { id: 4, name: 'Sarah Williams' }, { id: 5, name: 'David Brown' },
  ];

  const leadSummary = { totalLeads: 245, totalDeals: 89, open: 45, win: 28, lose: 16 };

  const filteredDealData = useMemo(() => {
    let data = [...dealConversionData];
    if (filters.search) {
      data = data.filter(item =>
        item.leadName.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.dealCode.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.mobile.includes(filters.search)
      );
    }
    return data;
  }, [filters, submit]);

  const totalPages = Math.ceil(filteredDealData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredDealData.slice(startIndex, startIndex + rowsPerPage);

  const handleExport = (type: string) => {
    const headers = type === 'lead'
      ? ['Total Leads', 'Total Deals', 'Open', 'Win', 'Lose']
      : ['SL No', 'Deal Code', 'Deal Name', 'Lead Name', 'Mobile Number', 'Deal Amount', 'Deal Status', 'Lead Source', 'Lost Reason', 'Start Date', 'End Date', 'Staff Name', 'Created By', 'Updated At'];
    const rows = type === 'lead'
      ? [[leadSummary.totalLeads, leadSummary.totalDeals, leadSummary.open, leadSummary.win, leadSummary.lose]]
      : filteredDealData.map(d => [d.id, d.dealCode, d.dealName, d.leadName, d.mobile, d.dealAmount, d.dealStatus, d.leadSource, d.lostReason, d.startDate, d.endDate, d.staffName, d.createdBy, d.updatedAt]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    triggerBlobDownload(blob, type === 'lead' ? 'lead_summary.csv' : 'deal_summary.csv');
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Lead Conversion Report" description="Track conversion rates from lead to deal" />
      <div className="toolbar-left">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search..." value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} className="search-input" />
        </div>
        <button className="btn btn-secondary" onClick={() => setShowFilters(!showFilters)}>
          <Filter size={16} /> Filter <ChevronDown size={14} className={showFilters ? 'rotate' : ''} />
        </button>
      </div>
      {showFilters && (
        <div className="filters-panel">
          <div className="filter-row">
            <div className="filter-group"><label>Date From</label><input type="date" value={filters.dateFrom} onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })} /></div>
            <div className="filter-group"><label>Date To</label><input type="date" value={filters.dateTo} onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })} /></div>
            <div className="filter-group"><label>Agent</label><select value={filters.agent} onChange={(e) => setFilters({ ...filters, agent: Number(e.target.value) })}>{agents.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}</select></div>
            <div className="filter-actions"><button className="btn btn-primary" onClick={() => setSubmit(true)}>Submit</button></div>
          </div>
        </div>
      )}
      <div className="report-section">
        <div className="section-header"><h3>Lead Summary</h3><button className="btn btn-primary" onClick={() => handleExport('lead')}><Download size={16} /> Export</button></div>
        <div className="table-container">
          <table className="enquiries-table">
            <thead><tr><th>Total Leads</th><th>Total Deals</th><th>Open</th><th>Win</th><th>Lose</th></tr></thead>
            <tbody><tr><td>{leadSummary.totalLeads}</td><td>{leadSummary.totalDeals}</td><td>{leadSummary.open}</td><td>{leadSummary.win}</td><td>{leadSummary.lose}</td></tr></tbody>
          </table>
        </div>
      </div>
      <div className="report-section">
        <div className="section-header"><h3>Deal Summary</h3><button className="btn btn-primary" onClick={() => handleExport('deal')}><Download size={16} /> Export</button></div>
        <div className="table-container">
          <table className="enquiries-table">
            <thead><tr><th>SL No</th><th>Deal Code</th><th>Deal Name</th><th>Lead Name</th><th>Mobile Number</th><th>Deal Amount</th><th>Deal Status</th><th>Lead Source</th><th>Lost Reason</th><th>Start Date</th><th>End Date</th><th>Staff Name</th><th>Created By</th><th>Updated At</th></tr></thead>
            <tbody>
              {paginatedData.map(row => (
                <tr key={row.id}>
                  <td>{row.id}</td><td>{row.dealCode}</td><td>{row.dealName}</td><td>{row.leadName}</td><td>{row.mobile}</td>
                  <td>${row.dealAmount.toLocaleString()}</td>
                  <td><span className={`badge badge-${row.dealStatus.toLowerCase()}`}>{row.dealStatus}</span></td>
                  <td>{row.leadSource}</td><td>{row.lostReason}</td><td>{row.startDate}</td><td>{row.endDate}</td>
                  <td>{row.staffName}</td><td>{row.createdBy}</td><td>{row.updatedAt}</td>
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
            {ROWS_OPTIONS_5_10_25.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <span className="pagination-info">Showing {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredDealData.length)} of {filteredDealData.length}</span>
        </div>
        <div className="pagination-right">
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>First</button>
          <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}><ChevronLeft size={16} /></button>
          <span className="page-indicator">Page {currentPage} of {totalPages}</span>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}><ChevronRight size={16} /></button>
          <button className="pagination-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>Last</button>
        </div>
      </div>
    </div>
  );
};

export default LeadConversionReport;
