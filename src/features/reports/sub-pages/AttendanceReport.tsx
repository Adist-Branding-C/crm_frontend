import React, { useState, useMemo } from 'react';
import { Search, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { attendanceData } from '../constants';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../shared/constants/pagination';
import { triggerBlobDownload } from '../../../shared/utils/blobDownload.util';

const AttendanceReport = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const navigate = useNavigate();

  const filteredData = useMemo(() => {
    let data = [...attendanceData];
    if (search) data = data.filter(item => item.agent.toLowerCase().includes(search.toLowerCase()));
    return data;
  }, [search]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleExport = () => {
    const headers = ['Agent', 'Total Working Days', 'Leave', 'Duration'];
    const csvContent = [headers.join(','), ...filteredData.map(d => `${d.agent},${d.workingDays},${d.leave},${d.duration}`)].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    triggerBlobDownload(blob, 'attendance_report.csv');
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <div className="checkin-table-section">
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
              <input type="text" placeholder="Search..." value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} className="search-input" />
            </div>
          </div>
          <button className="btn btn-secondary" onClick={handleExport}><Download size={16} /> Export</button>
        </div>
        <div className="table-container">
          <table className="enquiries-table">
            <thead><tr><th>Sl No</th><th>Agent</th><th>Total Working Days</th><th>Leave</th><th>Duration</th><th>Action</th></tr></thead>
            <tbody>
              {paginatedData.length > 0 ? paginatedData.map((row, index) => (
                <tr key={row.id}>
                  <td>{startIndex + index + 1}</td><td>{row.agent}</td><td>{row.workingDays}</td><td>{row.leave}</td>
                  <td>{row.duration}</td>
                  <td><button className="btn-text" onClick={() => navigate(`/reports/attendance/profile/${row.phone}?date=2026-04-01`)}>View</button></td>
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
  );
};

export default AttendanceReport;
