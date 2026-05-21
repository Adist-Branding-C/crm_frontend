import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown } from 'lucide-react';
import PageHeader from '../../../shared/components/layout/PageHeader';
import { glAPISampleData } from '../constants';

const LeadGLAPIHistoryReport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ purpose: '', status: '' });

  const filteredData = useMemo(() => {
    let data = [...glAPISampleData];
    if (searchQuery) {
      data = data.filter(item =>
        item.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.mobile.includes(searchQuery) ||
        item.slNo.toString().includes(searchQuery)
      );
    }
    if (filters.purpose) {
      data = data.filter(item => item.purpose === filters.purpose);
    }
    if (filters.status) {
      data = data.filter(item => item.status === filters.status);
    }
    return data;
  }, [searchQuery, filters]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(paginatedData.map(item => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: number) => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="report-content-wrapper with-sidebar">
      <PageHeader title="GL API History" description="Track all your past lead data api" />
      
      <div className="toolbar-left">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        <button className={`btn btn-secondary ${showFilters ? 'active' : ''}`} onClick={() => setShowFilters(!showFilters)}>
          <Filter size={16} />
          Filter
          <ChevronDown size={14} className={showFilters ? 'rotate' : ''} />
        </button>
      </div>

      {showFilters && (
        <div className="filters-panel">
          <div className="filter-row">
            <div className="filter-group">
              <label>Purpose</label>
              <select value={filters.purpose} onChange={(e) => setFilters({ ...filters, purpose: e.target.value })}>
                <option value="">All</option>
                <option value="DND">DND</option>
                <option value="Lost">Lost</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Status</label>
              <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
                <option value="">All</option>
                <option value="Junk Lead _ Form not submitted">Junk Lead _ Form not submitted</option>
                <option value="Not Interested">Not Interested</option>
              </select>
            </div>
            <div className="filter-actions">
              <button className="btn btn-primary" onClick={() => setShowFilters(false)}>Filter</button>
              <button className="btn btn-secondary" onClick={() => { setFilters({ purpose: '', status: '' }); setShowFilters(false); }}>Clear</button>
            </div>
          </div>
        </div>
      )}

      <div className="table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" checked={paginatedData.length > 0 && selectedRows.length === paginatedData.length} onChange={handleSelectAll} />
              </th>
              <th>SL No</th>
              <th>VIA</th>
              <th>Lead Name</th>
              <th>Mobile</th>
              <th>Assigned To</th>
              <th>Purpose</th>
              <th>Source</th>
              <th>Status</th>
              <th>count</th>
              <th>Date/Time</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(row => (
              <tr key={row.id}>
                <td>
                  <input type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => handleSelectRow(row.id)} />
                </td>
                <td>{row.slNo}</td>
                <td>{row.via}</td>
                <td>{row.leadName}</td>
                <td>{row.mobile}</td>
                <td>{row.assignedTo}</td>
                <td>{row.purpose}</td>
                <td>{row.source}</td>
                <td>{row.status}</td>
                <td>{row.count}</td>
                <td>{row.dateTime}</td>
                <td>{row.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}>
        <div className="pagination-info">
          Showing {filteredData.length > 0 ? startIndex + 1 : 0} to {Math.min(currentPage * rowsPerPage, filteredData.length)} of {filteredData.length} entries
        </div>
        <div className="pagination-controls">
          <button className="btn btn-secondary" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
            <button key={i} className={`btn ${currentPage === i + 1 ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
          ))}
          <button className="btn btn-secondary" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default LeadGLAPIHistoryReport;
