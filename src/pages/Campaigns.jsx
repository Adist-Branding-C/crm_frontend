import React, { useState, useMemo } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Plus, MoreHorizontal, Edit2, Trash2, Eye, Download, User, CheckCircle, Clock, AlertCircle, Megaphone } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import PageContainer from '../components/PageContainer';
import AddCampaignDrawer from '../components/AddCampaignDrawer';
import './Campaign.css';
import './Enquiries.css';

const sampleCampaigns = [
  { id: 1, slNo: 1, name: 'Q1 Promo Campaign', type: 'Email', totalTasks: 150, completedTasks: 120, completedPercent: 80, createdBy: 'Admin', createdAt: '2024-01-10' },
  { id: 2, slNo: 2, name: 'New Year Sale', type: 'SMS', totalTasks: 200, completedTasks: 180, completedPercent: 90, createdBy: 'Admin', createdAt: '2024-01-08' },
  { id: 3, slNo: 3, name: 'Product Launch', type: 'WhatsApp', totalTasks: 100, completedTasks: 45, completedPercent: 45, createdBy: 'John Doe', createdAt: '2024-01-05' },
  { id: 4, slNo: 4, name: 'Winter Sale', type: 'Email', totalTasks: 250, completedTasks: 250, completedPercent: 100, createdBy: 'Admin', createdAt: '2024-01-02' },
  { id: 5, slNo: 5, name: 'Referral Drive', type: 'Social', totalTasks: 80, completedTasks: 20, completedPercent: 25, createdBy: 'Jane Smith', createdAt: '2023-12-28' },
];

const CampaignsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [actionMenuOpen, setActionMenuOpen] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [campaigns, setCampaigns] = useState(sampleCampaigns);

  const [filters, setFilters] = useState({
    type: '',
    createdBy: '',
    dateRange: { start: '', end: '' },
  });

  const columns = [
    { key: 'checkbox', label: '' },
    { key: 'slNo', label: 'Sl No' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'totalTasks', label: 'Total Tasks', sortable: true },
    { key: 'completedTasks', label: 'Completed Tasks', sortable: true },
    { key: 'completedPercent', label: 'Completed %', sortable: true },
    { key: 'createdBy', label: 'Created By', sortable: true },
    { key: 'createdAt', label: 'Created At', sortable: true },
    { key: 'action', label: 'Action', sortable: true }
  ];

  const filteredData = useMemo(() => {
    let data = [...campaigns];
    if (searchQuery) data = data.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.type.toLowerCase().includes(searchQuery.toLowerCase()));
    if (filters.type) data = data.filter(item => item.type === filters.type);
    if (filters.createdBy) data = data.filter(item => item.createdBy === filters.createdBy);
    if (sortConfig.key) data.sort((a, b) => { if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1; if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1; return 0; });
    return data;
  }, [searchQuery, filters, sortConfig, campaigns]);

  const stats = useMemo(() => ({
    total: filteredData.length,
    active: filteredData.filter(c => c.completedPercent < 100).length,
    completed: filteredData.filter(c => c.completedPercent === 100).length,
  }), [filteredData]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  const handleSort = (key) => setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));
  const handleSelectAll = (e) => { if (e.target.checked) setSelectedRows(paginatedData.map(item => item.id)); else setSelectedRows([]); };
  const handleSelectRow = (id) => setSelectedRows(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const handleRowsPerPageChange = (e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); };
  const clearFilters = () => { setFilters({ type: '', createdBy: '', dateRange: { start: '', end: '' } }); setShowFilters(false); };
  const handleDeleteCampaign = (id) => { setCampaigns(prev => prev.filter(c => c.id !== id)); setActionMenuOpen(null); };
  const handleExportCSV = () => {
    const headers = ['Sl No', 'Name', 'Type', 'Total Tasks', 'Completed Tasks', 'Completed %', 'Created By', 'Created At'];
    const csvContent = [headers.join(','), ...filteredData.map(c => [c.slNo, `"${c.name}"`, c.type, c.totalTasks, c.completedTasks, c.completedPercent + '%', c.createdBy, c.createdAt].join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'campaigns.csv'; link.click();
  };

  const getProgressBadge = (percent) => {
    if (percent === 100) return <span className="badge badge-completed">Completed</span>;
    if (percent >= 50) return <span className="badge badge-progress">In Progress</span>;
    return <span className="badge badge-pending">Not Started</span>;
  };

  const renderStatsCards = () => (
    <div className="task-stats-cards">
      <div className="stats-card"><div className="stats-card-icon total"><Clock size={20} /></div><div className="stats-card-content"><span className="stats-card-value">{stats.total}</span><span className="stats-card-label">Total Campaigns</span></div></div>
      <div className="stats-card"><div className="stats-card-icon completed"><CheckCircle size={20} /></div><div className="stats-card-content"><span className="stats-card-value">{stats.completed}</span><span className="stats-card-label">Completed</span></div></div>
      <div className="stats-card"><div className="stats-card-icon pending"><Clock size={20} /></div><div className="stats-card-content"><span className="stats-card-value">{stats.active}</span><span className="stats-card-label">In Progress</span></div></div>
    </div>
  );

  return (
    <PageContainer>
      <PageHeader title="Campaigns" description="Manage campaign tasks and activities." />
      {renderStatsCards()}
      <div className="enquiries-toolbar">
        <div className="toolbar-left">
          <div className="search-box"><Search size={16} className="search-icon" /><input type="text" placeholder="Search campaigns..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" /></div>
          <button className="btn btn-secondary" onClick={() => setShowFilters(!showFilters)}><Filter size={16} />Filter<ChevronDown size={14} className={showFilters ? 'rotate' : ''} /></button>
          <div className="dropdown-container">
            <button className="btn btn-secondary" onClick={() => setShowSortDropdown(!showSortDropdown)}>Sort By<ChevronDown size={14} /></button>
            {showSortDropdown && (
              <div className="sort-dropdown">
                <button onClick={() => { handleSort('createdAt'); setShowSortDropdown(false); }}>Created Date {sortConfig.key === 'createdAt' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</button>
                <button onClick={() => { handleSort('name'); setShowSortDropdown(false); }}>Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</button>
                <button onClick={() => { handleSort('completedPercent'); setShowSortDropdown(false); }}>Progress {sortConfig.key === 'completedPercent' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</button>
              </div>
            )}
          </div>
        </div>
        <div className="toolbar-right">
          <button className="btn btn-secondary" onClick={handleExportCSV}><Download size={16} />Export</button>
          <button className="btn btn-primary" onClick={() => setIsDrawerOpen(true)}><Plus size={16} />Campaign</button>
        </div>
      </div>
      {showFilters && (
        <div className="filters-panel">
          <div className="filter-row">
            <div className="filter-group"><label>Type</label><select value={filters.type} onChange={(e) => setFilters({ ...filters, type: e.target.value })}><option value="">All</option><option value="Email">Email</option><option value="SMS">SMS</option><option value="WhatsApp">WhatsApp</option><option value="Social">Social</option></select></div>
            <div className="filter-group"><label>Created By</label><select value={filters.createdBy} onChange={(e) => setFilters({ ...filters, createdBy: e.target.value })}><option value="">All</option><option value="Admin">Admin</option><option value="John Doe">John Doe</option><option value="Jane Smith">Jane Smith</option></select></div>
            <div className="filter-group"><label>Date Range</label><div className="date-range-input"><input type="date" value={filters.dateRange.start} onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } })} /><span>to</span><input type="date" value={filters.dateRange.end} onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } })} /></div></div>
          </div>
          <div className="filter-row">
            <div className="filter-actions"><button className="btn btn-primary" onClick={() => setShowFilters(false)}>Filter</button><button className="btn btn-secondary" onClick={clearFilters}>Clear</button></div>
          </div>
        </div>
      )}
      <div className="table-container">
        <table className="enquiries-table">
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key} className={col.sortable ? 'sortable' : ''} onClick={col.sortable ? () => handleSort(col.key) : undefined}>
                  {col.key === 'checkbox' ? <input type="checkbox" checked={paginatedData.length > 0 && selectedRows.length === paginatedData.length} onChange={handleSelectAll} /> : <>{col.label}{col.sortable && sortConfig.key === col.key && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(row => (
              <tr key={row.id} className={selectedRows.includes(row.id) ? 'selected' : ''}>
                <td><input type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => handleSelectRow(row.id)} /></td>
                <td>{row.slNo}</td>
                <td className="lead-name-cell">{row.name}</td>
                <td><span className={`badge badge-${row.type.toLowerCase()}`}>{row.type}</span></td>
                <td>{row.totalTasks}</td>
                <td>{row.completedTasks}</td>
                <td>
                  <div className="progress-cell">
                    <span>{row.completedPercent}%</span>
                    <div className="progress-bar"><div className="progress-fill" style={{ width: row.completedPercent + '%' }}></div></div>
                  </div>
                </td>
                <td>{row.createdBy}</td>
                <td>{row.createdAt}</td>
                <td className="action-cell">
                  <div className="action-menu-container">
                    <button className="action-btn" onClick={() => setActionMenuOpen(actionMenuOpen === row.id ? null : row.id)}><MoreHorizontal size={16} /></button>
                    {actionMenuOpen === row.id && (
                      <div className="action-dropdown">
                        <button><Eye size={14} />View</button>
                        <button><Edit2 size={14} />Edit</button>
                        <button><User size={14} />Assign</button>
                        <button onClick={() => handleDeleteCampaign(row.id)} className="delete"><Trash2 size={14} />Delete</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        <div className="pagination-left">
          <span className="rows-label">Rows per page:</span>
          <select value={rowsPerPage} onChange={handleRowsPerPageChange} className="rows-select">
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
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
      <AddCampaignDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onSave={(data) => setCampaigns(prev => [...prev, { ...data, id: Date.now(), slNo: prev.length + 1 }])} />
    </PageContainer>
  );
};

export default CampaignsPage;