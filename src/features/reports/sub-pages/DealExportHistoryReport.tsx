import React, { useState, useMemo } from 'react';
import { Search, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { ROWS_OPTIONS_5_10_25 } from '../../../shared/constants/pagination';

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
    if (searchQuery) data = data.filter(item => item.fileName.toLowerCase().includes(searchQuery.toLowerCase()));
    return data;
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Deal Export History" description="Track all your past deal data exports" />
      <div className="toolbar-left">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search exports..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
        </div>
      </div>
      <div className="table-container">
        <table className="enquiries-table">
          <thead><tr><th>Date & Time</th><th>File Name</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {paginatedData.map(row => (
              <tr key={row.id}>
                <td>{row.dateTime}</td><td>{row.fileName}</td>
                <td><span className={`badge badge-${row.status.toLowerCase()}`}>{row.status}</span></td>
                <td><button className="action-btn" title="Download" onClick={() => alert(`Downloading ${row.fileName}...`)}><Download size={14} /></button></td>
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

export default DealExportHistoryReport;
