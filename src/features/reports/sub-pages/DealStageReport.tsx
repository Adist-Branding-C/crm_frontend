import React, { useState, useMemo } from 'react';
import { Search, Download, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { dealStageData, dealAgentData } from '../constants';
import { ROWS_OPTIONS_5_10_25 } from '../../../shared/constants/pagination';

const DealStageReport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredData = useMemo(() => {
    let data = [...dealAgentData];
    if (searchQuery) {
      data = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return data;
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleExport = () => {
    const headers = ['Agent Name', 'Total Deals', 'Open Deals', 'Win Deals', 'Close Deals'];
    const csvContent = [headers.join(','), ...filteredData.map(d => [d.name, d.totalDeals, d.openDeals, d.winDeals, d.closeDeals].join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'deal_stage_report.csv';
    link.click();
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Deals by Stage" description="Overview of deals segmented by current stage in pipeline" />
      
      <div className="deal-stage-stats">
        {dealStageData.map((item, index) => (
          <div key={index} className="deal-stage-card">
            <div className="deal-stage-icon" style={{ background: item.color + '20' }}>
              <DollarSign size={20} color={item.color} />
            </div>
            <div className="deal-stage-info">
              <span className="deal-stage-value">{item.count}</span>
              <span className="deal-stage-label">{item.stage} Deals</span>
            </div>
            <div className="deal-stage-amount">${item.amount.toLocaleString()}</div>
          </div>
        ))}
      </div>

      <div className="toolbar-left">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search agents..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
        </div>
        <div className="toolbar-right">
          <button className="btn btn-primary" onClick={handleExport}><Download size={16} /> Export</button>
        </div>
      </div>

      <div className="table-container">
        <table className="enquiries-table">
          <thead><tr><th>Agent Name</th><th>Total Deals</th><th>Open Deals</th><th>Win Deals</th><th>Close Deals</th></tr></thead>
          <tbody>
            {paginatedData.map(row => (
              <tr key={row.id}><td>{row.name}</td><td>{row.totalDeals}</td><td>{row.openDeals}</td><td>{row.winDeals}</td><td>{row.closeDeals}</td></tr>
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

export default DealStageReport;
