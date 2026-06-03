import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { leadChangeData } from '../constants';
import { ROWS_OPTIONS_5_10_25 } from '../../../shared/constants/pagination';

const LeadChangeReport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredData = useMemo(() => {
    let data = [...leadChangeData];
    if (searchQuery) {
      data = data.filter(item =>
        item.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.mobile.includes(searchQuery) ||
        item.notes.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return data;
  }, [searchQuery]);

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
          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
        </div>
        <button className="btn btn-secondary" onClick={handleExport}><Download size={16} /> Export</button>
      </div>
      <div className="table-container">
        <table className="enquiries-table">
          <thead><tr><th>SL Num</th><th>Lead Name</th><th>Mobile Number</th><th>Lead Source</th><th>Lead Status</th><th>Note Added By</th><th>Notes</th></tr></thead>
          <tbody>
            {paginatedData.map(row => (
              <tr key={row.id}>
                <td>{row.slNum}</td><td>{row.leadName}</td><td>{row.mobile}</td><td>{row.leadSource}</td>
                <td><span className={`badge badge-${row.leadStatus.toLowerCase().replace(' ', '-')}`}>{row.leadStatus}</span></td>
                <td>{row.noteAddedBy}</td><td>{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        <div className="pagination-left">
          <span className="rows-label">Rows per page:</span>
          <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="rows-select">
            {ROWS_OPTIONS_5_10_25.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <span className="pagination-info">Showing {startIndex + 1}-{Math.min(startIndex + rowsPerPage, filteredData.length)} of {filteredData.length}</span>
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

export default LeadChangeReport;
