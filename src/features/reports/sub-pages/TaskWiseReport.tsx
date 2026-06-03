import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { taskWiseData } from '../constants';
import { ROWS_OPTIONS_5_10_25 } from '../../../shared/constants/pagination';

const TaskWiseReport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredData = useMemo(() => {
    let data = [...taskWiseData];
    if (searchQuery) data = data.filter(item => item.agentName.toLowerCase().includes(searchQuery.toLowerCase()));
    return data;
  }, [searchQuery]);

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
          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
        </div>
        <button className="btn btn-secondary" onClick={handleExport}><Download size={16} /> Export</button>
      </div>
      <div className="table-container">
        <table className="enquiries-table">
          <thead><tr><th>Agent Name</th><th>Total</th><th>Completed</th><th>Pending</th><th>OverDue</th></tr></thead>
          <tbody>
            {paginatedData.map(row => (
              <tr key={row.id}><td>{row.agentName}</td><td>{row.total}</td><td>{row.completed}</td><td>{row.pending}</td><td>{row.overDue}</td></tr>
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

export default TaskWiseReport;
