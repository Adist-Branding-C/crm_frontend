import React, { useState, useMemo } from 'react';
import { Search, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { checkinData } from '../constants';
import { ROWS_OPTIONS_10_25_50_100 } from '../../../shared/constants/pagination';
import { triggerBlobDownload } from '../../../shared/utils/blobDownload.util';

const CheckinReport = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);

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
    triggerBlobDownload(blob, 'checkin_report.csv');
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
            <thead>
              <tr><th>Shop</th><th>Agent</th><th>Note</th><th>Type</th><th>Date</th><th>Location</th><th>Type</th><th>Date</th><th>Location</th></tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? paginatedData.map(row => (
                <tr key={row.id}>
                  <td>{row.shop}</td><td>{row.agent}</td><td>{row.note}</td>
                  <td><span className="badge badge-incoming">{row.typeIn}</span></td>
                  <td>{row.dateIn}</td><td>{row.locationIn}</td>
                  <td><span className="badge badge-outgoing">{row.typeOut}</span></td>
                  <td>{row.dateOut}</td><td>{row.locationOut}</td>
                </tr>
              )) : (
                <tr><td colSpan={9} style={{ textAlign: 'center', padding: '2rem' }}>No data available</td></tr>
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

export default CheckinReport;
