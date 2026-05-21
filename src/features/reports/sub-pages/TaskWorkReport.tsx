import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { taskWorkData } from '../constants';

const TaskWorkReport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredData = useMemo(() => {
    let data = [...taskWorkData];
    if (searchQuery) {
      data = data.filter(item =>
        item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.contactNumber.includes(searchQuery) ||
        item.task.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return data;
  }, [searchQuery]);

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
          <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
        </div>
        <button className="btn btn-secondary" onClick={handleExport}><Download size={16} /> Export</button>
      </div>
      <div className="table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              <th>Sl No</th><th>Customer Name</th><th>Task</th><th>Contact Number</th><th>Assigned To</th>
              <th>Date</th><th>Created Date</th><th>Completed Date</th><th>Remark</th><th>Status</th><th>Work Start On</th><th>Work End On</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(row => (
              <tr key={row.id}>
                <td>{row.slNo}</td><td>{row.customerName}</td><td>{row.task}</td><td>{row.contactNumber}</td>
                <td>{row.assignedTo}</td><td>{row.date}</td><td>{row.createdDate}</td><td>{row.completedDate || '-'}</td>
                <td>{row.remark}</td>
                <td><span className={`badge badge-${row.status.toLowerCase().replace(' ', '-')}`}>{row.status}</span></td>
                <td>{row.workStartOn}</td><td>{row.workEndOn || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        <div className="pagination-left">
          <span className="rows-label">Rows per page:</span>
          <select value={rowsPerPage} onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="rows-select">
            <option value={5}>5</option><option value={10}>10</option><option value={25}>25</option>
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

export default TaskWorkReport;
