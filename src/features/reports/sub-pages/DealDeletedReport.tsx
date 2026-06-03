import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { deletedDealData } from '../constants';
import { ROWS_OPTIONS_5_10_25 } from '../../../shared/constants/pagination';

const DealDeletedReport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedFields, setSelectedFields] = useState(['dealName', 'leadName', 'mobile', 'amount', 'status']);
  const [exportFileName, setExportFileName] = useState('');

  const fieldOptions = [
    { key: 'dealName', label: 'Deal Name' }, { key: 'deletedBy', label: 'Deleted By' }, { key: 'leadName', label: 'Lead' },
    { key: 'mobile', label: 'Mobile' }, { key: 'amount', label: 'Amount' }, { key: 'status', label: 'Status' },
    { key: 'type', label: 'Type' }, { key: 'startDate', label: 'Start Date' }, { key: 'endDate', label: 'End Date' },
    { key: 'agent', label: 'Agent' }, { key: 'createdBy', label: 'Created By' }, { key: 'createdAt', label: 'Created At' },
    { key: 'deletedAt', label: 'Deleted At' }, { key: 'lostReason', label: 'Lost Reason' },
  ];

  const filteredData = useMemo(() => {
    let data = [...deletedDealData];
    if (searchQuery) {
      data = data.filter(item =>
        item.dealName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.mobile.includes(searchQuery)
      );
    }
    return data;
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedRows(paginatedData.map(item => item.id));
    else setSelectedRows([]);
  };

  const handleSelectRow = (id: number) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleRecover = () => {
    if (selectedRows.length === 0) return;
    if (confirm(`Are you sure you want to recover ${selectedRows.length} selected deal(s)?`)) {
      alert(`Recovered ${selectedRows.length} deals`);
      setSelectedRows([]);
    }
  };

  const handleExport = () => {
    const headers = selectedFields;
    const rows = filteredData.map(d => selectedFields.map(f => (d as Record<string, unknown>)[f] || ''));
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = exportFileName || 'deleted_deals_export.csv';
    link.click();
    setShowExport(false);
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="Deleted Deals" description="View and restore previously deleted deals" />
      <div className="toolbar-left">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Search deals..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
        </div>
        <button className="btn btn-secondary" onClick={() => setShowFilters(!showFilters)}><Filter size={16} /> Filter</button>
        <button className="btn btn-secondary" onClick={() => setShowExport(true)}><Download size={16} /> Export</button>
      </div>

      {selectedRows.length > 0 && (
        <div className="bulk-action-bar" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-sm)', marginBottom: '1rem' }}>
          <span>{selectedRows.length} deal(s) selected</span>
          <button className="btn btn-primary" onClick={handleRecover}><RotateCcw size={16} /> Recover Selected</button>
        </div>
      )}

      <div className="table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              <th><input type="checkbox" checked={paginatedData.length > 0 && selectedRows.length === paginatedData.length} onChange={handleSelectAll} /></th>
              <th>Deal Name</th><th>Deleted By</th><th>Lead</th><th>Mobile</th><th>Amount</th><th>Status</th><th>Type</th>
              <th>Start Date</th><th>End Date</th><th>Agent</th><th>Created By</th><th>Created At</th><th>Deleted At</th><th>Lost Reason</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(row => (
              <tr key={row.id} className={selectedRows.includes(row.id) ? 'selected' : ''}>
                <td><input type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => handleSelectRow(row.id)} /></td>
                <td>{row.dealName}</td><td>{row.deletedBy}</td><td>{row.leadName}</td><td>{row.mobile}</td>
                <td>${row.amount.toLocaleString()}</td>
                <td><span className={`badge badge-${row.status.toLowerCase().replace(' ', '-')}`}>{row.status}</span></td>
                <td>{row.type}</td><td>{row.startDate}</td><td>{row.endDate}</td><td>{row.agent}</td>
                <td>{row.createdBy}</td><td>{row.createdAt}</td><td>{row.deletedAt}</td><td>{row.lostReason}</td>
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

      {showExport && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowExport(false)}>
          <div className="export-form-card" style={{ maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}><h3 style={{ margin: 0 }}>Export Deleted Deals</h3></div>
            <div style={{ padding: '1.5rem' }}>
              <div className="filter-group" style={{ marginBottom: '1rem' }}>
                <label>File Name</label>
                <input type="text" placeholder="Enter file name" value={exportFileName} onChange={(e) => setExportFileName(e.target.value)} style={{ width: '100%' }} />
              </div>
              <div className="fields-selection">
                <div className="field-checkbox">
                  <label><input type="checkbox" checked={selectedFields.length === fieldOptions.length} onChange={(e) => { if (e.target.checked) setSelectedFields(fieldOptions.map(f => f.key)); else setSelectedFields([]); }} /> Select All</label>
                </div>
                <div className="fields-grid">
                  {fieldOptions.map(field => (
                    <div key={field.key} className="field-checkbox">
                      <label><input type="checkbox" checked={selectedFields.includes(field.key)} onChange={() => { setSelectedFields(prev => prev.includes(field.key) ? prev.filter(f => f !== field.key) : [...prev, field.key]); }} /> {field.label}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="form-actions" style={{ padding: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button className="btn btn-secondary" onClick={() => setShowExport(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleExport}>Export</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DealDeletedReport;
